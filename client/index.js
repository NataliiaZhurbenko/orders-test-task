import { loadOrders, createOrder, editOrder, loadStats } from './handlers.js';
import ToggleArrows from './arrows.js';

document.getElementById('create-save').onclick = createOrder;
document.getElementById('edit-save').onclick = editOrder;
loadOrders();
loadStats();
const arrows = new ToggleArrows();
arrows.addHandlers();