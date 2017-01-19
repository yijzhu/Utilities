function deepCopyByRecursion(obj) {
	if (obj) {
		var typeStr = Object.prototype.toString.apply(obj)
		if (typeStr === '[object Object]') {
			var newObj = {};
			Object.keys(obj).forEach(function(key) {
				newObj[key] = deepCopy(obj[key]);
			});
			return newObj;
		} else if (typeStr === '[object Array]') {
			return obj.map(function(item) {
				return deepCopy(item);
			});
		} else if (typeStr === '[object Function]') {
			return function() {
				return obj.apply(this, arguments);
			}
		}
	} 

	return obj;
}

function deepCopyByBFS(obj) {
	if (obj) {
		var queue = [];
		// Push the root element
		queue.push({
			key : '',
			value : obj	
		});

		var newObj;
		while (queue.length > 0) {
			var item = queue.shift();
			var parent, curKey;

			// Get parent obj
			if (item.key) {
				var keys = item.key.split('.');
				curKey = keys[keys.length - 1];
				parent = keys.slice(0, -1).reduce(function(obj, key) {
					return obj[key];
				}, newObj);
			}

			var typeStr = Object.prototype.toString.apply(item.value);
			var val;
			if (typeStr === '[object Object]' || typeStr === '[object Array]') {
				val = typeStr === '[object Object]' ? {} : [];
				// Push children
				Object.keys(item.value).forEach(function(key) {
					queue.push({
						key : item.key ? item.key + '.' + key : key,
						value : item.value[key]
					})				
				});
			} else if (typeStr === '[object Function]') {
				val = function() {
					return obj.apply(this, arguments);
				}
			} else {
				val = item.value;
			}

			if (parent && curKey) {
				parent[curKey] = val;
			} else {
				newObj = val;
			}	
		}
		return newObj;
	}
	return obj;
}