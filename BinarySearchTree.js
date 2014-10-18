function Node(data, left, right) {
  this.data = data;
  this.left = left || null;
  this.right = right || null;
  this.show = show;
}

function show() {
  return this.data;
}

function BST() {
  this.root = null;

  this.insert = insert;
  this._insert = _insert;
  this.remove = remove;
  this._remove = _remove;
  this.find = find;
  this._find = _find;
  this.size = size;
  this._size = _size;
  this.clear = clear;
  this._clear = _clear;

  this.min = min;
  this.max = max;
  this.inOrder = inOrder;
  this.isBST = isBST;
  this._isBST = _isBST;
  this.getHeight = getHeight;
  this._getHeight = _getHeight;
  this.getLargestBSTSubTreeSize = getLargestBSTSubTreeSize;
  this.areTreesIdentical = areTreesIdentical;
  this.mirror = mirror;
  this.printAllPaths = printAllPaths;
  this.printByLevel = printByLevel;
  this.printSpiral = printSpiral;
  this.countLeafNodes = countLeafNodes;
  this.doChildrenSumUpToNodeValue = doChildrenSumUpToNodeValue;
  this.getTreeDiameter = getTreeDiameter;
  this.isTreeBalanced = isTreeBalanced;
  this.existsPathSum = existsPathSum;

  this.getRandomBSTNode = getRandomBSTNode;
  this.treeToCircularDoublyLinkedList = treeToCircularDoublyLinkedList;
}

function insert(data) {
  if (this.root === null) {
    this.root = new Node(data, null, null);;
    return;
  }

  _insert(this.root, data);
}

function _insert(node, data) {
  var current = node;

  if (data === current.data) {
    return;
  } else if (data < current.data) {
    if (current.left === null) {
      current.left = new Node(data, null, null);;
      return;
    }
    _insert(current.left, data);
  } else {
    if (current.right === null) {
      current.right = new Node(data, null, null);;
      return;
    }
    _insert(current.right, data);
  }
}

function min(node) {
  var current = node;
  while (current.left !== null) {
    current = current.left;
  }
  return current;
}

function max(node) {
  var current = node;
  while (current.left !== null) {
    current = current.right;
  }
  return current;
}

function inOrder(node) {
  if(node !== null) {
    inOrder(node.left);
    console.log(node.show());
    inOrder(node.right);
  }
}

function find(data) {
  return _find(this.root, data);
}

function _find(node, data) {
  if (node === null) {
    return null;
  }

  if (data === node.data) {
    return node;
  } else if (data < node.data) {
    return _find(node.left, data);
  } else {
    return _find(node.right, data);
  }
}

function size() {
  return _size(this.root);
}

function _size(node) {
  if (node === null) {
    return 0;
  }

  return 1 + _size(node.left) + _size(node.right);
}

/* Removing a Node
 3 cases: I: If the node to be removed is a leaf, all we have to do is to set the link that is pointing to the node of the parent node to null
          II: When the node we want to remove has just one child, then the link that is pointing to the node to be removed has to be adjusted to 
              point to the removed node's child node
          III: When the node we want to remove has 2 children, we either find the largest value in the subtree to the left of the removed node or
               to find the smallest value in the subtree to the right of the removed node. For this case, we will choose to go to the right
*/
function remove(data) {
  return _remove(this.root, data);
}         

function _remove(node, data) {
  if (node === null) {
    return null;
  }

  if (data === node.data) { // found node to delete

    // node has no children
    if (node.left === null && node.right === null) {
      return null;
    }

    // node has only a left child
    if (node.left !== null && node.right === null) {
      return node.left;
    }

    // node has only a right child
    if (node.right !== null && node.left === null) {
      return node.right;
    }

    // node has two children
    var tempNode = min(node.right);
    node.data = tempNode.data;
    node.right = _remove(node.right, tempNode.data); // we swapped data with the min value in the right subtree so now go into the right subtree and remove that node
    
    return node;
  } else if (data < node.data) {
    node.left = _remove(node.left, data);
    return node;
  } else if (data > node.data) {
    node.right = _remove(node.right, data);
    return node;
  }
} 

// for clear() in JavaScript, setting node to null doesn't work so added lines to make root, left and right to be null
function clear() {
  this._clear(this.root);
  this.root = null;
}

function _clear(node) {
  if (node === null) {
    return;
  }
  this._clear(node.left);
  this._clear(node.right);

  node.left = null;
  node.right = null;
  node = null;
}

function isBST() {
  var dummy = new Node(Infinity, this.root, null);
  return _isBST(this.root, true, false, dummy.data);
}

// note: not fully tested
function _isBST(node, isLeftChild, isRightChild, parentData) {
  if (node === null) {
    return true;
  } else if (isLeftChild && node.data > parentData) {
    return false;
  } else if (isRightChild && node.data < parentData) {
    return false;
  }

  return _isBST(node.left, true, false, node.data) && _isBST(node.right, false, true, node.data);
}

function getHeight() {
  return this._getHeight(this.root);
}

function _getHeight(node) {
  if (node === null) {
    return 0;
  }

  return 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
}

function getLargestBSTSubTreeSize() {
  this._getLargestBSTSubTreeSize(this.root);
}

function _getLargestBSTSubTreeSize(node) {

}

function areTreesIdentical(tree1, tree2) {

}

function mirror() {

}

function getRandomBSTNode() {

}

// http://www.geeksforgeeks.org/the-great-tree-list-recursion-problem/ or http://www.geeksforgeeks.org/the-great-tree-list-recursion-problem/
function treeToCircularDoublyLinkedList(tree) {

}

// http://www.geeksforgeeks.org/given-a-binary-tree-print-out-all-of-its-root-to-leaf-paths-one-per-line/
function printAllPaths() {

}

// http://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-search-tree/
function lowestCommonAncestor(tree1, tree2) {

}

// http://www.geeksforgeeks.org/level-order-tree-traversal/
function printByLevel() {

}

// http://www.geeksforgeeks.org/level-order-traversal-in-spiral-form/
function printSpiral() {

}

// http://www.geeksforgeeks.org/write-a-c-program-to-get-count-of-leaf-nodes-in-a-binary-tree/
function countLeafNodes() {

}

// http://www.geeksforgeeks.org/check-for-children-sum-property-in-a-binary-tree/
function doChildrenSumUpToNodeValue() {

}

// http://www.geeksforgeeks.org/diameter-of-a-binary-tree/
function getTreeDiameter() {

}

// http://www.geeksforgeeks.org/how-to-determine-if-a-binary-tree-is-balanced/
function isTreeBalanced() {

}

// http://www.geeksforgeeks.org/root-to-leaf-path-sum-equal-to-a-given-number/
function existsPathSum() {

}

var BinarySearchTree = function() {
  return {
    BinarySearchTree: BST,
    Node: Node
  }
}();

module.exports = BinarySearchTree;
/* MISC
-Finding the kth smallest element in less than O(n) time: http://stackoverflow.com/questions/2329171/find-kth-smallest-element-in-a-binary-search-tree-in-optimum-way/2329236#2329236
*/

