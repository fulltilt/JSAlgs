// Note: this doesn't use content[0] as a dummy input to make the math easier
// this is a min Heap
function Heap(scoreFunction) {
  this.content = [];
  this.scoreFunction = scoreFunction; // allows us to store objects that can not be directly compared
}

Heap.prototype = {
  push: function(element) {
    // Add new element to the end of the array
    this.content.push(element);

    // Allow it to bubble up
    this.bubbleUp(this.content.length - 1);
  },

  pop: function() {
    if (this.content.length === 0) {
      throw new Error('empty heap');
    }

    // Store the first element so we can return it later
    var result = this.content[0];

    // Get the element at the end of the array
    var end = this.content.pop();

    // If there are any elements left, put the end element at the start, and let it sink down
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }

    return result;
  },

  remove: function(element) {
    /*var length = this.content.length;

    // To remove a value, we must search through the array to find it
    for (var i = 0; i < length; i++) {
      if (this.content[i] === element) {

      }
    }
    ...skipping implementation as the implementation is kind of hard to follow and this isn't necessary
    */
  },

  size: function() {
    return this.content.length;
  },

  bubbleUp: function(n) {
    var element = this.content[n],
        score = this.scoreFunction(element);

    while (n > 0) { // when at 0, an element can not go up any further
      // Compute the parent element's index and fetch it
      var parentN = Math.floor((n + 1) / 2) - 1,
          parent = this.content[parentN];

      // If the parent has a lesser score, things are in order and we are done
      if (score >= this.scoreFunction(parent)) {
        break;
      }

      // Otherwise, swap the parent with the current element and continue
      this.content[parentN] = element;
      this.content[n] = parent;
      n = parentN;
    }
  },

  sinkDown: function(n) {
    // Look up the target element and its score
    var length = this.content.length,
        element = this.content[n],
        score = this.scoreFunction(element);

    while (true) {
      // Compute the indices of the child elements
      var child2N = (n + 1) * 2,
          child1N = child2N - 1,
          swap = null;  // used to store the new position of the element, if any

      // If the first child exists (is inside the array)
      if (child1N < length) {
        // Look it up and compute its score
        var child1 = this.content[child1N],
            child1Score = this.scoreFunction(child1);

        // If the score is less than our element's, swap
        if (child1Score < score) {
          swap = child1N;
        }
      }

      // Do the same checks for the other child
      if (child2N < length) {
        // Look it up and compute its score
        var child2 = this.content[child2N],
            child2Score = this.scoreFunction(child2);

        // If the score is less than our element's, swap
        if (child2Score < (swap == null ? score : child1Score)) {
          swap = child2N;
        }
      }      

      // No need to swap further
      if (swap == null) {
        break;
      }

      // Otherwise, swap and continue
      this.content[n] = this.content[swap];
      this.content[swap] = element;
      n = swap;
    }
  }
};

module.exports = Heap;