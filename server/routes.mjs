import express from 'express';
const router = express.Router();
import Connection from './connection.mjs';
import { OrdersList, NewOrder, ExistOrder, UpdateOrder } from './controllers.mjs';
import bodyParser from 'body-parser';

let jsonParser = bodyParser.json();
new Connection();

router.get('/orders/:orderId', (request, response) => {
	const orderId = request.params.orderId;
	let existOrder = new ExistOrder(response, orderId);
	existOrder.fetch();
});

router.put('/orders/:orderId', jsonParser, (request, response) => {
	const orderId = request.params.orderId;

	if (request.body) {
		let updateOrder = new UpdateOrder(response, orderId, request.body);
		updateOrder.update();
	}
	else {
		response.sendStatus(400);
	}
})

router.get('/orders', (request, response) => {
	let ordersList = new OrdersList(response);
	ordersList.fetch();
});

router.post('/orders', jsonParser, (request, response)  => {
	if (request.body) {
		let newOrder = new NewOrder(response, request.body);
		newOrder.save();
	}
	else {
		response.sendStatus(400);
	}
});

export default router;