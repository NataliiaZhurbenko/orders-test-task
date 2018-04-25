import mongoose from 'mongoose';
import { Order } from './models.mjs';
import { isValidByStatus } from './validators.mjs';

/**
 * Orders data fetching controller
 */
export class OrdersList {
	constructor(response){
		this._response = response;
	}

	fetch() {
		Order.find({}).select('-__v').exec((err, orders) => {
			if (err) {
				 this._response.send('No data found');
			}
			else {
				 this._response.json(orders);
			}
		});
	}
}

export class StatsList {
	constructor(response, sortBy, sortDir) {
		this._response = response;
		const availableSortFields = ['_id', 'confirmed', 'canceled', 'deferred'];
		const availableSortDirs = [-1, 1];

		sortDir = parseInt(sortDir) || 0;
		this._sortBy = (availableSortFields.includes(sortBy) ? sortBy : null);
		this._sortDir = (availableSortDirs.includes(sortDir) ? sortDir : null);
	}

	fetch() {
		 let query = [
			{
				$group: {
					_id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
					confirmed: { $sum: { $cond: { if: { $eq: [ "$status", "1" ] }, then: 1, else: 0 } } },
					canceled: { $sum: { $cond: { if: { $eq: [ "$status", "2" ] }, then: 1, else: 0 } } },
					deferred: { $sum: { $cond: { if: { $eq: [ "$status", "3" ] }, then: 1, else: 0 } } },
					count: { $sum: 1 }
				}
			}
		];

		if (this._sortBy && this._sortDir) {
			query.push({ $sort: { [this._sortBy]: this._sortDir } });
		}
		
		Order.aggregate(query, (error, stats) => {
			if (error) {
				this._response.status(400).send(error);
			} else {
				Order.count({}, (error, total) => {
					if (error) {
						 this._response.status(400).send(error);
					} else {
						this._response.json({ total, stats });
					}
				});
			}
		});
	}
}

export class NewOrder {
	constructor(response, data){
		this._data = data;
		this._response = response;
	}

	save() {
		if (isValidByStatus(this._data)) {
			this._save();
		} else {
			this._response.status(400).send('A confirmed order must contain all fields filled in');
		}
	}

	_save() {
		let order = new Order({
			_id: new mongoose.Types.ObjectId(),
			name: this._data.name,
			phone: this._data.phone,
			address: this._data.address,
			status: this._data.status
		});
		
		order.save((err) => {
			if (err) {
				this._response.send(err);
				// TODO: Need to send error to log
			} else {
				this._response.send('Order successfully saved to DB')
			}
		});
	}
}

export class ExistOrder {
	constructor(response, id) {
		this._id = id;
		this._response = response;
	}
	
	fetch() {
		Order.findOne({_id:this._id}).select('-__v').exec((err, order) => {
			if (err) {
				 this._response.send('No data found');
			}
			else {
				 this._response.json(order);
			}
		});
	}
}

export class UpdateOrder {
	constructor(response, id, data) {
		this._id = id;
		this._response = response;
		this._data = data;
	}

	update() {
		if (isValidByStatus(this._data)) {
			this._update();
		} else {
			this._response.status(400).send('A confirmed order must contain all fields filled in');
		}
	}

	_update() {
		Order.findOneAndUpdate({ _id: this._id }, this._data, { upsert: false }, (err, order) => {
			if (err) {
				this._response.send(err);
				// TODO: Need to send error to log
			} else {
				this._response.send('Order successfully updated in DB');
			}
		});
	}
}