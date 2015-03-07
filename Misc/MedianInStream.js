// 427
// 1213 (actual sum: 46831213)
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

    while (((index * 2) + 1) < length) {  // (index * 2) + 1 because inside the loop we're accessing the current indexes children. Without this check, we'll check past the array bounds
      var leftChildIndex = (index * 2) + 1,
          rightChildIndex = (index * 2) + 2,
          minChildIndex;

      if (rightChildIndex >= length) {
        minChildIndex = leftChildIndex;
      } else {
        var leftChildScore = this.scoreFunction(this.contents[leftChildIndex]),
            rightChildScore = this.scoreFunction(this.contents[rightChildIndex]),
            minChild = Math.min(leftChildScore, rightChildScore);
        minChildIndex = (minChild === leftChildScore) ? leftChildIndex : rightChildIndex;
      }

      if (score < this.scoreFunction(this.contents[minChildIndex])) {
        break;
      } else {
        var temp = this.contents[index];
        this.contents[index] = this.contents[minChildIndex];
        this.contents[minChildIndex] = temp;

        index = minChildIndex;
      }
    }
  },

  size: function() {
    return this.contents.length;
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

    while (((index * 2) + 1) < length) {  // (index * 2) + 1 because inside the loop we're accessing the current indexes children. Without this check, we'll check past the array bounds
      var leftChildIndex = (index * 2) + 1,
          rightChildIndex = (index * 2) + 2,
          maxChildIndex;

      if (rightChildIndex >= length) {
        maxChildIndex = leftChildIndex;
      } else {
        var leftChildScore = this.scoreFunction(this.contents[leftChildIndex]),
            rightChildScore = this.scoreFunction(this.contents[rightChildIndex]),
            maxChild = Math.max(leftChildScore, rightChildScore);
        maxChildIndex = (maxChild === leftChildScore) ? leftChildIndex : rightChildIndex;
      }

      if (score > this.scoreFunction(this.contents[maxChildIndex])) {
        break;
      }

      var temp = this.contents[maxChildIndex];
      this.contents[maxChildIndex] = this.contents[index];
      this.contents[index] = temp;

      index = maxChildIndex;
    }  
  },

  size: function() {
    return this.contents.length;
  }
}

function medianInStream(arr) {
  var median = 0,   // effective median
      left = new MaxHeap(function(x) { return x; }),
      right = new MinHeap(function(x) { return x; }),
      length = arr.length,
      i;
var sum = 0;
  for (i = 0; i < length; i++) {
    median = getMedian(arr[i], median, left, right);
sum += median;
    console.log(median);
  }
  console.log(sum, sum % 10000);
}

// helper fxn for medianInStream
// the trick is that the difference between both heaps should never be more than 1
function getMedian(element, median, left, right) {
  if (left.size() > right.size()) { // more elements in left (max) heap
    if (element < median) { // current element fits in left (max) heap
      // remove top element from left heap and insert into right heap
      right.push(left.pop());

      // insert element into left (max) heap
      left.push(element);
    } else {
      right.push(element);
    }

    // both heaps are balanced meaning the total # of elements is even
    //return (left.contents[0] + right.contents[0]) / 2;
    return left.contents[0]
  } else if (left.size() === right.size()) {  // equal amount of elements in both heaps. After addition of element, one heap will be bigger than the other
    if (element < median) {
      left.push(element);
      return left.contents[0];
    } else {
      right.push(element);
      return right.contents[0];
    }
  } else {  // more elements in right (min) heap
    if (element < median) {
      left.push(element);
    } else {
      left.push(right.pop());
      right.push(element);
    }

    //return (left.contents[0] + right.contents[0]) / 2;
    return left.contents[0]
  }
}

var fs = require('fs');

var inputFile = process.argv[2],
    text = fs.readFileSync(inputFile, 'utf-8'),
    input = text.split('\n').map(function(x) { return parseInt(x, 10); });

medianInStream(input);