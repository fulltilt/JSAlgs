function Dictionary() {
	this.dataStore = [];
	this.add = add;
	this.find = find;
	this.remove = remove;
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

function showAll() {
	var keys = Object.keys(this.dataStore).sort();
	for (var i = 0; i < keys.length; i++)
		console.log(keys[i] + ' -> ' + this.dataStore[keys[i]]);
}

/* Note: we couldn't simply just use: return Object.keys(this.dataStore).length 
    because 'length' doesn't work with string keys
*/
function size() {
	var s = 0;
	var keys = Object.keys(this.dataStore);
	for (var i = 0; i < keys.length; i++)
		++s;

	return s;
}

// Test #1
var pbook = new Dictionary();
pbook.add("Mike","123");
pbook.add("David", "345");
pbook.add("Cynthia", "456");
console.log("David's extension: " + pbook.find("David"));
pbook.remove("David");
pbook.showAll();
console.log("Size of dictionary: " + pbook.size());