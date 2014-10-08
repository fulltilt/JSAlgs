function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
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

module.exports = BST;