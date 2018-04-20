import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

 
export const OrdersSchema = new Schema({
	_id: ObjectId,
	number: Number,
	name: String,
	phone: String
});