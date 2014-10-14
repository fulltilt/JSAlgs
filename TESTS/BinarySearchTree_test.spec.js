var BST = require('../BinarySearchTree.js');

describe("BST", function() {
  var bst = new BST.BinarySearchTree();
  var bt = new BST.BinarySearchTree(); // reusing BST to simulate a binary tree

  beforeEach(function() {
    bst.clear();
    bst.insert(23);
    bst.insert(45);
    bst.insert(16);
    bst.insert(37);
    bst.insert(3);
    bst.insert(99);
    bst.insert(22);
    bst.insert(36);
    bst.insert(10);

    bt.insert(2);
    bt.root.left = new BST.Node(7);
    bt.root.left.left = new BST.Node(2);
    bt.root.left.right = new BST.Node(6);
    bt.root.left.right.left = new BST.Node(5);
    bt.root.left.right.right = new BST.Node(11);
    bt.root.left.right.right.left = new BST.Node(1);
    bt.root.right = new BST.Node(5);
    bt.root.right.right = new BST.Node(9);
    bt.root.right.right.left = new BST.Node(4);
  });

  it('tests clear()', function() {
    bst.clear();
    expect(bst.size()).toEqual(0);
  });

  it("tests inserts and size", function() { 
    expect(bst.size()).toEqual(9);
  });

  it("tests find", function() {
    expect(bst.find(45).data).toEqual(45);
    expect(bst.find(15)).toEqual(null);
  });

  it("tests min and max", function() {
    expect(bst.min(bst.root).data).toEqual(3);
    expect(bst.max(bst.root).data).toEqual(99);
  });

  it("tests remove", function() {
    bst.remove(99); // remove node with no children
    expect(bst.size()).toEqual(8);

    bst.remove(3);  // remove node with only a left child
    expect(bst.size()).toEqual(7);

    bst.remove(37);  // remove node with only a right child
    expect(bst.size()).toEqual(6);

    bst.remove(100);  // attempt to remove a node not in the tree
    expect(bst.size()).toEqual(6);
 
    bst.remove(23);
    expect(bst.size()).toEqual(5);
    //bst.inOrder(bst.root);   
  });

  it('tests isBST', function() {
    expect(bst.isBST()).toEqual(true);
    expect(bt.isBST()).toEqual(false);
  });

  it('tests getHeight', function() {
    expect(bst.getHeight()).toEqual(4);
    expect(bt.getHeight()).toEqual(5);
  });

  it('tests getLargestBSTSubTreeSize()', function() {

  });
});