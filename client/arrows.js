import { loadStats } from './handlers.js';
export default class ToggleArrows {
	constructor () {
		this._arrows = document.querySelectorAll(".arrow");
		this._headers = document.querySelectorAll(".stats-header");
	}

	addHandlers() {
		for(let i=0; i<this._headers.length; i++) {
			this._headers[i].onclick = (e) => this._toggleHeaders(e);
			this._arrows[i].onclick = (e) => this._toggleArrow(e);
		}
	}

	_toggleHeaders (e) {
		let active_header = e.target;
		let active_arrow = active_header.children[0];

		if (active_arrow.style.display == 'inline-block') {
			this._toggleActiveArrow(active_arrow);
		} else {
			for(let i=0; i<this._headers.length; i++) {
				this._arrows[i].style.display = 'none';
			}

			active_arrow.style.display = 'inline-block';
		}
	}

	_toggleArrow (e) {
		let active_arrow = e.target;
		e.stopPropagation()

		if (active_arrow.style.display == 'inline-block') {
			this._toggleActiveArrow(active_arrow);
		}
	}

	_toggleActiveArrow(active_arrow) {
		const sortBy = active_arrow.parentElement.id;
		let sortDir;
		
		if (active_arrow.classList.contains('up')) { 
			active_arrow.classList.remove('up');
			active_arrow.classList.add('down');
			sortDir = -1;
		} else {
			active_arrow.classList.remove('down')
			active_arrow.classList.add('up');
			sortDir = 1;
		}
		
		loadStats(sortBy, sortDir);
	}
}
