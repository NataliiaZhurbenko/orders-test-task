import mongoose from 'mongoose';
import {Order} from './models.mjs';

/**
 * Orders data fetching controller
 */
export default class OrdersList {
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