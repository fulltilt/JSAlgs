function MinHeap(scoreFunction) {
  this.contents = [];
  this.scoreFunction = scoreFunction;
}

MinHeap.prototype = {
  push: function(data) {
    this.contents.push(data);
    this.bubbleUp(this.contents.length - 1);
  },

  pop: function() {
    if (this.contents.length === 0) {
      throw new Error('empty heap');
    }

    var min = this.contents[0];
    
    // pop off the last index and set it as root. From here, swim down
    var temp = this.contents.pop();

    if (this.contents.length > 0) {
      this.contents[0] = temp;
      this.swimDown();
    }

    return min;
  },

  bubbleUp: function(index) {
    var element = this.contents[index],
        score = this.scoreFunction(element);

    while (index > 0) {
      var parentIndex = Math.floor((index - 1)/ 2);
      if (this.scoreFunction(this.contents[parentIndex]) < score) {
        break;
      }

      var temp = this.contents[parentIndex];
      this.contents[parentIndex] = this.contents[index];
      this.contents[index] = temp;

      index = parentIndex;
    }
  },

  swimDown: function() {
    var index = 0,  // swim down starts from root
        score = this.scoreFunction(this.contents[index]),
        length = this.contents.length;
    
    while ((index * 2) < length) {  // (index * 2) because inside the loop we're accessing the current indexes children. Without this check, we'll check past the array bounds
      var leftChildIndex = (index * 2) + 1,
          rightChildIndex = (index * 2) + 2,
          leftChildScore = this.scoreFunction(this.contents[leftChildIndex]),
          rightChildScore = this.scoreFunction(this.contents[rightChildIndex]),
          minChild = Math.mix(leftChildScore, rightChildScore),
          minChildIndex = (minChild === leftChildScore || isNaN(maxChild)) ? leftChildIndex : rightChildIndex;

      if (score < this.scoreFunction(this.contents[minChildIndex])) {
        break;
      } else {
        var temp = this.contents[index];
        this.contents[index] = this.contents[minChildIndex];
        this.contents[minChildIndex] = temp;

        index = minChildIndex;
      }
    }
  }
}

function MaxHeap(scoreFunction) {
  this.contents = [];
  this.scoreFunction = scoreFunction;
}

MaxHeap.prototype = {
  push: function(data) {
    this.contents.push(data);
    this.bubbleUp(this.contents.length - 1);
  },

  pop: function() {
    if (this.contents.length === 0) {
      throw new Error('empty heap');
    }

    var result = this.contents[0];

    // pop off the last index and set it as root. From here, swim down
    var temp = this.contents.pop();

    if (this.contents.length > 0) {
      this.contents[0] = temp;
      this.swimDown();
    }

    return result;
  },

  bubbleUp: function(index) {
    var element = this.contents[index],
        score = this.scoreFunction(element);

    while (index > 0) {
      var parentIndex = Math.floor((index - 1)/ 2),
          parentScore = this.scoreFunction(this.contents[parentIndex]);

      if (parentScore > score) {
        break;
      }

      var temp = this.contents[parentIndex];
      this.contents[parentIndex] = this.contents[index];
      this.contents[index] = temp;

      index = parentIndex;
    }
  },

  swimDown: function() {
    var index = 0,  // swimDown always starts from root inde
        score = this.scoreFunction(this.contents[index]),
        length = this.contents.length;

    while ((index * 2) < length) {  // (index * 2) because inside the loop we're accessing the current indexes children. Without this check, we'll check past the array bounds
      var leftChildIndex = (index * 2) + 1,
          rightChildIndex = (index * 2) + 2,
          leftChildScore = this.scoreFunction(this.contents[leftChildIndex]),
          rightChildScore = this.scoreFunction(this.contents[rightChildIndex]),
          maxChild = Math.max(leftChildScore, rightChildScore), // note, if rightChild is undefined, this will return 'NaN'
          maxChildIndex = (maxChild === leftChildScore || isNaN(maxChild)) ? leftChildIndex : rightChildIndex;

      if (score > this.scoreFunction(this.contents[maxChildIndex])) {
        break;
      }

      var temp = this.contents[maxChildIndex];
      this.contents[maxChildIndex] = this.contents[index];
      this.contents[index] = temp;

      index = maxChildIndex;
    }  
  }
}

var Heaps = function() {
  return {
    MinHeap: MinHeap,
    MaxHeap: MaxHeap
  }
}();

module.exports = Heaps;
/* NOTES
-assuming the head is at index 0:
-to get children:
for root (index 0), children should be at 1 and 2
      0
  1       2
3   4   5   6 

for the 2nd element (index 1), children should be at index 3 and 4
leftChild = (index * 2) + 1
rightChild = (index * 2) + 2
note: Eloquent JS used: var child2N = (n + 1) * 2, child1N = child2N - 1;

-to get parents:
index 3 and index 4 should return 1. 
parent = Math.floor((index - 1)/ 2)
note: Eloquent JS used: var parentN = Math.floor((n + 1) / 2) - 1
*/  