// 6118
// node --stack-size=32000 Clustering2.js input/clustering_big.txt
/* list of points that have hamming distance less than 3. 
   By manually computation, there are 24 choose 1 + 24 choose 1 = 300 points
   24 choose 2 = 276; 24 choose 1 = 24

   binomial theorem:    n! / (k! * (n - k)!)
   https://class.coursera.org/algo2-003/forum/thread?thread_id=135#comment-273
*/   
var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\n').map(function(x) { return x.trim(); }),
    nodes = parseInt(input[0].split(' ')[0]),
    bits = parseInt(input[0].split(' ')[1]), i, j;

input.shift();

var len = input.length, //198788, //Object.keys(graph).length = 198788 unique edges
	clusters = len,
	parents = {};

for (i = 0; i < clusters; i++) {
	parents[input[i]] = -1;
}
input = Object.keys(parents);
len = input.length,
clusters = len;

for (var a = 0; a < len; ++a) {
 	var node = input[a],
 		temp = input[a].trim().split(' ').map(function(x) { return parseInt(x, 10); }), permutation;
 
	// get all potential points that have hamming distance less than 3 from current point
	for (i = temp.length - 1; i >= 0; --i) {
		temp[i] ^= 1;
		permutation = temp.join(' ');
		if (permutation in parents) {
			if (findParent(parents, node) !== findParent(parents, permutation)) {
				union(parents, node, permutation);
				clusters -= 1;
			}
		}

		for (j = temp.length - 1; j > i; --j) {
			temp[j] ^= 1;
			permutation = temp.join(' ');
			if (permutation in parents) {
				if (findParent(parents, node) !== findParent(parents, permutation)) {
					union(parents, node, permutation);
					clusters -= 1;
				}
			}
			temp[j] ^= 1;
		}
		temp[i] ^= 1;
	}
}

console.log(clusters);

function findParent(parents, node) {
	if (parents[node] === -1) {
		return node;
	}

	return findParent(parents, parents[node]);
}

function union(parents, node1, node2) {
	var leader1 = findParent(parents, node1),
		leader2 = findParent(parents, node2);

	parents[leader2] = leader1;
}

