var Greedy = require('../Greedy.js');

describe("Greedy", function() {
  var g = new Greedy();

  it("tests coin changing problem", function() {
    var origAmt = .63;
    var coins = []; 
    var arr = g.makeChange(origAmt, coins); 
    //  showChange(coins);

    expect(arr[0]).toEqual(3);
    expect(arr[1]).toEqual(undefined);
    expect(arr[2]).toEqual(1);
    expect(arr[3]).toEqual(2);
  });

  it('tests greedy knapsack', function() {
    var values = [4,5,10,11,13];
    var weights = [3,4,7,8,9];
    var capacity = 16;
    expect(g.greedyKnapsack(values, weights, capacity)).toEqual(220);
    
    var values = [50, 140, 60, 60];
    var weights = [5, 20, 10, 12];
    var capacity = 30;
    expect(g.greedyKnapsack(values, weights, capacity)).toEqual(220);
  })
});