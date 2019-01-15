var AVLTree = require('../Trees/AVLTree.js');

describe("AVL Tree", function() {
  var avl = new AVLTree(); 
  
  it('tests AVL Tree insert', function() {
    avl.insert(10);
    avl.insert(20);
    avl.insert(30);
    avl.insert(40);
    avl.insert(50);
    avl.insert(25);
    var output = [];
    avl.preOrder(avl.root, output);
    expect(output).toEqual([30,20,10,25,40,50]);
  });
});