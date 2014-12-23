var DLL = require('./DoublyLinkedList.js'); // for firstNonRepeatingCharInStream

function HashTable() {
	this.table = new Array(131);  // Array size should be a prime #
	this.simpleHash = simpleHash;
	this.betterHash = betterHash;
	this.showDistro = showDistro;
	this.get = get;
	this.getBucket = getBucket
	this.clear = clear;

	// no collision handling
	this.put1 = put1;

	// separate chaining
	this.put2 = put2;

	// linear probing
	this.put3 = put3;

	this.getFirstCharThatAppearsOnce = getFirstCharThatAppearsOnce;
	this.firstNonRepeatingCharInStream = firstNonRepeatingCharInStream;
	this.getFirstCharThatAppearsOnceInStream = getFirstCharThatAppearsOnceInStream;
	this.deleteSecondFromFirst = deleteSecondFromFirst;
	this.deleteDuplicatesButKeepFirstOccurrence = deleteDuplicatesButKeepFirstOccurrence;
	this.isAnagrams = isAnagrams;
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

// http://www.geeksforgeeks.org/find-first-non-repeating-character-stream-characters/
// NOTE: I had to access a lot of private variables in DoublyLinkedList to get this to work
function firstNonRepeatingCharInStream(arr) {
  var dll = new DLL.DoublyLinkedList(),   // doubly linked list as we can delete in constant time
      hash = [],
      length = arr.length,
      i;

  for (i = 0; i < length; i++) {
    firstNonRepeatingCharInStreamUtil(arr[i], dll, hash);
  }
}

// helper fxn for firstNonRepeatingCharInStream
function firstNonRepeatingCharInStreamUtil(element, dll, hash) {
  console.log('Reading', element, 'from stream');
  if (hash[element]) {
    if (hash[element].node !== null) {
      dll.deleteNode(hash[element].node);
      hash[element].node = null;
    }
  } else {
    if (dll.size === 0) {
      dll.insertHead(element);
      hash[element] = { node : dll.head };
    } else {
      var newNode = new DLL.Node(element),
          tail = dll.getTail();
          tail.next = newNode;
          newNode.previous = tail;
      dll.tail = newNode;
      dll.size += 1;

      hash[element] = { node: newNode };
    }
  }

  console.log('First non-repeating character so far is', dll.head.data);
}

// Apress #76: Implement a function to find the first character in a string that only appears once. For example, the output is the character ‘l’ when the input is “google”
// NOTE: simpler version of above as I used JavaScript arrays to simulate the hash table and doubly linked list
function getFirstCharThatAppearsOnce(str) {
	var hashTable = [],
			length = str.length, i;

	// add each individual char into a hash table
	for (i = 0; i < length; i++) {
		if (hashTable[str[i]]) {
			hashTable[str[i]] += 1;
		} else {
			hashTable[str[i]] = 1;
		}
	}

	// return the first char that appears only once
	for (i = 0; i < length; i++) {
		if (hashTable[str[i]] === 1) {
			return str[i];
		}
	}

	return '';
}

// Apress #77: Implement a function to find the first character in a stream that only appears once at any time while reading the stream.
function getFirstCharThatAppearsOnceInStream(arr) {
	var hashTable = [],
			uniqueChars = [],
			length = arr.length, i;

	for (i = 0; i < length; i++) {
		if (!hashTable[arr[i]]) {
			hashTable[arr[i]] = 1;
			uniqueChars.push(arr[i]);
		} else {
			hashTable[arr[i]] += 1;
		}

		while (hashTable[uniqueChars[0]] > 1) {
			uniqueChars.shift();
		}

		if (uniqueChars.length === 0) {
			console.log('');
		} else {
			console.log(uniqueChars[0]);
		}
	}
}

// Apress #78: Given two strings, how do you delete characters contained in the second string from the first string? 
// For example, if all characters in the string “aeiou” are deleted from the string “We are students.”, the result is “W r stdnts.”
function deleteSecondFromFirst(str1, str2) {
	var hashTable = [],
			length1 = str1.length,
			length2 = str2.length, 
			result = '', i;

	for (i = 0; i < length2; i++) {
		if (!hashTable[str2[i]]) {
			hashTable[str2[i]] = true;
		}
	}

	for (i = 0; i < length1; i++) {
		if (!hashTable[str1[i]]) {
			result += str1[i];
		}
	}

	return result;
}

// Apress #79: Please implement a function to delete all duplicated characters in a string and keep only the first occurrence of each character left. 
// For example, if the input is string “google”, the result after deletion is “gole”
function deleteDuplicatesButKeepFirstOccurrence(str) {
	var hashTable = [],
			length = str.length, 
			result = '', i;

	for (i = 0; i < length; i++) {
		if (!hashTable[str[i]]) {
			hashTable[str[i]] = true;
			result += str[i];
		}
	}

	return result;
}

// Apress #80: verify if two words are anagrams
// NOTE: another algorithm is to sort both words and then compare them. This is O(n log n) but requires no extra space
function isAnagrams(str1, str2) {
	var length1 = str1.length,
			length2 = str2.length,
			hashTable = [], i;

	if (length1 !== length2) {
		return false;
	}

	// create hash table for str1
	for (i = 0; i < length1; i++) {
		if (!hashTable[str1[i]]) {
			hashTable[str1[i]] = 1;
		} else {
			hashTable[str1[i]] += 1;
		}
	}

	for (i = 0; i < length2; i++) {
		if (!hashTable[str2[i]] || hashTable[str2[i]] === 0) { // if hash table entry doesn't exist or the value is zero, return false
			return false;
		} else {
			hashTable[str2[i]] -= 1;	// decrement count
		}
	}

	return true;
}

module.exports = HashTable;