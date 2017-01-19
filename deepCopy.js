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
	function getParentAndCurrentKey(path, root) {
		if (!path) {
			return {
				curKey : path,
				parent : root
			};
		}
		var keys = path.split('.');
		var curKey = keys[keys.length - 1];
		var parent = keys.slice(0, -1).reduce(function(obj, key) {
			return obj[key];
		}, root);
		return {
			curKey : curKey,
			parent : parent
		}
	}

	if (obj) {
		var queue = [], visited = [];
		// Push the root element
		queue.push({
			path : '',
			value : obj	
		});

		var newObj;
		while (queue.length > 0) {
			var item = queue.shift();
			var typeStr = Object.prototype.toString.apply(item.value);

			// Handle circle
			if (typeStr === '[object Object]' || typeStr === '[object Array]') {
				var circleTargetItem = visited.filter(function(visitedItem) {
					return item.value === visitedItem.value;
				})[0];
				if (circleTargetItem) {
					var circleRet = getParentAndCurrentKey(circleTargetItem.key, newObj);
					var circleParent = circleRet.parent, circleCurKey = circleRet.curKey;
					var circleTarget = circleCurKey ? circleParent[circleCurKey] : circleParent;

					var ret = getParentAndCurrentKey(item.path, newObj);
					var parent = ret.parent, curKey = ret.curKey;
					// parent must exist, otherwise there is no circle at all
					parent[curKey] = circleTarget;
					continue;
				}
			} 

			// Not push circle element
			visited.push(item);

			// Get parent obj
			var ret = getParentAndCurrentKey(item.path, newObj);
			var parent = ret.parent, curKey = ret.curKey;

			var val;
			if (typeStr === '[object Object]' || typeStr === '[object Array]') {
				val = typeStr === '[object Object]' ? {} : [];
				// Push children
				Object.keys(item.value).forEach(function(key) {
					queue.push({
						path : item.key ? item.key + '.' + key : key,
						value : item.value[key]
					})				
				});
			} else if (typeStr === '[object Function]') {
				val = function() { return item.value.apply(this, arguments); }
			} else {
				val = item.value;
			}

			if (parent && curKey) {
				parent[curKey] = val;
			} else {
				// Init newObj, if and only if the item is the first element
				newObj = val;
			}	
		}
		return newObj;
	}
	return obj;
}