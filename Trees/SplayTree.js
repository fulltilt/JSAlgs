function Node(key) {
  this.key = key;
  this.left = null;
  this.right = null;
}

// http://www.geeksforgeeks.org/splay-tree-set-1-insert/
// http://www.geeksforgeeks.org/splay-tree-set-2-insert-delete/
// This function brings the key at root if key is present in tree. If key is not present, then it brings the last accessed item at
// root.  This function modifies the tree and returns the new root
function SplayTree() {
  this.root = null;
}

SplayTree.prototype = {
  rightRotate: function(node) {
    var leftChild = node.left;
    node.left = leftChild.right;
    leftChild.right = node;
    return leftChild;
  },

  leftRotate: function(node) {
    var rightChild = node.right;
    node.right = rightChild.left;
    rightChild.left = node;
    return rightChild;
  },

  // search fxn for splay tree. Note that this fxn returns new root of tree. If key is present, it's moved to root
  search: function(root, key) {
    return this.splay(root, key);
  },

  // this fxn bring the key to root if key is present. If key is not present, then it brings last accessed item to root
  splay: function(root, key) {
    // base cases: root is null or key is present
    if (root === null || root.key === key) {
      return root;
    }

    if (key < root.key) { // key lies in left subtree
      // key is not in tree, we are done
      if (root.left === null) {
        return root;
      }

      if (key < root.left.key) {          // Zig-Zig (Left Left)
        // first recursively bring the key as root of left-left
        root.left.left = this.splay(root.left.left, key);

        // do first rotation for root, second rotation is done after else
        root = this.rightRotate(root);
      } else if (key > root.left.key) {   // Zig-Zag (Left Right)
        // first recursively bring the key as root of left-right
        root.left.right = this.splay(root.left.right, key);

        // do first rotation for root.left
        if (root.left.right !== null) {
          root.left = this.leftRotate(root.left);
        }
      }

      // do second rotation for root
      return (root.left === null) ? root : this.rightRotate(root);
    } else {              // key lies in right subtree
      // key is not in tree, we are done
      if (root.right === null) {
        return root;
      }

      if (key < root.right.key) {         // Zag-Zig (Right Left) 
        // bring the key as root of right-left
        root.right.left = this.splay(root.right.left, key);

        // do first rotation for root.right
        if (root.right.left !== null) {
          root.right = this.rightRotate(root.right);
        }
      } else if (key > root.right.key) {  // Zag-Zag (Right Right)
        // bring the key as root of right-right and do first rotation
        root.right.right = this.splay(root.right.right, key);
        root = this.leftRotate(root);
      }
    }

    // do second rotation for root
    return (root.right === null) ? root : this.leftRotate(root);
  },

  preOrder: function(root) {
    if (root !== null) {
      console.log(root.key);
      this.preOrder(root.left);
      this.preOrder(root.right);
    }
  },

  insert: function(root, key) {
    // simple case: tree is empty
    if (root === null) {
      return new Node(key);
    }

    // bring the closest leaf node to root
    root = this.splay(root, key);

    // if key is already present, then return root
    if (root.key === key) {
      return root;
    }

    // otherwise create new Node
    var newNode = new Node(key);

    // if root's key is greater, make root as right child of newNode and copy the left child of root to newNode
    if (key < root.key) {
      newNode.right = root;
      newNode.left = root.left;
      root.left = null;
    } else { // if root's key is smaller, make root as left child of newNode and copy the right child of root to newNode
      newNode.left = root;
      newNode.right = root.right;
      root.right = null;
    }

    return newNode; // newNode becomes root;
  }
}

var SplayTree = function() {
  return {
    SplayTree: SplayTree,
    Node: Node
  }
}();

module.exports = SplayTree;