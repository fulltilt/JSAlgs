var BST = require('../BinarySearchTree.js');
var LinkedList = require('../LinkedList.js');

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
    bt.insert(3);
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
    var root = new BST.Node(3);
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

  it('tests isSubTree', function() {
    bst.isSubTree(bt2.root, bt3.root);
  });

  it('tests treeToCircularDoublyLinkedList', function() {
    var tcdl = new BST.BinarySearchTree();
    tcdl.insert(4);
    tcdl.insert(2);
    tcdl.insert(5);
    tcdl.insert(1);
    tcdl.insert(3);
    var head = bst.treeToCircularDoublyLinkedList(tcdl.root);
    expect(head.data).toEqual(1);
    expect(head.right.data).toEqual(2);
    expect(head.right.right.data).toEqual(3);
    expect(head.right.right.right.data).toEqual(4);
    expect(head.right.right.right.right.data).toEqual(5);
    expect(head.right.right.right.right.right).toEqual(head); // show that the list is circular
  });

  it('tests linkedListToBinaryTree', function() {
    var ll = new LinkedList();
    ll.insertHead(36);
    ll.insertHead(30);
    ll.insertHead(25);
    ll.insertHead(15);
    ll.insertHead(12);
    ll.insertHead(10);
    var result = [],
        root = bst.linkedListToBinaryTree(ll.head);
    bst.getInOrder(root, result);
    expect(result).toEqual([25, 12, 30, 10, 36, 15]);
  });

  it('tests BTFind', function() {
    var n1 = bt.root.right.right.left,
        n2 = bt.root.left.left,
        n3 = bt.root.left.right.left,
        n4 = bt.root.left.right.right.left;
    expect(bt.BTFind(bt.root, n1.data).data).toEqual(4);
    expect(bt.BTFind(bt.root, n2.data).data).toEqual(2);
    expect(bt.BTFind(bt.root, n3.data).data).toEqual(5);
    expect(bt.BTFind(bt.root, n4.data).data).toEqual(1);
  });

  it('tests lowestCommonAncestorBST', function() {
    var n1 = bst.find(10),
        n2 = bst.find(36),
        n3 = bst.find(99),
        n4 = bst.find(22);
    expect(bst.lowestCommonAncestorBST(n1,n2).data).toEqual(23);
    expect(bst.lowestCommonAncestorBST(n2,n3).data).toEqual(45);
    expect(bst.lowestCommonAncestorBST(n3,n4).data).toEqual(23);
    expect(bst.lowestCommonAncestorBST(n2,n4).data).toEqual(23);
    expect(bst.lowestCommonAncestorBST(n1,n4).data).toEqual(16);
  });

  it('tests lowestCommonAncestorBT', function() {
    var n1 = bt.root.right.right.left,
        n2 = bt.root.left.left,
        n3 = bt.root.left.right.left,
        n4 = bt.root.left.right.right.left;
    expect(bt.lowestCommonAncestorBT(n1,n4).data).toEqual(3);
    expect(bt.lowestCommonAncestorBT(n2,n3).data).toEqual(7);
    expect(bt.lowestCommonAncestorBT(n2,n4).data).toEqual(7);
    expect(bt.lowestCommonAncestorBT(n3,n4).data).toEqual(6);
  });

  it('tests differenceBetweenOddAndEvenLevelSums', function() {
    var dboe = new BST.BinarySearchTree();
    dboe.insert(5);
    dboe.insert(2);
    dboe.insert(6);
    dboe.insert(1);
    dboe.insert(4);
    dboe.insert(3);
    dboe.insert(8);
    dboe.insert(7);
    dboe.insert(9);
    expect(dboe.differenceBetweenOddAndEvenLevelSums(dboe.root)).toEqual(-9);
    expect(dboe.differenceBetweenOddAndEvenLevelSums2(dboe.root)).toEqual(-9);
  });

  it('tests getLevelOfNode', function() {
    expect(bst.getLevelOfNode(bst.root, 23, 0)).toEqual(1);
    expect(bst.getLevelOfNode(bst.root, 22, 0)).toEqual(3);
    expect(bst.getLevelOfNode(bst.root, 36, 0)).toEqual(4);
    expect(bst.getLevelOfNode(bst.root, 100, 0)).toEqual(-1);
  });

  it('tests printSpiral', function() {
    expect(bst.printSpiral()).toEqual('23 16 45 99 37 22 3 10 36');
  });

  it('tests countLeafNodes', function() {
    expect(bst.countLeafNodes(bst.root)).toEqual(4);
    expect(bt.countLeafNodes(bt.root)).toEqual(4);
  });

  it('tests doChildrenSumUpToNodeValue', function() {
    var root = new BST.Node(10);
    root.left = new BST.Node(8);
    root.left.left = new BST.Node(3);
    root.left.right = new BST.Node(5);
    root.right = new BST.Node(2);
    root.right.left = new BST.Node(2);
    expect(bst.doChildrenSumUpToNodeValue(root)).toEqual(true);
    expect(bst.doChildrenSumUpToNodeValue(bst.root)).toEqual(false);
  });

  it('tests getTreeDiameter', function() {
    expect(bst.getTreeDiameter(bst.root)).toEqual(7);
    expect(bt.getTreeDiameter(bt.root)).toEqual(8);
  });

  it('tests getMaxWidth', function() {
    expect(bst.getMaxWidth(bst.root)).toEqual(4);
-    expect(bt.getMaxWidth(bt.root)).toEqual(3);
  });

  it('tests isTreeBalanced', function() {
    expect(bst.isTreeBalanced(bst.root)).toEqual(true);
    expect(bt.isTreeBalanced(bt.root)).toEqual(false);
  });

  it('tests existsPathSum', function() {
    expect(bt.existsPathSum(bt.root, 0, 28)).toEqual(true);
    expect(bt.existsPathSum(bt.root, 0, 21)).toEqual(true);
    expect(bt.existsPathSum(bt.root, 0, 100)).toEqual(false);
    expect(bt.existsPathSum(bt.root, 0, 12)).toEqual(true);
  });

  it('tests doubleTree', function() {
    var root = new BST.Node(1);
    root.left = new BST.Node(2);
    root.right = new BST.Node(3);
    root.left.left = new BST.Node(4);
    root.left.right = new BST.Node(5);
    bst.doubleTree(root);
    var result = [];
    bst.getInOrder(root, result);
    expect(result).toEqual([4, 4, 2, 2, 5, 5, 1, 1, 3, 3]);
  });

  it('tests canFold', function() {
    var root1 = new BST.Node(10);
    root1.left = new BST.Node(7);
    root1.right = new BST.Node(15);
    root1.left.right = new BST.Node(9);
    root1.right.left = new BST.Node(11);
    expect(bst.canFold(root1, root1)).toEqual(true);

    var root2 = new BST.Node(10);
    root2.left = new BST.Node(7);
    root2.right = new BST.Node(15);
    root2.left.left = new BST.Node(9);
    root2.right.right = new BST.Node(11);
    expect(bst.canFold(root2, root2)).toEqual(true);

    var root3 = new BST.Node(10);
    root3.left = new BST.Node(7);
    root3.right = new BST.Node(15);
    root3.left.left = new BST.Node(9);
    root3.right.left = new BST.Node(11);
    expect(bst.canFold(root3, root3)).toEqual(false);

    var root4 = new BST.Node(10);
    root4.left = new BST.Node(7);
    root4.right = new BST.Node(15);
    root4.left.left = new BST.Node(9);
    root4.left.right = new BST.Node(10);
    root4.right.left = new BST.Node(12);
    expect(bst.canFold(root4, root4)).toEqual(false);
  });

  it('tests kDistanceFromRoot', function() {
    var root = new BST.Node(1);
    root.left = new BST.Node(2);
    root.right = new BST.Node(3);
    root.left.left = new BST.Node(4);
    root.left.right = new BST.Node(5);
    root.right.left = new BST.Node(8);
    var result = [];
    bst.kDistanceFromRoot(root, 2, result);
    expect(result).toEqual([4,5,8]);
  });

  it('tests kDistanceFromLeaf', function() {
    var root = new BST.Node(1);
    root.left = new BST.Node(2);
    root.right = new BST.Node(3);
    root.left.left = new BST.Node(4);
    root.left.right = new BST.Node(5);
    root.right.left = new BST.Node(6);
    root.right.right = new BST.Node(7);
    root.right.left.right = new BST.Node(8);
    var visited = [], //Stores true if a node is printed as output. A node may be k distance away from many leaves, we want to print it once
        path = [],
        results = [];
    bst.kDistanceFromLeaf(root, path, visited, 0, 2, results);
    expect(results).toEqual([1,3]);
  });

  it('tests kDistanceFromNode', function() {
    var root = new BST.Node(20);
    root.left = new BST.Node(8);
    root.right = new BST.Node(22);
    root.left.left = new BST.Node(4);
    root.left.right = new BST.Node(12);
    root.left.right.left = new BST.Node(10);
    root.left.right.right = new BST.Node(14);
    var target = root.left,
        result = [];
    bst.kDistanceFromNode(root, target, 2, result);
    expect(result).toEqual([10,14,22]);
  });

  it('tests getSuccessor', function() {
    var root = new BST.Node(20);
    root.left = new BST.Node(8);
    root.left.left = new BST.Node(4);
    root.left.right = new BST.Node(12);
    root.left.right.left = new BST.Node(10);
    root.left.right.right = new BST.Node(14);
    root.right = new BST.Node(22);
    expect(bst.getSuccessor(root, root.left)).toEqual(root.left.right.left);
    expect(bst.getSuccessor(root, root.left.right.left)).toEqual(root.left.right);
    expect(bst.getSuccessor(root, root.left.right.right)).toEqual(root);
  });

  it('tests getPredecessorAndSuccessor', function() {
    var gps = new BST.BinarySearchTree();
    gps.insert(50);
    gps.insert(30);
    gps.insert(20);
    gps.insert(40);
    gps.insert(70);
    gps.insert(60);
    gps.insert(80);

    // these Objects will be passed by reference and will point to predecessor and successor
    var predecessor = new BST.Node(),
        successor = new BST.Node();
    bst.getPredecessorAndSuccessor(gps.root, predecessor, successor, 50);
    expect(predecessor.data).toEqual(40);
    expect(successor.data).toEqual(60);
    bst.getPredecessorAndSuccessor(gps.root, predecessor, successor, 60);
    expect(predecessor.data).toEqual(50);
    expect(successor.data).toEqual(70);
    bst.getPredecessorAndSuccessor(gps.root, predecessor, successor, 65);
    expect(predecessor.data).toEqual(60);
    expect(successor.data).toEqual(70);
  });

  it('tests kthSmallestElement', function() {
    var root = new BST.Node(20);
    root.left = new BST.Node(8);
    root.right = new BST.Node(22);
    root.left.left = new BST.Node(4);
    root.left.right = new BST.Node(12);
    root.left.right.left = new BST.Node(10);
    root.left.right.right = new BST.Node(14);
    var stack = [];
    bst.kthSmallestElement(root, stack, 3);
    expect(stack[2]).toEqual(10);
    bst.kthSmallestElement(root, stack, 5);
    expect(stack[4]).toEqual(14);
  });

  it('tests printAncestors', function() {
    var root = new BST.Node(20);
    root.left = new BST.Node(8);
    root.right = new BST.Node(22);
    root.left.left = new BST.Node(4);
    root.left.right = new BST.Node(12);
    root.left.right.left = new BST.Node(10);
    root.left.right.right = new BST.Node(14);
    var result = [];
    bst.printAncestors(root, root.left.right.right, result);
    expect(result).toEqual([12,8,20]);
    result = [];
    bst.printAncestors(root, root.left.right.left, result);
    expect(result).toEqual([12,8,20]);
  });

  it('tests printInGivenRange', function() {
    var root = new BST.Node(20);
    root.left = new BST.Node(8);
    root.right = new BST.Node(22);
    root.left.left = new BST.Node(4);
    root.left.right = new BST.Node(12);
    root.left.right.left = new BST.Node(10);
    root.left.right.right = new BST.Node(14);
    var result = [];
    bst.printInGivenRange(root, 12, 21, result);
    expect(result).toEqual([12,14,20]);
  });

  it('tests sortedArrayToBalancedBST', function() {
    var root = bst.sortedArrayToBalancedBST([1,2,4,7,8,9,20], 0, 6);
    var result = [];
    bst.getInOrder(root, result);
    expect(result).toEqual([1,2,4,7,8,9,20]);
  });

  it('tests getVerticalSums', function() {
    var root = new BST.Node(1);
    root.left = new BST.Node(2);
    root.left.left = new BST.Node(4);
    root.left.right = new BST.Node(5);
    root.right = new BST.Node(3);
    root.right.left = new BST.Node(6);
    root.right.right = new BST.Node(7);
    var map = {};
    bst.getVerticalSums(root, map);
    expect(map).toEqual({'-2':4, '-1':2, '0':12, '1':3, '2':7})
  });

  it('tests findMaxSumPath', function() {
    var root = new BST.Node(10);
    root.left = new BST.Node(-2);
    root.left.left = new BST.Node(8);
    root.left.right = new BST.Node(-4);
    root.right = new BST.Node(7);
    expect(bst.findMaxSumPath(root, 0)).toEqual(17);
  });

  it('tests isTreeComplete', function() {
    var root1 = new BST.Node(1);
    root1.left = new BST.Node(2);
    root1.right = new BST.Node(3);
    expect(bst.isTreeComplete(root1)).toEqual(true);

    root1.left.left = new BST.Node(4);
    expect(bst.isTreeComplete(root1)).toEqual(true);

    root1.left.right = new BST.Node(5);
    root1.right.left = new BST.Node(6);
    expect(bst.isTreeComplete(root1)).toEqual(true);

    var root2 = new BST.Node(1);
    root2.right = new BST.Node(3);
    expect(bst.isTreeComplete(root2)).toEqual(false);

    root2.left = new BST.Node(2);
    root2.left.right = new BST.Node(4);
    root2.right = new BST.Node(3);
    root2.right.left = new BST.Node(5);
    root2.right.right = new BST.Node(6);
    expect(bst.isTreeComplete(root2)).toEqual(false);
  });

  it('tests ceiling', function() {
    var root = new BST.Node(8);
    root.left = new BST.Node(4);
    root.right = new BST.Node(12);
    root.left.left = new BST.Node(2);
    root.left.right = new BST.Node(6);
    root.right.left = new BST.Node(10);
    root.right.right = new BST.Node(14);
    var result = [];
    expect(bst.ceiling(root, 0)).toEqual(2);
    expect(bst.ceiling(root, 7)).toEqual(8);  // tricky case
    expect(bst.ceiling(root, 15)).toEqual(-1);
  });

  it('tests existsTripletThatSumsToZero', function() {
    var root = new BST.Node(6);
    root.left = new BST.Node(-13);
    root.left.right = new BST.Node(-8);
    root.right = new BST.Node(14);
    root.right.left = new BST.Node(13);
    root.right.left.left = new BST.Node(7);
    root.right.right = new BST.Node(15);
    expect(bst.existsTripletThatSumsToZero(root)).toEqual(true);
    expect(bst.existsTripletThatSumsToZero(bst.root)).toEqual(false);
  });

  it('tests removeNodesOutsideRange', function() {
    var root = new BST.Node(6);
    root.left = new BST.Node(-13);
    root.left.right = new BST.Node(-8);
    root.right = new BST.Node(14);
    root.right.left = new BST.Node(13);
    root.right.left.left = new BST.Node(7);
    root.right.right = new BST.Node(15);
    bst.removeNodesOutsideRange(root, -10, 13);
    //bst.iterativeInOrder(root);
  });

  it('tests areTreesIsomorphic', function() {
    var root1 = new BST.Node(1);
    root1.left = new BST.Node(2);
    root1.left.left = new BST.Node(4);
    root1.left.right = new BST.Node(5);
    root1.left.right.left = new BST.Node(7);
    root1.left.right.right = new BST.Node(8);
    root1.right = new BST.Node(3);
    root1.right.left = new BST.Node(6);

    var root2 = new BST.Node(1);
    root2.left = new BST.Node(3);
    root2.left.right = new BST.Node(6);
    root2.right = new BST.Node(2);
    root2.right.left = new BST.Node(4);
    root2.right.right = new BST.Node(5);
    root2.right.right.left = new BST.Node(8);
    root2.right.right.right = new BST.Node(7);

    expect(bst.areTreesIsomorphic(root1, root2)).toEqual(true);
    expect(bst.areTreesIsomorphic(bst.root, bt.root)).toEqual(false);
  });

  it('tests maxDepthOfOddLevelLeaf', function() {
    var root = new BST.Node(1);
    root.left = new BST.Node(2);
    root.left.left = new BST.Node(4);
    root.right = new BST.Node(3);
    root.right.left = new BST.Node(5);
    root.right.left.right = new BST.Node(7);
    root.right.left.right.left = new BST.Node(9);
    root.right.right = new BST.Node(6);
    root.right.right.right = new BST.Node(8);
    root.right.right.right.right = new BST.Node(10);
    root.right.right.right.right.left = new BST.Node(11);
    expect(bst.maxDepthOfOddLevelLeaf(root, 1)).toEqual(5);
  });

  it('tests areAllLeafsSameLevel', function() {
    var root = new BST.Node();
    root.left = new BST.Node();
    root.left.left = new BST.Node();
    root.right = new BST.Node();
    root.right.right = new BST.Node();
    expect(bt.areAllLeafsSameLevel(root, 1)).toEqual(true);
    expect(bt.areAllLeafsSameLevel(bt.root, 1)).toEqual(false);
    expect(bt.areAllLeafsSameLevel(bst.root, 1)).toEqual(false);
  });

  it('tests addGreaterValuesToEachNode', function() {
    var root = new BST.Node(50);
    root.left = new BST.Node(30);
    root.left.left = new BST.Node(20);
    root.left.right = new BST.Node(40);
    root.right = new BST.Node(70);
    root.right.left = new BST.Node(60);
    root.right.right = new BST.Node(80);
    var cumulativeSum = { sum: 0 };
    bst.addGreaterValuesToEachNode(root, cumulativeSum);
    
    expect(root.data).toEqual(260);
    expect(root.left.data).toEqual(330);
    expect(root.left.left.data).toEqual(350);
    expect(root.left.right.data).toEqual(300);
    expect(root.right.data).toEqual(150);
    expect(root.right.left.data).toEqual(210);
    expect(root.right.right.data).toEqual(80);
  });

  it('tests extractLeavesToDoublyLinkedList', function() {
    var root = new BST.Node(1);
    root.left = new BST.Node(2);
    root.left.left = new BST.Node(4);
    root.left.right = new BST.Node(5);
    root.left.left.left = new BST.Node(7);
    root.left.left.right = new BST.Node(8);
    root.right = new BST.Node(3);
    root.right.right = new BST.Node(6);
    root.right.right.left = new BST.Node(9);
    root.right.right.right = new BST.Node(10);

    var head = bst.extractLeavesToDoublyLinkedList(root);
    expect(head.data).toEqual(5);
    expect(head.right.data).toEqual(7);
    expect(head.right.right.data).toEqual(8);
    expect(head.right.right.right.data).toEqual(9);
    expect(head.right.right.right.right.data).toEqual(10);
    //bst.iterativeInOrder(root);   // display modified tree after removing leafs
  });

  it('tests findDeepestLeftNode', function() {
    var root = new BST.Node(1);
    root.left = new BST.Node(2);
    root.right = new BST.Node(3);
    root.left.left = new BST.Node(4);
    root.right.left = new BST.Node(5);
    root.right.right = new BST.Node(6);
    root.right.left.right = new BST.Node(7);
    root.right.right.right = new BST.Node(8);
    root.right.left.right.left = new BST.Node(9);
    root.right.right.right.right = new BST.Node(10);

    var maxLevel = { level: 0 };
    bst.findDeepestLeftNode(root, 1, false, maxLevel);
    expect(maxLevel.level).toEqual(5);

    maxLevel.level = 0;
    bst.findDeepestLeftNode(bst.root, 1, false, maxLevel);
    expect(maxLevel.level).toEqual(4);

    maxLevel.level = 0;
    bst.findDeepestLeftNode(bt.root, 1, false, maxLevel);
    expect(maxLevel.level).toEqual(5);
  });

  it('tests getNextRightNode', function() {
    var root = new BST.Node(10);
    root.left = new BST.Node(2);
    root.left.left = new BST.Node(8);
    root.left.right = new BST.Node(4);
    root.right = new BST.Node(6);
    root.right.right = new BST.Node(5);
    expect(bst.getNextRightNode(root, 2)).toEqual(6);
    expect(bst.getNextRightNode(root, 8)).toEqual(4);
    expect(bst.getNextRightNode(root, 4)).toEqual(5);
    expect(bst.getNextRightNode(root, 10)).toEqual(null);
    expect(bst.getNextRightNode(root, 6)).toEqual(null);
    expect(bst.getNextRightNode(5)).toEqual(null);
  });

  it('tests sumOfAllNumsFormedFromRootToLeafPaths', function() {
    var root = new BST.Node(6);
    root.left = new BST.Node(3);
    root.left.left = new BST.Node(2);
    root.left.right = new BST.Node(5);
    root.left.right.left = new BST.Node(7);
    root.left.right.right = new BST.Node(4);
    root.right = new BST.Node(5);
    root.right.right = new BST.Node(4);
    var result = { sum: 0 },
        path = [];
    bst.sumOfAllNumsFormedFromRootToLeafPaths(root, path, result);
    expect(result.sum).toEqual(13997);
  });

  it('tests printNodesWithoutSibling', function() {
    var root = new BST.Node(1);
    root.left = new BST.Node(2);
    root.left.right = new BST.Node(4);
    root.right = new BST.Node(3);
    root.right.left = new BST.Node(5);
    root.right.left.left = new BST.Node(6);

    var result = [];
    bst.printNodesWithoutSibling(root, result);
    expect(result).toEqual([4,5,6]);
  });

  it('tests areNodesCousins', function() {
    var root = new BST.Node(6);
    root.left = new BST.Node(3);
    root.right = new BST.Node(5);
    root.left.left = new BST.Node(7);
    root.left.right = new BST.Node(8);
    root.right.left = new BST.Node(1);
    root.right.right = new BST.Node(3);
    expect(bst.areNodesCousins(root, 7, 1)).toEqual(true);
    expect(bst.areNodesCousins(root, 3, 5)).toEqual(false);
    expect(bst.areNodesCousins(root, 7, 5)).toEqual(false);
  });

  it('tests recreateFromInOrderAndPreOrder', function() {
    var inOrder = ['D', 'B', 'E', 'A', 'F', 'C'],
        preOrder = ['A', 'B', 'D', 'E', 'C', 'F'],
        preOrderIndex = { index: 0 },
        root = bst.recreateFromInOrderAndPreOrder(inOrder, preOrder, 0, inOrder.length - 1, preOrderIndex);

    //bst.printByLevel(root);
  });

  it('tests recreateFromPreOrderAndPostOrder', function() {
    var pre = [1, 2, 4, 8, 9, 5, 3, 6, 7],
        post = [8, 9, 4, 5, 2, 6, 7, 3, 1],
        preOrderIndex = { index: 0 },
        root = bst.recreateFromPreOrderAndPostOrder(pre, post, 0, pre.length - 1, preOrderIndex);
    //bst.printByLevel(root);
  });

/**/xit('tests recreateFromInOrderAndLevelOrder', function() {
    var inOrder = [4, 8, 10, 12, 14, 20, 22],
        levelOrder = [20, 8, 22, 4, 12, 10, 14],
        root = bst.recreateFromInOrderAndLevelOrder(inOrder, levelOrder, 0, inOrder.length - 1);
    //bst.printByLevel(root);
  });

  it('tests recreateFromInOrder', function() {
    var arr = [1, 5, 10, 40, 30, 15, 28, 20],
        root = bst.recreateFromInOrder(arr, 0, arr.length - 1);
    //bst.printByLevel(root);
  });

  it('tests recreateFromPreOrder', function() {
    var arr = [10, 5, 1, 7, 40, 50],
        root = bst.recreateFromPreOrder(arr, 0, arr.length - 1);
    //bst.printByLevel(root);
  });

  it('tests postOrderFromInOrderAndPreOrder', function() {
    var inOrder = [4, 2, 5, 1, 3, 6],
        preOrder = [1, 2, 4, 5, 3, 6],
        preOrderIndex = { index: 0 },
        result = [],
        root = bst.postOrderFromInOrderAndPreOrder(inOrder, preOrder, 0, inOrder.length - 1, preOrderIndex, result);
    expect(result).toEqual([4,5,2,6,3,1]);
  });

  it('tests constructSpecialBT', function() {

  });

  it('tests checkIdenticalArrayBST', function() {
    
  });

  it('tests doesEachNodeHaveOnlyOneChild', function() {

  });

  it('tests iterativePostOrder', function() {

  });

  it('tests morrisTraversal', function() {

  });

  xit('tests mergeTwoTrees', function() {
    var root1 = new BST.Node(3);
    root1.left = new BST.Node(1);
    root1.right = new BST.Node(5);

    var root2 = new BST.Node(4);
    root2.left = new BST.Node(2);
    root2.right = new BST.Node(6);
    bst.mergeTwoTrees(root1, root2);

    var root3 = new BST.Node(8);
    root3.left = new BST.Node(2);
    root3.right = new BST.Node(10);
    root3.left.left = new BST.Node(1);

    var root4 = new BST.Node(5);
    root4.left = new BST.Node(3);
    root4.left.left = new BST.Node(0);
    bst.mergeTwoTrees(root3, root4);
  });

  xit('tests fixBSTAfterSwap', function() {
    var root = new BST.Node(10);
    root.left = new BST.Node(5);
    root.left.left = new BST.Node(2);
    root.left.right = new BST.Node(20);
    root.right = new BST.Node(8);
    bst.fixBSTAfterSwap(root);
  });

  xit('tests removeNodesWhosePathLessThanK', function() {
    var root = new BST.Node(1);
    root.left = new BST.Node(2);
    root.left.left = new BST.Node(4);
    root.left.left.left = new BST.Node(8);
    root.left.right = new BST.Node(5);
    root.left.right.left = new BST.Node(12);
    root.left.left.right = new BST.Node(9);
    root.left.left.right.left = new BST.Node(13);
    root.left.left.right.right = new BST.Node(14);
    root.left.left.right.right.left = new BST.Node(15);
    root.right = new BST.Node(3);
    root.right.right = new BST.Node(7);
    root.right.right.left = new BST.Node(10);
    root.right.right.left.right = new BST.Node(11);
    var cumulativeSum = { sum: 0 };
    bst.iterativeInOrder(root);
    bst.removeNodesWhosePathLessThanK(root, 45, 0);
    //bst.iterativeInOrder(root);
  });

  xit('tests findMaxPathSumBetweenTwoLeaves', function() {
    var root = new BST.Node(-15);
    root.left = new BST.Node(5);
    root.right = new BST.Node(6);
    root.left.left = new BST.Node(-8);
    root.left.right = new BST.Node(1);
    root.left.left.left = new BST.Node(2);
    root.left.left.right = new BST.Node(6);
    root.right.left = new BST.Node(3);
    root.right.right = new BST.Node(9);
    root.right.right.right= new BST.Node(0);
    root.right.right.right.left= new BST.Node(4);
    root.right.right.right.right= new BST.Node(-1);
    root.right.right.right.right.left= new BST.Node(10);

    var maxPath = { sum: 0 };
    expect(bst.findMaxPathSumBetweenTwoLeaves(root, maxPath)).toEqual(27);
  });

  xit('tests getRandomBSTNode', function() {
    console.log(bst.getRandomBSTNode(bst.root));
    console.log(bst.getRandomBSTNode(bst.root));
    console.log(bst.getRandomBSTNode(bst.root));
    console.log(bst.getRandomBSTNode(bst.root));
  });

  xit('tests convertToSumTree', function() {
    var root = new BST.Node(10);
    root.left = new BST.Node(-2);
    root.right = new BST.Node(6);
    root.left.left = new BST.Node(8);
    root.left.right = new BST.Node(-4);
    root.right.left = new BST.Node(7);
    root.right.right = new BST.Node(5);
    bst.convertToSumTree(root);
    bst.printByLevel(root);
  });

  xit('tests reverseAlternateLevels', function() {
    var root = new BST.Node('a');
    root.left = new BST.Node('b');
    root.right = new BST.Node('c');
    root.left.left = new BST.Node('d');
    root.left.right = new BST.Node('e');
    root.right.left = new BST.Node('f');
    root.right.right = new BST.Node('g');
    root.left.left.left = new BST.Node('h');
    root.left.left.right = new BST.Node('i');
    root.left.right.left = new BST.Node('j');
    root.left.right.right = new BST.Node('k');
    root.right.left.left = new BST.Node('l');
    root.right.left.right = new BST.Node('m');
    root.right.right.left = new BST.Node('n');
    root.right.right.right = new BST.Node('o');
    bst.reverseAlternateLevels(root);
  });

  xit('tests printVerticalTree', function() {
    var root = new BST.Node(1);
    root.left = new BST.Node(2);
    root.left.left = new BST.Node(4);
    root.left.right = new BST.Node(5);
    root.right = new BST.Node(3);
    root.right.left = new BST.Node(6);
    root.right.left.right = new BST.Node(8);
    root.right.right = new BST.Node(7);
    root.right.right.right = new BST.Node(9);

    var map = {};
    bst.printVerticalTree(root, 0, map);
    
    var keys = Object.keys(map).sort(function(a, b) { return a - b; });
    for (var i = 0; i < keys.length; i++) {
      console.log(map[keys[i]].join(' '));
    }
  });

  xit('tests printLeftView and printRightView', function() {
    var root = new BST.Node(12);
    root.left = new BST.Node(10);
    root.right = new BST.Node(30);
    root.right.left = new BST.Node(25);
    root.right.right = new BST.Node(40);
    bst.printLeftView(root);
    console.log('');
    bst.printRightView(root);
  });

  xit('tests boundaryTraversal', function() {
    var root = new BST.Node(20);
    root.left = new BST.Node(8);
    root.left.left = new BST.Node(4);
    root.left.right = new BST.Node(12);
    root.left.right.left = new BST.Node(10);
    root.left.right.right = new BST.Node(14);
    root.right = new BST.Node(22);
    root.right.right = new BST.Node(25);
    bst.boundaryTraversal(root);
  });

  xit('tests iterativeInOrder', function() {
    bst.iterativeInOrder(bst.root);
  });

  xit('tests printAllPaths', function() {
    var paths = [];
    bst.printAllPaths(bst.root, paths);
  });
  
  xit('tests printByLevel', function() {
    bst.printByLevel();
    bt.printByLevel();
  });
});