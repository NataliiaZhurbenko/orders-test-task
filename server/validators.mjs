export function isValidByStatus(data) {
	return ((data.status !== '1') || (data.name && data.phone && data.address));
}
