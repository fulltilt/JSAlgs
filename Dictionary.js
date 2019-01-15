function Dictionary() {
	this.dataStore = [];
	this.add = add;
	this.find = find;
	this.remove = remove;
	this.clear = clear;
	this.showAll = showAll;
	this.size = size;
}

function add(key, value) {
	this.dataStore[key] = value;
}

function find(key) {
	return this.dataStore[key];
}

function remove(key) {
	delete this.dataStore[key];
}

/* NOTE: if I did: for (var key in keys) { ... }, 'key' ended up just being an integer index value i.e. 0,1,etc.
*/
function clear() {
	var keys = Object.keys(this.dataStore);
	for (var i = 0; i < keys.length; i++) {;
		delete this.dataStore[keys[i]];
	}
}

function showAll() {
	var keys = Object.keys(this.dataStore).sort();	// sort the keys before displaying
	for (var i = 0; i < keys.length; i++)
		console.log(keys[i] + ' -> ' + this.dataStore[keys[i]]);
}

/* Note: we couldn't simply just use: return Object.keys(this.dataStore).length; 
    because 'length' doesn't work with string keys
*/
function size() {
	var s = 0;
	var keys = Object.keys(this.dataStore);
	for (var i = 0; i < keys.length; i++)
		++s;

	return s;
}

module.exports = Dictionary;