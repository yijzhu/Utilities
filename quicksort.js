class QuickSort {
	constructor(arr) {
	    this.array = arr;
	    this.actions = [];
	}

	sort() {
		this.partition(this.array, 0, this.array.length-1);
		return {
			array : this.array,
			actions : this.actions
		}
	}

	partition(arr, start, end) {
		console.log(`${JSON.stringify(arr)} -- start: ${start}; end: ${end}`);
		if (start < end) {
			const pivot = arr[end];
			let storePos = start;
			for (let i = start; i < end; i++) {
				if (arr[i] < pivot) {
					this.swap(arr, i, storePos);
					storePos++;
				}
			}
			this.swap(arr, end, storePos);

			console.log(`Find storePos: ${storePos}`);
			this.partition(arr, start, storePos - 1);
			this.partition(arr, storePos + 1, end);
		}
	}

	swap(arr, i, j) {
		this.addSwapAction({i, j});
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	addSwapAction({i, j}) {
		const type = 'swap';
		this.actions.push({type, i, j});
	}
}