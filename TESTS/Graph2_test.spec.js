// this graph files corresponds to the graph algorithms from Competitive Programming 3
var Graph = require('../Graph2.js');

describe("Graph2", function() {
  var graph = new Graph.Graph();

  it('tests dfs', function() {
/*
    1 1 0
    3 0 0 2 0 3 0
    2 1 0 3 0
    3 1 0 2 0 4 0
    1 3 0
    0
    2 7 0 8 0
    1 6 0
    1 6 0 */
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
});