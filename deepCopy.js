function deepCopy(obj) {
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