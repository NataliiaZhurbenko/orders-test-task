export default class OrdersLoader {
	constructor() {
		this._xhr = new XMLHttpRequest();
		this._xhr.onreadystatechange = () => this._ready();
	}

	load() {
		this._xhr.open('GET', '/api/orders', true);
		this._xhr.send();
	}

	_ready() {
		if (this._xhr.readyState == 4 && this._xhr.status == 200) {
			console.log(this._xhr.responseText);
		}
	}
}