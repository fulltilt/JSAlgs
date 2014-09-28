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

function inOrder(node) {
  if(node !== null) {
    inOrder(node.left);
    console.log(node.show());
    inOrder(node.right);
  }
}

var bst = new BST();
bst.insert(3);
bst.insert(1);
bst.insert(4);
bst.insert(2);
bst.inOrder(bst.root);