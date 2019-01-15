// 427 (bottom algo not very efficient)
var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\n'),
    len = input.length, i;

// put input into hash table
var hash = {};
for (var i = 0; i < len; i++) {
	hash[parseInt(input[i], 10)] = true;
}

var keys = Object.keys(hash),
    length = keys.length, // 999752  
  	results = {},
  	sum,
 
for (var i = 0; i < length; ++i) {
	for (var j = -10000; j <= 10000; ++j) {
		sum = j - keys[i];
		if (sum in hash) {
			results[j] = true;
		}
	}
}

console.log(Object.keys(results).length)