export class OrdersLoader {
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
			const data = JSON.parse(this._xhr.responseText);
			this._render(data);
		}
	}
	
	_render (data) {
		// delete previous added order rows
		let orders_panel = document.getElementById('orders_panel');
		let order_row_list = document.querySelectorAll('.added_item');
		//let hr_list = document.querySelectorAll('.hr');
		for (let i=0; i<order_row_list.length; i++) {
			orders_panel.removeChild(order_row_list[i]);
			//orders_panel.removeChild(hr_list[i]);
		}
		
		//create new order row
		let order_row = document.getElementById('order_row');
		for (let i=0; i<data.length; i++) {
			//clone element and add fields
			let new_order_row = order_row.cloneNode(true);
			new_order_row.classList.add('added_item');
			new_order_row.id = data[i]._id;
			let new_order_list = new_order_row.querySelectorAll('p');
			new_order_list[0].innerHTML = i+1;
			new_order_list[1].innerHTML = data[i].name;
			new_order_list[2].innerHTML = data[i].phone;
			//create  hr element for separating created rows
			let hr = document.createElement('hr');
			hr.classList.add('added_item');
			//add new elements into panel
			orders_panel.appendChild(new_order_row);
			orders_panel.appendChild(hr);
		}
		//add hndlres to order rows
		let edit_btn_list = document.querySelectorAll('.edit-btn');
	
		for (let i=0; i<edit_btn_list.length; i++){
			edit_btn_list[i].onclick = (event) => this._showEditor(event);
		}
		
	}
	
	_showEditor (event) {
		const id = event.target.parentElement.parentElement.id;
		document.getElementById('modal-edit-order').style.display='block';
		let reader = new OrderReader(id, (data) => this._fillEditor(data));
		reader.read();
	}
	
	_fillEditor(data) {
		document.getElementById('order-id').value = data._id;
		document.getElementById('edit-name').value = data.name;
		document.getElementById('edit-phone').value = data.phone;
		document.getElementById('edit-address').value = data.address;
		
		let option = document.querySelector(`#edit-status option[value="${data.status}"]`);
		option.selected = 'selected';
	}
}

export class OrderCreator {
	constructor(data, doneClb, errorClb) {
		this._data = data;
		this._doneClb = doneClb;
		this._errorClb = errorClb;

		this._xhr = new XMLHttpRequest();
		this._xhr.onreadystatechange = () => this._ready();
	}

	create() {
		this._xhr.open('POST', '/api/orders', true);
		this._xhr.setRequestHeader('Content-Type', 'application/json');
		this._xhr.send(JSON.stringify(this._data));
	}

	_ready() {
		if (this._xhr.readyState == 4) {
			if (this._xhr.status == 200) {
				this._doneClb();
			}
			else {
				this._errorClb(this._xhr.responseText);
			}
		}
	}
}

export class OrderReader {
	constructor(id, clb) {
		this._id = id;
		this._clb = clb;
		
		this._xhr = new XMLHttpRequest();
		this._xhr.onreadystatechange = () => this._ready();
	}
	
	read() {
		this._xhr.open('GET', `/api/orders/${this._id}`, true);
		this._xhr.send();
	}
	
	_ready() {
		if (this._xhr.readyState == 4 && this._xhr.status == 200) {
			const data = JSON.parse(this._xhr.responseText);
			this._clb(data);
		}
	}
}

export class OrderUpdater {
	constructor (id, data, doneClb, errorClb) {
		this._id = id;
		this._data = data;
		this._doneClb = doneClb;
		this._errorClb = errorClb;

		this._xhr = new XMLHttpRequest();
		this._xhr.onreadystatechange = () => this._ready();
	}
	
	update() {
		this._xhr.open('PUT', `/api/orders/${this._id}`, true);
		this._xhr.setRequestHeader('Content-Type', 'application/json');
		this._xhr.send(JSON.stringify(this._data));
	}
	
	_ready() {
		if (this._xhr.readyState == 4) {
			if (this._xhr.status == 200) {
				this._doneClb();
			}
			else {
				this._errorClb(this._xhr.responseText);
			}
		}
	}
}