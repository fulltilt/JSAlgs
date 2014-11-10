function Node(data) {
  this.data = data;
  this.left = null;
  this.right = null;
  this.height = 1;  // new Nodes are always inserted at a leaf so it's default height is always 1
}

function AVLTree() {
  this.root = null;
}

AVLTree.prototype = {
  preOrder: function(node, arr) {
    if (node !== null) {
      arr.push(node.data);
      this.preOrder(node.left, arr);
      this.preOrder(node.right, arr);
    }
  },

  leftRotate: function(node) {
    var rightChild = node.right;

    // perform rotation
    node.right = rightChild.left;
    rightChild.left = node;

    // update root if applicable
    if (node === this.root) {
      this.root = rightChild;
    }

    // update heights
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    rightChild.height = Math.max(this.getHeight(rightChild.left), this.getHeight(rightChild.right)) + 1;

    // return new root
    return rightChild;
  },

  rightRotate: function(node) {
    var leftChild = node.left;

    // perform rotation
    node.left = leftChild.right;
    leftChild.right = node;

    // update root if applicable
    if (node === this.root) {
      this.root = leftChild;
    }

    // update heights
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    leftChild.height = Math.max(this.getHeight(leftChild.left), this.getHeight(leftChild.right)) + 1;

    // return new root
    return leftChild;
  },

  // http://www.geeksforgeeks.org/avl-tree-set-1-insertion/
  insert: function(data) {
    if (this.root === null) {
      this.root = new Node(data, null, null);
      return;
    }

    this.insertUtil(this.root, data);
  },

  insertUtil: function(node, data) {
    /* 1. Normal BST insertion */
    if (node === null) {
      return new Node(data, null, null);
    }

    if (data < node.data) {
      node.left = this.insertUtil(node.left, data);
    } else {
      node.right = this.insertUtil(node.right, data);
    }

    /* 2. Update height of this ancestor node */
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

    /* 3. Check balance factor of this Node to check whether this Node became unbalanced with the insertion */
    var balance = this.getBalance(node);

    // 4. If this Node becomes unbalanced, then there are 4 cases (note: a negative balance means that the tree longer on the right):

    // Left Left Case
    if (balance > 1 && data < node.left.data) {
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && data > node.right.data) {
      return this.leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && data > node.left.data) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && data < node.right.data) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    // return the (unchanged) node pointer
    return node;
  },

  getHeight: function(node) {
    if (node === null) {
      return 0;
    }
    return node.height;  
  },

  getBalance: function(node) {
    if (node === null) {
      return 0;
    }
    return this.getHeight(node.left) - this.getHeight(node.right);  
  },

  // http://www.geeksforgeeks.org/avl-tree-set-2-deletion/
  delete: function(data) {

  }
}

module.exports = AVLTree;