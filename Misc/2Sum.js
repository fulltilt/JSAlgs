var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\n'),
    len = input.length, i;

// put input into hash table
var hash = {};
for (var i = 0; i < len; i++) {
	console.log(i, input[i])
	hash[input[i]] = true;
}

var length = 999752;	// Object.keys(hash).length
