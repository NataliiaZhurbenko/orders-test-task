import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export const OrdersSchema = new Schema({
	_id: ObjectId,
	name: String,
	phone: String,
	address: String,
	status: String,
	createdAt: { type: Date, default: Date.now }
});
