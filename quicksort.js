function qucikSort(arr) {
	partition(arr, 0, arr.length-1);
	return arr;
}

function partition(arr, start, end) {
	console.log(`${JSON.stringify(arr)} -- start: ${start}; end: ${end}`);
	if (start < end) {
		const pivot = arr[end];
		let storePos = start;
		for (let i = start; i < end; i++) {
			if (arr[i] < pivot) {
				swap(arr, i, storePos);
				storePos++;
			}
		}
		swap(arr, end, storePos);

		console.log(`Find storePos: ${storePos}`);
		partition(arr, start, storePos - 1);
		partition(arr, storePos + 1, end);
	}
}

function swap(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
}