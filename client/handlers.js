import { OrdersLoader, OrderCreator, OrderReader, OrderUpdater, StatsLoader } from './orders.js';

export function createOrder() {
	const name = document.getElementById('name').value;
	const phone = document.getElementById('phone').value;
	const address = document.getElementById('address').value;

	const statusField = document.getElementById('status');
	const status = statusField.options[statusField.selectedIndex].value;
	const data = { name, phone, address, status };

	let creator = new OrderCreator(
		data,
		// Done callback
		() => {
			document.getElementById('modal-create-order').style.display='none';
			loadOrders();
			loadStats();
		},
		// Error callback
		(error) => {
			alert(error);
		}
	);
	creator.create();
}

export function loadOrders() {
	let loader = new OrdersLoader();
	loader.load();
}

export function loadStats(sortBy = null, sortDir = null) {
	let loader = new StatsLoader(sortBy, sortDir);
	loader.load();
}
export function editOrder() {
	const orderId = document.getElementById('order-id').value;
	const name = document.getElementById('edit-name').value;
	const phone = document.getElementById('edit-phone').value;
	const address = document.getElementById('edit-address').value;

	const statusField = document.getElementById('edit-status');
	const status = statusField.options[statusField.selectedIndex].value;
	const data = { name, phone, address, status };

	let updater = new OrderUpdater(
		orderId,
		data,
		// Done callback
		() => {
			document.getElementById('modal-edit-order').style.display='none';
			loadOrders();
			loadStats();
		},
		// Error callback
		(error) => {
			alert(error);
		}
	);
	updater.update();
}