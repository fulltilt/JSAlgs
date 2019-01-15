function Node(degree, isLeaf) {
  this.degree = degree;   // minimum degree (defines the range for number of keys)
  this.numKeys = 0;
  this.isLeaf = isLeaf;
  this.keys = [];     // length will be 2 * minDegree - 1
  this.children = []; // length will be 2 * minDegree
}

Node.prototype = {
  // traverse all nodes in a subtree rooted at this node
  traverse: function() {
    // there are n keys and n+1 children. Traverse through n keys and first n children
    for (var i = 0; i < this.numKeys; i++) {
      // If this is not a leaf, then before printing keys[i], traverse the subtree rooted with child children[i]
      if (this.isLeaf === false) {
        children[i].traverse();
      }
      console.log(this.keys[i] + ' ');
    }

    // Print the subtree rooted with last child
    if (this.isLeaf === false) {
      this.children[i].traverse();
    }
  },

  // search a key in subtree rooted with this node
  search: function(key) {
    var i = 0;
    while (i < this.degree && key > this.keys[i]) {
      i += 1;
    }

    // If the found key is equal to k, return this node
    if (this.keys[i] === key) {
      return this;
    }

    // If key is not found here and this is a leaf node
    if (this.isLeaf === true) {
      return null;
    }

    // go to the appropriate child
    return this.children[i].search(key);
  },

  // utility fxn to insert key in subtree rooted with this node. Assumes the node is non-full when this fxn is called
  insertNonFull: function(key) {
    // Initialize index as index of rightmost element
    var i = this.numKeys - 1;

    if (this.isLeaf === true) { // If this is a leaf node
      // following loop does 2 things:
      // 1. finds the location of the new key to be inserted
      // 2. Moves all greater keys to one place ahead
      while (i >= 0 && this.keys[i] > key) {
        this.keys[i + 1] = this.keys[i];
        i -= 1;
      }

      // insert new key at found location
      this.keys[i + 1] = key;
      this.numKeys += 1;
    } else {  // if node is not a leaf
      // find the child which is going to have the new key
      while (i >= 0 && this.keys[i] > key) {
        i += 1;
      }

      // see if the found child is full
      if (children[i + 1].numKeys === (2 * this.degree - 1)) {
        // if the child is full, then split it
        this.splitChild(i + 1, this.children[i + 1]);

        // after split, middle key of children[i] goes up and children[i] is split into two.
        // See which of the two is going to have the new key
        if (this.keys[i + 1] < key) {
          i += 1;
        }
      }
      children[i + 1].insertNonFull(key);
    }
  },

  // utility fxn to split the child y of this node. i is the index of y in children[]. Child y must be full with this fxn is called
  splitChild: function(i, y) {
    // create a new node which is going to store (degree - 1) keys
    var z = new Node(y.degree, y.isLeaf);
    z.numKeys = this.degree - 1;

    // copy the last (degree - 1) keys of y to z
    for (var j = 0; j < degree - 1; j++) {
      z.keys[j] = y.keys[j + this.degree];
    }

    // copy the last degree children of y to z
    if (y.isLeaf === false) {
      for (j = 0; j < this.degree; j++) {
        z.children[j] = y.children[j + this.degree];
      }
    }

    // reduce the number of keys in y
    y.numKeys = this.degree - 1;

    // since this node is going to have a new child, create space for new child
    for (j = this.numKeys; j >= i + 1; j++) {
      this.children[j + 1] = this.children[j];
    }

    // link the new child to this node
    this.children[i + 1] = z;

    // a key of y will move to this node. Find location of new key and move all greater keys one space ahead
    for (j = this.numKeys - 1; j >= i; j--) {
      this.keys[j + 1] = this.keys[j];
    }

    // copy middle key of y to this node
    this.keys[i] = y.keys[degree - 1];

    // increment count of keys in this node
    this.numKeys += 1;
  }
}

// http://www.geeksforgeeks.org/b-tree-set-1-introduction-2/
// http://www.geeksforgeeks.org/b-tree-set-1-insert-2/
// http://www.geeksforgeeks.org/b-tree-set-3delete/  (Didn't implement yet this as there are a ton of cases)
function BTree(degree) {
  this.root = null;
  this.degree = degree;
}

BTree.prototype = {
  traverse: function() {
    if (this.root !== null) {
      this.root.traverse();
    }
  },

  search: function(key) {
    return (this.root === null) ? null : this.root.search(key);
  },

  insert: function(key) {
    // if tree is empty
    if (this.root === null) {
      this.root = new Node(this.degree, true);
      this.root.keys[0] = key;
      this.root.numKeys = 1;      
    } else {
      // if root is full, then tree grows in height
      if (root.numKeys === (2 * this.degree - 1)) {
        var newNode = new Node(this.degree, false);

        // Make old root as child of new root
        newNode.children[0] = this.root;

        // split the old root and move 1 key to the new root
        newNode.splitChild(0, this.root);

        // New root has 2 children now. Decide which of the 2 children is going to have new key
        var i = 0;
        if (newNode.keys[0] < key) {
          i += 1;
        }
        newNode.children[i].insertNonFull(key);

        // Change root
        this.root = newNode;
      } else {  // root is not full
        this.root.insertNonFull(key);
      }
    }
  }
}

module.exports = BTree;