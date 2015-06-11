all_nodes = [];
for (var x = 0; x < 20; ++x) {
	for (var y = 0; y < 20; ++y) {
		all_nodes.push([x, y]);
	}
}

// get valid neighbors given a graph and a node in the graph (assumes a rectangle with no dead spots)
function neighbors(nodes, node) {
	var directions = [[1,0], [0,1], [-1,0], [0,-1]],
		result = [];

	var graph_length = nodes.length,
		graph_width = nodes[0].length;
	for (i in directions) {
		var neighbor = [node[0] + directions[i][0], node[1] + directions[i][1]];
		if (0 <= neighbor[0] && neighbor[0] < graph_length && 0 <= neighbor[1] && neighbor[1] < graph_width) {
			result.push(neighbor);
		}
	}
	return result;
}

// initial Graph function
var Graph = function() {
	this.edges = {};

	this.neighbors = function(id) {
		return this.edges[id];
	}
}

// traditional BFS
var BFS = function(graph, start) {
	var frontier = [],
		visited = {},
		current = null;
	frontier.push(start);
	visited[start] = true;

	while (frontier.length > 0) {
		current = frontier.shift();
		console.log('Visiting:', current);
		var neighbors = graph.neighbors(current),
			len = neighbors.length;
		
		for (var i = 0; i < len; ++i) {
			if (visited[neighbors[i]] !== true) {
				frontier.push(neighbors[i]);
				visited[neighbors[i]] = true;
			}
		}
	}
}

example_graph = new Graph()
example_graph.edges = {
    'A': ['B'],
    'B': ['A', 'C', 'D'],
    'C': ['A'],
    'D': ['E', 'A'],
    'E': ['B']
}

//BFS(example_graph, 'A');

// modified BFS that allows us to backtrack
var BFS2 = function(graph, start) {
	var frontier = [],
		cameFrom = {},
		current = null;
	frontier.push(start);
	cameFrom[start] = null;

	while (frontier.length > 0) {
		current = frontier.shift();

		//console.log('Visiting:', current);
		var neighbors = graph.neighbors(current),
			len = neighbors.length;

		for (var i = 0; i < len; ++i) {
			if (cameFrom[neighbors[i]] === undefined) {
				frontier.push(neighbors[i]);
				cameFrom[neighbors[i]] = current;
			}
		}
	}

	return cameFrom;
}

console.log(BFS2(example_graph, 'A'))

// modified BFS that allows us to stop once we hit a goal
var BFS3 = function(graph, start, goal) {
	var frontier = [],
		cameFrom = {},
		current = null;
	frontier.push(start);
	cameFrom[start] = null;

	while (frontier.length > 0) {
		current = frontier.shift();

		if (current[0] === goal[0] && current[1] === goal[1]) {
			break;
		}

		//console.log('Visiting:', current);
		var neighbors = graph.neighbors(current),
			len = neighbors.length;

		for (var i = 0; i < len; ++i) {
			if (cameFrom[neighbors[i]] === undefined) {
				frontier.push(neighbors[i]);
				cameFrom[neighbors[i]] = current;
			}
		}
	}

	return cameFrom;
}

var SquareGrid = function(width, height) {
	this.width = width;
	this.height = height;
	this.walls = [];

	this.inBounds = function(id) {
		return (0 <= id[0] && id[0] < this.width && 0 <= id[1] && id[1] < this.height);
	}

	this.passable = function(id, walls) {
		return walls[id[0], id[1]] === undefined;
	}

	this.neighbors = function(id) {
		var results = [[id[0] + 1, id[1]], [id[0], id[1] - 1], [id[0] - 1, id[1]], [id[0], id[1] + 1]];
		if (((id[0] + id[1]) % 2) === 0) {
			results = results.reverse();
		}

		// note: filter() creates a new context so pass 'this' as a second argument so the object holds the context
		results = results.filter(this.inBounds, this);
		results = results.filter(this.passable, this);

		return results;
	}

	this.draw = function() {
		var wallObjArr = {};
		for (var i = 0; i < this.walls.length; ++i) {
			wallObjArr[this.walls[i]] = true;
		}

		for (var y = 0; y < this.height; ++y) {
			var row = '';
			for (var x = 0; x < this.width; ++x) {
				if (wallObjArr[[x,y]] === true) {
					row += '##';
				} else {
					row += '. ';
				}
			}
			console.log(row);
		}
		console.log('\n')
	}

	this.drawWithParents = function(start, goal) {
		var wallObjArr = {};
		for (var i = 0; i < this.walls.length; ++i) {
			wallObjArr[g.walls[i]] = true;
		}

		var parents = BFS3(this, start, goal);

		for (var y = 0; y < this.height; ++y) {
			var row = '';
			for (var x = 0; x < this.width; ++x) {
 				if (x === goal[0] && y === goal[1]) {	// print goal
					row += 'ZZZ';
				} 
				else if (wallObjArr[[x,y]] === true) {	// print wall
					row += '###';
				} else if (parents[[x,y]] === undefined) {	// print '.' to signify that this was untouched
					row += '. ';
				} else {
					var parent = parents[[x,y]]

					if (parent === null) {	// we reached the start node
						row += 'AAA';
					} else if (x === parent[0] - 1) {
						row += '-> '
					} else if (x === parent[0] + 1) {
						row += '<- ';
					} else if (y === parent[1] - 1) {
						row += ' v ';
					} else if (y === parent[1] + 1) {
						row += ' ^ ';
					}
				}
			}
			console.log(row);
		}
		console.log('\n')
	}	
}

var g = new SquareGrid(30, 15);
g.walls = [
	[3, 3], [4, 3],
	[3, 4], [4, 4],
	[3, 5], [4, 5],
	[3, 6], [4, 6],
	[3, 7], [4, 7],
	[3, 8], [4, 8],
	[3, 9], [4, 9],
	[3, 10], [4, 10],
	[3, 11], [4, 11],

	[15,4],[16,4],
	[15,5],[16,5],
	[15,6],[16,6],
	[15,7],[16,7],
	[15,8],[16,8],
	[15,9],[16,9],
	[15,10],[16,10],
	[15,11],[16,11],
	[15,12],[16,12],
	[15,13],[16,13],
	[15,14],[16,14],

	[21, 0], [22, 0],
	[21, 1], [22, 1],
	[21, 2], [22, 2],
	[21, 3], [22, 3],
	[21, 4], [22, 4],
	[21, 5], [22, 5], [23, 5], [24, 5], [25, 5],
	[21, 6], [22, 6], [23, 6], [24, 6], [25, 6],
];
g.draw();
g.drawWithParents([8,7], [17,2]);


// Grid which uses Dijkstra's algorithm to account for weights
function GridWithWeights(squareGrid) {
	this.squareGrid = squareGrid;
	this.weights = {};

	// a - from; b - to
	this.cost = function(a, b) {
		// this implementation doesn't rely on 'from'. In this case, if destination is in weights, return b's cost
		// else return 1
		var to = '' + b[0] + ',' + b[1]; // step we have to do for JavaScript since Object keys are always strings
		return this.weights[to] === undefined ? 1 : this.weights[to];
	}

	this.drawWeightedGrid = function() {
		var xLength = this.squareGrid.width,
			yLength = this.squareGrid.height;

		for (var y = 0; y < yLength; ++y) {
			var row = '';
			for (var x = 0; x < xLength; ++x) {
				var val = this.weights['' + x + ',' + y];
				if (val !== Infinity) {
					if (val < 10) {
						row += val + '  ';
					} else {
						row += val + ' ';
					}
				} else {
					row += '###';
				}
			}
			console.log(row);
		}
		console.log('\n');
	}

	this.drawWeightedGridWithParents = function(start, goal, search) {
		var wallObjArr = {};
		for (var i = 0; i < this.squareGrid.walls.length; ++i) {
			wallObjArr[this.squareGrid.walls[i]] = true;
		}

		var parents = search(this, start, goal)[0];

		for (var y = 0; y < this.squareGrid.height; ++y) {
			var row = '';
			for (var x = 0; x < this.squareGrid.width; ++x) {
 				if (x === goal[0] && y === goal[1]) {	// print goal
					row += 'ZZZ';
				} 
				else if (wallObjArr[[x,y]] === true) {	// print wall
					row += '###';
				} else if (parents[[x,y]] === undefined) {	// print '.' to signify that this was untouched
					row += '.  ';
				} else {
					var parent = parents[[x,y]]

					if (parent === null) {	// we reached the start node
						row += 'AAA';
					} else if (x === parent[0] - 1) {
						row += '-> '
					} else if (x === parent[0] + 1) {
						row += '<- ';
					} else if (y === parent[1] - 1) {
						row += ' v ';
					} else if (y === parent[1] + 1) {
						row += ' ^ ';
					}
				}
			}
			console.log(row);
		}
		console.log('\n')
	}		

	this.reconstructPath = function(start, goal, search) {
		var current = goal;
		var path = [current];		
		var nodes = {};
		nodes[current] = 1;

		var cameFrom = search(this, start, goal)[0];

		while (current[0] !== start[0] || current[1] !== start[1]) {
			current = cameFrom[current];
			path.push(current);
			nodes[current] = 1;
		}

		var xLength = this.squareGrid.width,
			yLength = this.squareGrid.height;

		for (var y = 0; y < yLength; ++y) {
			var row = '';
			for (var x = 0; x < xLength; ++x) {
				if (x === start[0] && y === start[1]) {
					row += 'SSS';
				} else if (x === goal[0] && y === goal[1]) {
					row += 'GGG';
				} else {
					var tmp = '' + x + ',' + y;
					if (nodes[tmp] !== undefined) {
						row += '@@@';
					} else {
						row += ' . ';
					}
				}
			}
			console.log(row);
		}
		console.log('\n');		
	}
}

var PriorityQueue = function() {
	this.elements = [];

	this.empty = function() {
		return this.elements.length === 0;
	}

	this.put = function(priority, item) {
		this.elements.push([priority, item]);

		var len = this.elements.length,
			index = len - 1;

		while (index > 0) {
			var node = this.elements[index],
				parentIndex = Math.floor((index - 1) / 2);
			
			if (node[0] < this.elements[parentIndex][0]) {	// if nodes priority is higher, swim up
				var temp = this.elements[index];
				this.elements[index] = this.elements[parentIndex];
				this.elements[parentIndex] = temp;
			} else {
				break;
			}

			index = parentIndex;
		}
	}

	this.get = function() {
		if (this.empty()) {
			console.log('Cannot pop from empty queue!');
			return;
		}

		if (this.elements.length === 1) {
			return this.elements.pop();
		}

		var returnVal = this.elements[0],
			index = 0;

		var lastElement = this.elements.pop();
		this.elements[index] = lastElement;

		var len = this.elements.length;

		while (true) {
			var parent = this.elements[index];
			var leftChildIndex = index * 2 + 1,
				rightChildIndex = index * 2 + 2,
				leftChild = null, 
				rightChild = null;

			if (leftChildIndex < len) {
				leftChild = this.elements[leftChildIndex];
			}

			if (rightChildIndex < len) {
				rightChild = this.elements[rightChildIndex];
			}

			if (leftChild === null && rightChild === null) {
				break;
			} else if (rightChild === null) {
				if (leftChild[0] < parent[0]) {
					var temp = this.elements[leftChildIndex];
					this.elements[leftChildIndex] = this.elements[index];
					this.elements[index] = temp;

					index = leftChildIndex;
				} else {
					break;
				}
			} else {
				var minChildIndex = (leftChild[0] < rightChild[0]) ? leftChildIndex : rightChildIndex;
				
				if (this.elements[minChildIndex][0] < parent[0]) {
					var temp = this.elements[minChildIndex];
					this.elements[minChildIndex] = this.elements[index];
					this.elements[index] = temp;

					index = minChildIndex;
				} else {
					break;
				}
			}
		}

		return returnVal;		
	}
}
 
// var pq = new PriorityQueue();
// pq.put(6,2);
// pq.put(3,2);
// pq.put(4,2);
// pq.put(1,2);
// console.log(pq.elements, pq.elements.length)
// console.log(pq.get())
// console.log(pq.elements, pq.elements.length)

var Dijkstra = function(graph, start, goal) {
	var frontier = new PriorityQueue(),
		cameFrom = {},
		costSoFar = {};

	frontier.put(0, start);
	cameFrom[start] = null;
	costSoFar[start] = 0;

	while (!frontier.empty()) {
		var current = frontier.get()[1];

		if (current[0] === goal[0] && current[1] === goal[1]) {
			break;
		}

		var neighbors = graph.squareGrid.neighbors(current),
			len = neighbors.length;

		for (var i = 0; i < len; ++i) {
			var newCost = costSoFar[current] + graph.cost(current, neighbors[i]);

			if ((cameFrom[neighbors[i]] === undefined) || newCost < costSoFar[neighbors[i]]) {
				costSoFar[neighbors[i]] = newCost;
				priority = newCost;
				frontier.put(priority, neighbors[i]);
				cameFrom[neighbors[i]] = current;
			}
		}	
	}

	return [cameFrom, costSoFar];
}

var reconstructPath = function(cameFrom, start, goal) {
	var current = goal;
	var path = [current];
	while (current[0] !== start[0] && current[1] !== start[1]) {
		current = cameFrom[current];
		path.push(current);
	}
	path = path.reverse();
	return path;
}


var heuristic = function(a, b) {
	return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

var AStar = function(graph, start, goal) {
	var frontier = new PriorityQueue(),
		cameFrom = {},
		costSoFar = {};

	frontier.put(0, start);
	cameFrom[start] = null;
	costSoFar[start] = 0;

	while (!frontier.empty()) {
		var current = frontier.get()[1];

		if (current[0] === goal[0] && current[1] === goal[1]) {
			break;
		}

		var neighbors = graph.squareGrid.neighbors(current),
			len = neighbors.length;

		for (var i = 0; i < len; ++i) {
			var newCost = costSoFar[current] + graph.cost(current, neighbors[i]);

			if ((cameFrom[neighbors[i]] === undefined) || newCost < costSoFar[neighbors[i]]) {
				costSoFar[neighbors[i]] = newCost;
				priority = newCost + heuristic(goal, neighbors[i]);
				frontier.put(priority, neighbors[i]);
				cameFrom[neighbors[i]] = current;
			}
		}	
	}

	return [cameFrom, costSoFar];	
}


var g2 = new SquareGrid(10, 10);
g2.walls = [[1,7],[1,8],[2,7],[2,8],[3,7],[3,8]];
var gw = new GridWithWeights(g2);

/* note: using strings as keys instead of tuples as Object keys in JavaScript are always strings.
For future reference, if I were to try gw.weights = { [0,0]: 5 }, I would get an error. But if I were to try
gw.weights[[0,0]] = 5, it would work. However, the array would be converted into a string: gw.weights = { '0,0': 5 }
*/
gw.weights = {
	'0,0':5, '1,0':4, '2,0':5, '3,0':6, '4,0':7 , '5,0':8 , '6,0':9 , '7,0':10, '8,0':11, '9,0':12,
	'0,1':4, '1,1':3, '2,1':4, '3,1':5, '4,1':10, '5,1':13, '6,1':10, '7,1':11, '8,1':12, '9,1':13,
	'0,2':3, '1,2':2, '2,2':3, '3,2':4, '4,2':9 , '5,2':14, '6,2':15, '7,2':12, '8,2':13, '9,2':14,
	'0,3':2, '1,3':1, '2,3':2, '3,3':3, '4,3':8 , '5,3':13, '6,3':18, '7,3':17, '8,3':14, '9,3':19,
	'0,4':1, '1,4':0, '2,4':1, '3,4':6, '4,4':11, '5,4':16, '6,4':21, '7,4':20, '8,4':15, '9,4':16,
	'0,5':2, '1,5':1, '2,5':2, '3,5':7, '4,5':12, '5,5':17, '6,5':22, '7,5':21, '8,5':16, '9,5':17,
	'0,6':3, '1,6':2, '2,6':3, '3,6':4, '4,6':9 , '5,6':14, '6,6':19, '7,6':16, '8,6':17, '9,6':18,
	'0,7':4, '1,7':Infinity, '2,7':Infinity, '3,7':Infinity, '4,7':14, '5,7':19, '6,7':18, '7,7':15, '8,7':16, '9,7':17,
	'0,8':5, '1,8':Infinity, '2,8':Infinity, '3,8':Infinity, '4,8':15, '5,8':16, '6,8':13, '7,8':14, '8,8':15, '9,8':16,
	'0,9':6, '1,9':7, '2,9':8, '3,9':9, '4,9':10, '5,9':11, '6,9':12, '7,9':13, '8,9':14, '9,9':15
};
gw.drawWeightedGrid();
gw.drawWeightedGridWithParents([1,4],[7,8], Dijkstra)
gw.reconstructPath([1,4],[7,8], Dijkstra);

gw.drawWeightedGridWithParents([1,4],[7,8], AStar)
gw.reconstructPath([1,4],[7,8], AStar);

