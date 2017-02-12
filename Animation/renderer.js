class Renderer {
	constructor(arr) {
		this.array = arr;
	}

	render() {
		const container = document.createElement('div');
		container.className = 'container';
		this.array.forEach(item => {
			const height = this.getHeight(item);
			const bin = document.createElement('div');
			bin.id = item;
			bin.innerHTML = item;
			bin.classList.add('bin');
			bin.setAttribute('style', `height:${height}px`);
			container.appendChild(bin);
		})
		document.body.appendChild(container);
	}

	showProcess(actions) {
		if (!actions) {
			return;
		}
		const self = this;
		let action = actions.shift();
		while (action && action.i === action.j) {
			action = actions.shift();
		}
		if (!action) {
			return;
		}
		const {i, j} = action;
		console.log(`swaping ${i} and ${j}`)

		const bins = [...document.querySelectorAll('.bin')];
		self.beforeSwap(bins, i, j);

		setTimeout(() => {
			self.swap(bins, i, j);
			setTimeout(() => self.showProcess(actions), 1000);
		}, 3000);		
	}

	beforeSwap(bins, i, j) {
		let [bin1, bin2] = [bins[i], bins[j]];
		let style1 = bin1.getAttribute('style'), style2 = bin2.getAttribute('style');

		// Indicate they are going to be switched
		bin1.classList.add('active');
		bin2.classList.add('active');

		const offset = (j - i) * 200;
		style1 = this.addStyle(style1, 'left', offset);
		style2 = this.addStyle(style2, 'left', -offset);
		bin1.setAttribute('style', style1)
		bin2.setAttribute('style', style2)
	}

	swap(bins, i, j) {
		let [bin1, bin2] = [bins[i], bins[j]];
		let style1 = bin1.getAttribute('style'), style2 = bin2.getAttribute('style');
		// Switch
		[bin1.innerHTML, bin2.innerHTML] = [bin2.innerHTML, bin1.innerHTML];
		style1 = this.removeStyle(style1, 'left');
		style2 = this.removeStyle(style2, 'left');
		bin1.setAttribute('style', style2);
		bin2.setAttribute('style', style1);
		// Reset color
		bin1.classList.remove('active');
		bin2.classList.remove('active');
	}

	getHeight(val) {
		const max = Math.max(...this.array);
		const maxHeight = 200;
		return (val/max) * maxHeight;
	}

	addStyle(style, attr, val) {
		return style + `;${attr}:${val}`;
	}

	removeStyle(style, attr) {
		const kvs = style.split(';');
		return kvs.filter((kv) => {
			if (kv.indexOf(attr) === -1) {
				return true;
			}
		}).join(';');
	}
}