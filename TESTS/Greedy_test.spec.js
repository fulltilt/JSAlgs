var Greedy = require('../Greedy.js');

describe("Greedy", function() {
  var g = new Greedy();

  it("tests coin changing problem", function() {
    var origAmt = .63;
    var coins = []; 
    var arr = g.makeChange(origAmt, coins); 

    expect(arr[0]).toEqual(3);
    expect(arr[1]).toEqual(undefined);
    expect(arr[2]).toEqual(1);
    expect(arr[3]).toEqual(2);
  });

  it('tests greedy knapsack', function() {
    var values = [50, 140, 60, 60];
    var weights = [5, 20, 10, 12];
    var capacity = 30;
    expect(g.greedyKnapsack(values, weights, capacity)).toEqual(220);
  })

  it('tests activitySelection', function() {
    var start  =  [1, 3, 0, 5, 8, 5],
        finish =  [2, 4, 6, 7, 9, 9];
    expect(g.activitySelection(start, finish)).toEqual([0,1,3,4]);
  });

  it('tests huffmanCoding', function() {
    var arr = ['a', 'b', 'c', 'd', 'e', 'f'],
        freq = [5, 9, 12, 13, 16, 45];
    g.huffmanCoding(arr, freq);
  });

  it('tests connectRopes', function() {
    expect(g.connectRopes([4,3,2,6])).toEqual(29);
  });
});