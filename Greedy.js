function Greedy() {
  this.makeChange = makeChange;
  this.greedyKnapsack = greedyKnapsack;
}

function makeChange(origAmt, coins) { var remainAmt = 0;
  if (origAmt % .25 < origAmt) {
    coins[3] = parseInt(origAmt / .25);
    origAmt = origAmt % .25;
  }
  if (origAmt % .1 < origAmt) {
    coins[2] = parseInt(origAmt / .1);
    origAmt = origAmt % .1;
  }
  if (origAmt % .05 < origAmt) {
    coins[1] = parseInt(origAmt / .05);
    origAmt = origAmt % .05;
  }

  coins[0] = parseInt(origAmt / .01);

  return coins;
}

/*
A greedy algorithm can be used to solve the knapsack problem if the items we are placing
in the knapsack are continuous in nature. In other words, the items must be things that
cannot be counted discretely, such as cloth or gold dust. If we are using continous items,
we can simply divide the unit price by the unit volume to determine the value of the
item. An optimal solution in this case is to place as much of the item with the highest
value into the knapsack as possible until the item is depleted or the knapsack is full,
followed by as much of the second-highest-value item as possible, and so on. The reason
we can’t find an optimal greedy solution using discrete items is because we can’t put
“half a television” into a knapsack. Discrete knapsack problems are known as 0-1 prob‐
lems because you must take either all or none of an item.

This type of knapsack problem is called a fractional knapsack problem. Here is the
algorithm for solving fractional knapsack problems:

1. Knapsack has a capacity W and items have values V and weights w.
2. Rank items by v/w ratio.
3. Consider items in terms of decreasing ratio.
4. Take as much of each item as possible.
*/
function greedyKnapsack(values, weights, capacity) {
  var load = 0;
  var i = 0;
  var w = 0;
  
  while (load < capacity && i < values.length) {
    if (weights[i] <= (capacity - load)) {
     w += values[i];
     load += weights[i];
    } else {
      var r = (capacity - load) / weights[i]; 
      w += r * values[i];
      load += weights[i];
    } 
    ++i;
  }

  return w;
}

/*
  1st iteration: 
  2nd: 

  var values = [50, 140, 60, 60];
  var weights = [5, 20, 10, 12];
  var capacity = 30;
*/

module.exports = Greedy;