function HashTable() {
	this.table = new Array(137);  // Array size should be a prime #
	this.simpleHash = simpleHash;
	this.betterHash = betterHash;
	this.showDistro = showDistro;
	this.put = put;
	//this.get = get;
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
	var primeConstant = 31;
	var total = 0;
	for (var i = 0; i < string.length; ++i)
		total += primeConstant * total + string.charCodeAt(i);

	total = total % this.table.length;
	if (total < 0)
		total += this.table.length - 1;
	console.log(total);
	return parseInt(total, 10);
}

function put(data) {
	//this.table[this.simpleHash(data)] = data;
	this.table[this.betterHash(data)] = data;
}

function showDistro() {
	var n = 0;
	for (var i = 0; i < this.table.length; i++) {
		if (this.table[i] !== undefined)
			console.log(i + ": " + this.table[i]);
	}
}

var someNames = ["David", "Jennifer", "Donnie", "Raymond", "Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
/* Test #1
var hTable = new HashTable();
for (var i = 0; i < someNames.length; ++i) {
	hTable.put(someNames[i]);
}
hTable.showDistro();
*/

// Test #2
var hTable = new HashTable();
for (var i = 0; i < someNames.length; ++i) {
	hTable.put(someNames[i]);
}
hTable.showDistro();