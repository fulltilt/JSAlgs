function Node() {
  this.data = data;
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
    var left = node.left;
    node.left = left.right;
    left.right = node;
    return left; 
  }
}
