import OrdersLoader from './orders.js';

export function loadOrders() {
	let loader = new OrdersLoader();
	loader.load();
}