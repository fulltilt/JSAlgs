// 69119377652
// 67311454237
var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\n'),
    jobs = parseInt(input[0], 10),
    len = input.length, i;

input.shift();

var input1 = [],
	input2 = [];

for (i = 0; i < jobs; i++) {
	input[i] = input[i].trim().split(' ').map(function(x) { return parseInt(x, 10); });
	input1[i] = [input[i][0] - input[i][1], input[i][0], input[i][1]];
	input2[i] = [input[i][0] / input[i][1], input[i][0], input[i][1]];
}

input1.sort(sorter);
input2.sort(function(a, b) { return b[0] - a[0]; });

// sort descending. tie breaker: use larger weight
function sorter(a, b) {
	if (a[0] === b[0]) {
		return b[1] - a[1];
	} else {
		return b[0] - a[0];
	}
}

function getWeightedSum(arr) {
	var cumulativeLength = 0,
    	weightedSum = 0;
	for (i = 0; i < jobs; i++) {
		cumulativeLength += arr[i][2];
		weightedSum += (arr[i][1] * cumulativeLength);
	}

	return weightedSum;
}

console.log(getWeightedSum(input1));
console.log(getWeightedSum(input2));