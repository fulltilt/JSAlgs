// this graph files corresponds to the graph algorithms from Competitive Programming 3
var Graph = require('../Graph2.js');

describe("Graph2", function() {
  var graph = new Graph.Graph();

  it('tests dfs', function() {
  	console.log('\n==================================');
		console.log('Depth-First Search Demo (the input graph must be UNDIRECTED)');
		console.log('==================================');
  	// edges have no weights so initialize to zero
    var g = new Graph.Graph(9);
    g.adjacencyList[0].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(0, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(2, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(2, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(4, 0));
    g.adjacencyList[4].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[6].push(new Graph.IntegerPair(7, 0));
    g.adjacencyList[6].push(new Graph.IntegerPair(8, 0));
    g.adjacencyList[7].push(new Graph.IntegerPair(6, 0));
    g.adjacencyList[8].push(new Graph.IntegerPair(6, 0));
    g.dfs();
  });

  it('tests bfs', function() {
  	console.log('\n==================================');
		console.log('Breadth-First Search Demo (the input graph must be UNDIRECTED)');
		console.log('==================================');
  	var g = new Graph.Graph(13);
  	g.adjacencyList[0].push(new Graph.IntegerPair(1, 0));
  	g.adjacencyList[0].push(new Graph.IntegerPair(4, 0));
  	g.adjacencyList[1].push(new Graph.IntegerPair(0, 0));
  	g.adjacencyList[1].push(new Graph.IntegerPair(2, 0));
  	g.adjacencyList[1].push(new Graph.IntegerPair(5, 0));
  	g.adjacencyList[2].push(new Graph.IntegerPair(1, 0));
  	g.adjacencyList[2].push(new Graph.IntegerPair(3, 0));
  	g.adjacencyList[2].push(new Graph.IntegerPair(6, 0));
  	g.adjacencyList[3].push(new Graph.IntegerPair(2, 0));
  	g.adjacencyList[3].push(new Graph.IntegerPair(7, 0));
  	g.adjacencyList[4].push(new Graph.IntegerPair(0, 0));
  	g.adjacencyList[5].push(new Graph.IntegerPair(1, 0));
  	g.adjacencyList[5].push(new Graph.IntegerPair(6, 0));
  	g.adjacencyList[5].push(new Graph.IntegerPair(10, 0));
  	g.adjacencyList[6].push(new Graph.IntegerPair(5, 0));
  	g.adjacencyList[6].push(new Graph.IntegerPair(11, 0));
  	g.adjacencyList[7].push(new Graph.IntegerPair(3, 0));
  	g.adjacencyList[8].push(new Graph.IntegerPair(9, 0));
  	g.adjacencyList[9].push(new Graph.IntegerPair(8, 0));
  	g.adjacencyList[9].push(new Graph.IntegerPair(10, 0));
  	g.adjacencyList[10].push(new Graph.IntegerPair(5, 0));
  	g.adjacencyList[10].push(new Graph.IntegerPair(9, 0));
  	g.adjacencyList[11].push(new Graph.IntegerPair(6, 0));
  	g.adjacencyList[11].push(new Graph.IntegerPair(12, 0));
  	g.adjacencyList[12].push(new Graph.IntegerPair(11, 0));
  	g.bfs(5);
  });

	it('tests floodFill', function() {
		console.log('\n==================================');
		console.log('Flood Fill Demo (the input graph must be UNDIRECTED)');
		console.log('==================================');
		var g = new Graph.Graph(9);
    g.adjacencyList[0].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(0, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(2, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(2, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(4, 0));
    g.adjacencyList[4].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[6].push(new Graph.IntegerPair(7, 0));
    g.adjacencyList[6].push(new Graph.IntegerPair(8, 0));
    g.adjacencyList[7].push(new Graph.IntegerPair(6, 0));
    g.adjacencyList[8].push(new Graph.IntegerPair(6, 0));
    g.floodFill();
    
    var row = 2,
        column = 1;
    expect(g.wetlands(row, column)).toEqual(12);
	});

  it('tests topologicalSort', function() {
    console.log('\n==================================');
    console.log('Topological Sort (the input graph must be DAG)');
    console.log('==================================');
    var g = new Graph.Graph(8);
    g.adjacencyList[0].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[0].push(new Graph.IntegerPair(2, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(2, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(5, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(4, 0));
    g.adjacencyList[7].push(new Graph.IntegerPair(6, 0));
    g.topologicalSort();  // not sure if this is correct
  });

  it('tests isBipartite', function() {
    var g = new Graph.Graph(4);
    g.adjacencyList[0].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[0].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(0, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(2, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(0, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(2, 0));
    expect(g.isBipartite()).toEqual(true);
  });

  it('tests graphCheck', function() {
    console.log('\n==================================');
    console.log('Graph Check');
    console.log('==================================');
    var g = new Graph.Graph(9);
    g.adjacencyList[0].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(0, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(2, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(2, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(4, 0));
    g.adjacencyList[4].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[6].push(new Graph.IntegerPair(7, 0));
    g.adjacencyList[6].push(new Graph.IntegerPair(8, 0));
    g.adjacencyList[7].push(new Graph.IntegerPair(6, 0));
    g.adjacencyList[8].push(new Graph.IntegerPair(6, 0));
    g.graphCheck();
  });

  it('tests articulationPointsAndBridges', function() {
    console.log('\n==================================');
    console.log('Articulation Points & Bridges (the input graph must be UNDIRECTED)');
    console.log('==================================');
    /*var g = new Graph.Graph(8);
    g.adjacencyList[0].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(0, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(2, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(4, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(4, 0));
    g.adjacencyList[4].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[4].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[4].push(new Graph.IntegerPair(5, 0));
    g.adjacencyList[5].push(new Graph.IntegerPair(4, 0));*/
    var g = new Graph.Graph(9);
    g.adjacencyList[0].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(0, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(2, 0));
    g.adjacencyList[1].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[2].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(1, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(2, 0));
    g.adjacencyList[3].push(new Graph.IntegerPair(4, 0));
    g.adjacencyList[4].push(new Graph.IntegerPair(3, 0));
    g.adjacencyList[6].push(new Graph.IntegerPair(7, 0));
    g.adjacencyList[6].push(new Graph.IntegerPair(8, 0));
    g.adjacencyList[7].push(new Graph.IntegerPair(6, 0));
    g.adjacencyList[8].push(new Graph.IntegerPair(6, 0));
    g.articulationPointsAndBridges();
  });
});