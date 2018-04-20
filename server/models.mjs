import mongoose from 'mongoose';
import {OrdersSchema} from './schemas.mjs';

let Order;

try {
	Order = mongoose.model('Order');
}
catch (err) {
	// The `Order` model doesn't exist, so need to create it
	Order = mongoose.model('Order', OrdersSchema);
}

export {Order};