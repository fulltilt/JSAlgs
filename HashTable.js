function HashTable() {
	this.table = new Array(131);  // Array size should be a prime #
	this.simpleHash = simpleHash;
	this.betterHash = betterHash;
	this.showDistro = showDistro;
	this.get = get;

	// no collision handling
	this.put1 = put1;

	// separate chaining
	this.put2 = put2;

	// linear probing
	this.put3 = put3;
	this.getBucket = getBucket

	this.clear = clear;
}

// First hash fxn
function simpleHash(data) {
	var total = 0;
	for (var i = 0; i < data.length; i++)
		total += data.charCodeAt(i);

	return total % this.table.length;
}

/* Improved 2nd hash fxn (Horner's method) */
function betterHash(string) {
	var primeConstant = 31;	// constant should be a prime #
	var total = 0;
	for (var i = 0; i < string.length; ++i)
		total += primeConstant * total + string.charCodeAt(i);

	total = total % this.table.length;
	if (total < 0)
		total += this.table.length - 1;
	
	return parseInt(total, 10);
}

function put1(data) {
	//this.table[this.simpleHash(data)] = data;
	this.table[this.betterHash(data)] = data;
}

function get(key) {
	return this.table[this.betterHash(key)];
}

function clear() {
	this.table = [];
	this.table.length = 131;	// must do this part to ensure that the length is a prime #. Didn't use new Array() as it can be ambiguous 
}

function showDistro() {
	var n = 0;
	for (var i = 0; i < this.table.length; i++) {
		if (this.table[i] !== undefined)
			console.log(i + ": " + this.table[i]);
	}
}

/** SEPERATE CHAINING **/
function put2(data) {
	var bucket = this.betterHash(data);
	
	if (this.table[bucket] === undefined) {
		this.table[bucket] = [data];
	} else {
		this.table[bucket].push(data); // NOTE: to make it more efficient, can sort the data after insertion or make the bucket a BST
	}
}

/** LINEAR PROBING **/
/* note: this fxn doesn't take into account when the hash table is full. To remedy this, when the table is full, we can resize the table and rehash all the values
*/
function put3(data) {
	var bucket = this.betterHash(data);

	if (this.table[bucket] === undefined) {
		this.table[bucket] = data;
	} else {
		while (this.table[bucket] !== undefined){
			++bucket;
			if (bucket === this.table.length) {
				bucket = 0;
			}
		}
		this.table[bucket] = data;
	}
}

function getBucket(key) {
	var bucket = this.betterHash(key);
	console.log(bucket);
	while (true) {
		console.log(this.table[bucket]);
		if (this.table[bucket] === key) {
			return bucket;
		}
		++bucket;
		if (bucket === this.table.length) {
			bucket = 0;
		}
	}
}

module.exports = HashTable;