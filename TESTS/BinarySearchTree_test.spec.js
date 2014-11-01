var BST = require('../BinarySearchTree.js');

describe("BST", function() {
  var bst = new BST.BinarySearchTree();
  var bt = new BST.BinarySearchTree(); // reusing BST to simulate a binary tree
  var bt2 = new BST.BinarySearchTree();
  var bt3 = new BST.BinarySearchTree();

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

    bt.clear();
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

    bt2.clear();
    bt2.insert('x');
    bt2.root.left = new BST.Node('a');
    bt2.root.left.right = new BST.Node('c');
    bt2.root.right = new BST.Node('b');

    bt3.clear();
    bt3.insert('z');
    bt3.root.left = new BST.Node('x');
    bt3.root.left.left = new BST.Node('a');
    bt3.root.left.left.right = new BST.Node('c');
    bt3.root.left.right = new BST.Node('b');
    bt3.root.right = new BST.Node('e');
    bt3.root.right.right = new BST.Node('k');
  });

  it('tests clear()', function() {
    bst.clear();
    expect(bst.size(bst.root)).toEqual(0);
  });

  it("tests inserts and size", function() { 
    expect(bst.size(bst.root)).toEqual(9);
  });

  it("tests find", function() {
    expect(bst.find(45).data).toEqual(45);
    expect(bst.find(15)).toEqual(false);
  });

  it("tests min and max", function() {
    expect(bst.min(bst.root).data).toEqual(3);
    expect(bst.max(bst.root).data).toEqual(99);
  });

  it("tests remove", function() {
    bst.remove(99); // remove node with no children
    expect(bst.size(bst.root)).toEqual(8);

    bst.remove(3);  // remove node with only a left child
    expect(bst.size(bst.root)).toEqual(7);

    bst.remove(37);  // remove node with only a right child
    expect(bst.size(bst.root)).toEqual(6);

    bst.remove(100);  // attempt to remove a node not in the tree
    expect(bst.size(bst.root)).toEqual(6);
 
    bst.remove(23);
    expect(bst.size(bst.root)).toEqual(5);
    //bst.inOrder(bst.root);   
  });

  it('tests isBST', function() {
    expect(bst.isBST(bst.root)).toEqual(true);
    expect(bt.isBST(bt.root)).toEqual(false);
  });

  it('tests getHeight', function() {
    expect(bst.getHeight()).toEqual(4);
    expect(bt.getHeight()).toEqual(5);
  });

  it('tests getLargestBSTSubTreeSize()', function() {
    var root = new BST.Node(50);
    root.left = new BST.Node(30);
    root.left.left = new BST.Node(5);
    root.left.right = new BST.Node(20);
    root.right = new BST.Node(60);
    root.right.left = new BST.Node(45);
    root.right.right = new BST.Node(70);
    root.right.right.left = new BST.Node(65);
    root.right.right.right = new BST.Node(80);
    expect(bst.getLargestBSTSubTreeSize(root)).toEqual(5);
  });

  it('tests areTreesIdentical', function() {
    var root = new BST.Node(2);
    root.left = new BST.Node(7);
    root.left.left = new BST.Node(2);
    root.left.right = new BST.Node(6);
    root.left.right.left = new BST.Node(5);
    root.left.right.right = new BST.Node(11);
    root.left.right.right.left = new BST.Node(1);
    root.right = new BST.Node(5);
    root.right.right = new BST.Node(9);
    root.right.right.left = new BST.Node(4);

    expect(bst.areTreesIdentical(bt.root, root)).toEqual(true);
    expect(bst.areTreesIdentical(bt.root, bst.root)).toEqual(false);
  });

  it('tests mirror', function() {
    var root = new BST.Node(2);
    root.left = new BST.Node(7);
    root.left.left = new BST.Node(2);
    root.left.right = new BST.Node(6);
    root.left.right.left = new BST.Node(5);
    root.left.right.right = new BST.Node(11);
    root.left.right.right.left = new BST.Node(1);
    root.right = new BST.Node(5);
    root.right.right = new BST.Node(9);
    root.right.right.left = new BST.Node(4);

    var root2 = new BST.Node(2);
    root2.right = new BST.Node(7);
    root2.right.right = new BST.Node(2);
    root2.right.left = new BST.Node(6);
    root2.right.left.right = new BST.Node(5);
    root2.right.left.left = new BST.Node(11);
    root2.right.left.left.right = new BST.Node(1);
    root2.left = new BST.Node(5);
    root2.left.left = new BST.Node(9);
    root2.left.left.right = new BST.Node(4);

    expect(bst.mirror(root, root2)).toEqual(true);
    expect(bst.mirror(root, bst.root)).toEqual(false);
  });

  it('tests AVL Tree insert', function() {
    var avl = new BST.AVLTree();
    avl.AVLInsert(10);
    avl.AVLInsert(20);
    avl.AVLInsert(30);
    avl.AVLInsert(40);
    avl.AVLInsert(50);
    avl.AVLInsert(25);
    var output = [];
    avl.AVLPreOrder(avl.root, output);
    expect(output).toEqual([30,20,10,25,40,50]);
  });

  it('tests isSubTree', function() {
    bst.isSubTree(bt2.root, bt3.root);
  });
});