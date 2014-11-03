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

  });

  it('tests kDistanceFromRoot', function() {

  });

  it('tests printArrayRepresentationOfBST', function() {

  });

  it('tests checkIdenticalArrayBST', function() {

  });

  it('tests getSuccessor', function() {

  });

  it('tests getPredecessorAndSuccessor', function() {

  });

  it('tests kthSmallestElement', function() {

  });

  it('tests printAncestors', function() {

  });

  it('tests printInGivenRange', function() {

  });

  it('tests connectNodesAtSameLevel', function() {

  });

  it('tests sortedArrayToBalancedBST', function() {

  });

  it('tests getVerticalSums', function() {

  });

  it('tests findMaxSumPath', function() {

  });

  it('tests mergeTwoTrees', function() {

  });

  it('tests constructSpecialBT', function() {

  });

  it('tests doesEachNodeHaveOnlyOneChild', function() {

  });

  it('tests isTreeComplete', function() {

  });

  it('tests boundaryTraversal', function() {

  });

  it('tests fixBSTAfterSwap', function() {

  });

  it('tests floorAndCeil', function() {

  });

  it('tests morrisTraversal', function() {

  });

  it('tests iterativePostOrder', function() {

  });

  it('tests existsTripletThatSumsToZero', function() {

  });

  it('tests removeNodesOutsideRange', function() {

  });

  it('tests areTreesIsomorphic', function() {

  });

  it('tests maxDepthOfOddLevelLeaf', function() {

  });

  it('tests areAllLeafsSameLevel', function() {

  });

  it('tests printLeftView', function() {

  });

  it('tests printRightView', function() {

  });

  it('tests addGreaterValuesToEachNode', function() {

  });

  it('tests removeNodesWhosePathLessThanK', function() {

  });

  it('tests extractLeavesToDoublyLinkedList', function() {

  });

  it('tests findDeepestLeftNode', function() {

  });

  it('tests getNextRightNode', function() {

  });

  it('tests sumOfAllNumsFormedFromRootToLeafPaths', function() {

  });

  it('tests printNodesWithoutSibling', function() {

  });

  it('tests printAlternateLevels', function() {

  });

  it('tests printVerticalTree', function() {

  });

  it('tests findMaxPathSumBetweenTwoLeaves', function() {

  });

  it('tests areNodesCousins', function() {

  });

  it('tests recreateTreeGivenTwoTraversals', function() {

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