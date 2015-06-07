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
			wallObjArr[g.walls[i]] = true;
		}

		for (var y = 0; y < g.height; ++y) {
			var row = '';
			for (var x = 0; x < g.width; ++x) {
				if (wallObjArr[[x,y]] === true) {
					row += '##';
				} else {
					row += '. ';
				}
			}
			console.log(row);
		}		
	}

	this.drawWithParents = function(start, goal) {
		var wallObjArr = {};
		for (var i = 0; i < this.walls.length; ++i) {
			wallObjArr[g.walls[i]] = true;
		}

		var parents = BFS3(this, start, goal);

		for (var y = 0; y < g.height; ++y) {
			var row = '';
			for (var x = 0; x < g.width; ++x) {
 				if (x === goal[0] && y === goal[1]) {	// print goal
					row += 'ZZ';
				} 
				else if (wallObjArr[[x,y]] === true) {	// print wall
					row += '##';
				} else if (parents[[x,y]] === undefined) {	// print '.' to signify that this was untouched
					row += '. ';
				} else {
					var parent = parents[[x,y]]

					if (parent === null) {	// we reached the start node
						row += 'AA';
					} else if (x === parent[0] - 1) {
						row += '->'
					} else if (x === parent[0] + 1) {
						row += '<-';
					} else if (y === parent[1] - 1) {
						row += 'v ';
					} else if (y === parent[1] + 1) {
						row += '^ ';
					}
				}
			}
			console.log(row);
		}		
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