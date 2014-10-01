function Greedy() {
  this.makeChange = makeChange;
  this.greedyKnapsack = greedyKnapsack;
}

function makeChange(origAmt, coins) { var remainAmt = 0;
  if (origAmt % .25 < origAmt) {
    coins[3] = parseInt(origAmt / .25);
    remainAmt = origAmt % .25;
    origAmt = remainAmt;
  }
  if (origAmt % .1 < origAmt) {
    coins[2] = parseInt(origAmt / .1);
    remainAmt = origAmt % .1;
    origAmt = remainAmt;
  }
  if (origAmt % .05 < origAmt) {
    coins[1] = parseInt(origAmt / .05);
    remainAmt = origAmt % .05;
    origAmt = remainAmt;
  }

  coins[0] = parseInt(origAmt / .01);

  return coins;
}

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

module.exports = Greedy;