import express from 'express';
const router = express.Router();
import Connection from './connection.mjs';
import OrdersList from './order.mjs';

new Connection();

router.get('/orders', (request, response)  => {
	let ordersList = new OrdersList(response);
	ordersList.fetch();
});

export default router;