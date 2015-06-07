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
		console.log('Visiting:', current);
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

var SquareGrid = function(width, height) {
	this.width = width;
	this.height = height;
	this.walls = [];

	this.inBounds = function(id) {
		return (0 <= id.x && id.x < this.width && 0 <= id.y && id.y < this.height);
	}

	this.passable = function(id) {
		return this.walls[id] === undefined;
	}

	this.neighbors = function(id) {
		results = [[id.x + 1, id.y], [id.x, id.y - 1], [id.x - 1, id.y], [id.x, id.y + 1]];
		if (((id.x + id.y) % 2) === 0) {
			results = results.reverse();
		}

		results = results.filter(inBounds);
		results = results.filter(passable);

		return results;
	}
}

var g = new SquareGrid(30, 15);
g.walls = [
	[3, 3], [4, 3], [5, 3], [6, 3],
	[3, 4], [4, 4], [5, 4], [6, 4],
	[3, 5], [4, 5], [5, 5], [6, 5],
	[3, 6], [4, 6], [5, 6], [6, 6],
	[3, 7], [4, 7], [5, 7], [6, 7],
	[3, 8], [4, 8], [5, 8], [6, 8],
	[3, 9], [4, 9], [5, 9], [6, 9],
	[3, 10], [4, 10], [5, 10], [6, 10],
	[3, 11], [4, 11], [5, 11], [6, 11],

	[15,4],[16,4],[17,4],[18,4],
	[15,5],[16,5],[17,5],[18,5],
	[15,6],[16,6],[17,6],[18,6],
	[15,7],[16,7],[17,7],[18,7],
	[15,8],[16,8],[17,8],[18,8],
	[15,9],[16,9],[17,9],[18,9],
	[15,10],[16,10],[17,10],[18,10],
	[15,11],[16,11],[17,11],[18,11],
	[15,12],[16,12],[17,12],[18,12],
	[15,13],[16,13],[17,13],[18,13],
	[15,14],[16,14],[17,14],[18,14],

	[21, 0], [22, 0], [23, 0], [24, 0],
	[21, 1], [22, 1], [23, 1], [24, 1],
	[21, 2], [22, 2], [23, 2], [24, 2],
	[21, 3], [22, 3], [23, 3], [24, 3],
	[21, 4], [22, 4], [23, 4], [24, 4],
	[21, 5], [22, 5], [23, 5], [24, 5], [25, 5], [26, 5], [27, 5], [28, 5], [29, 5], [30, 5],
	[21, 6], [22, 6], [23, 6], [24, 6], [25, 6], [26, 6], [27, 6], [28, 6], [29, 6], [30, 6]
];
//draw_grid(g)

var wallObjArr = {};
for (var i = 0; i < g.walls.length; ++i) {
	wallObjArr[g.walls[i]] = true;
}

for (var y = 0; y < g.height; ++y) {
	var row = '';
	for (var x = 0; x < g.width; ++x) {
		if (wallObjArr[[x,y]] === true) {
			row += '# ';
		} else {
			row += '. ';
		}
	}
	console.log(row);
}