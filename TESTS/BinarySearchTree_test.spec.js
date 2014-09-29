var BST = require('../BinarySearchTree.js');

describe("BST", function() {
  var bst = new BST();

  beforeEach(function() {
    bst.insert(23);
    bst.insert(45);
    bst.insert(16);
    bst.insert(37);
    bst.insert(3);
    bst.insert(99);
    bst.insert(22);
    bst.insert(36);
    bst.insert(10)
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
});