import mongoose from 'mongoose';

const DB_URI = 'mongodb://ds151169.mlab.com:51169/orders-test-task';
const DB_USER = 'admin';
const DB_PASSWORD = '0gf5mv6n';


export default class Connection {
	constructor() {
		//Connects to the orders-test-task database
		mongoose.connect(DB_URI, { auth: { user: DB_USER, password: DB_PASSWORD } });
	}
}