var SplayTree = require('../Trees/SplayTree.js');

describe("Splay Tree", function() {
  var splay = new SplayTree.SplayTree();

  it('tests search()', function() {
    var root = new SplayTree.Node(100);
    root.left = new SplayTree.Node(50);
    root.right = new SplayTree.Node(200);
    root.left.left = new SplayTree.Node(40);
    root.left.left.left = new SplayTree.Node(30);
    root.left.left.left.left = new SplayTree.Node(20);
    root = splay.search(root, 20);
    splay.preOrder(root);
  });

  it('tests insert()', function() {
    var root = new SplayTree.Node(100);
    root.left = new SplayTree.Node(50);
    root.right = new SplayTree.Node(200);
    root.left.left = new SplayTree.Node(40);
    root.left.left.left = new SplayTree.Node(30);
    root.left.left.left.left = new SplayTree.Node(20);
    root = splay.insert(root, 25);
    splay.preOrder(root);
  });
});
