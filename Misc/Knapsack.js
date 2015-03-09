// 2493893
// 4243395
var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\n').map(function(x) { return x.trim(); }),
    maxSize = parseInt(input[0].split(' ')[0]),
    items = parseInt(input[0].split(' ')[1]), i;

input.shift();

var values = [],
	weights = [],
	len = input.length, i;

// dummy values so these arrays aren't zero-indexed
values[0] = -1;
weights[0] = -1;

for (i = 0; i < len; ++i) {
	var temp = input[i].split(' ');
	values.push(parseInt(temp[0], 10));
	weights.push(parseInt(temp[1], 10));
}

var hash = [];
for (i = 0; i <= items; ++i) {
	hash[i] = [];
	hash[i][0] = 0;	// set first column to be all zeroes
}

// set first row to be all zeroes
for (i = 0; i <= maxSize; ++i) {
	hash[0][i] = 0;
}

function knapsack(hash, values, weights, itemIndex, size) {
	if (itemIndex === weights.length) {
		return 0;
	}

	if (hash[itemIndex][size]) {
		return hash[itemIndex][size];
	}

	if (size - weights[itemIndex] < 0) {
		return hash[itemIndex][size] = knapsack(hash, values, weights, itemIndex + 1, size);
	} else {
		return hash[itemIndex][size] = Math.max(knapsack(hash, values, weights, itemIndex + 1, size),
												knapsack(hash, values, weights, itemIndex + 1, size - weights[itemIndex]) + values[itemIndex]);
	}
}

// x: size, y: item
console.log(knapsack(hash, values, weights, 1, maxSize))