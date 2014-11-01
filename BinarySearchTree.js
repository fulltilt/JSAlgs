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
  this.clear = clear;
  this._clear = _clear;

  this.min = min;
  this.max = max;
  this.getInOrder = getInOrder;
  this.getPreOrder = getPreOrder;
  this.isBST = isBST;
  this._isBST = _isBST;
  this.getHeight = getHeight;
  this._getHeight = _getHeight;
  this.isSubTree = isSubTree;
  this.getLargestBSTSubTreeSize = getLargestBSTSubTreeSize;
  this.areTreesIdentical = areTreesIdentical;
  this.mirror = mirror;

  this.printAllPaths = printAllPaths;
  this.printByLevel = printByLevel;
  this.differenceBetweenOddAndEvenLevelSums = differenceBetweenOddAndEvenLevelSums;
  this.printSpiral = printSpiral;
  this.countLeafNodes = countLeafNodes;
  this.doChildrenSumUpToNodeValue = doChildrenSumUpToNodeValue;
  this.getTreeDiameter = getTreeDiameter;
  this.isTreeBalanced = isTreeBalanced;
  this.existsPathSum = existsPathSum;
  this.recreateTreeGivenTwoTraversals = recreateTreeGivenTwoTraversals;
  this.doubleTree = doubleTree;
  this.canFold = canFold;
  this.kDistanceFromRoot = kDistanceFromRoot;
  this.printArrayRepresentationOfBST = printArrayRepresentationOfBST;
  this.checkIdenticalArrayBST = checkIdenticalArrayBST;
  this.getSuccessor = getSuccessor;
  this.getPredecessorAndSuccessor = getPredecessorAndSuccessor;
  this.kthSmallestElement - kthSmallestElement;
  this.getLevelOfNode = getLevelOfNode;
  this.printAncestors = printAncestors;
  this.printInGivenRange = printInGivenRange;
  this.connectNodesAtSameLevel = connectNodesAtSameLevel;
  this.sortedArrayToBalancedBST = sortedArrayToBalancedBST;
  this.convertToSumTree = convertToSumTree;
  this.getVerticalSums = getVerticalSums;
  this.findMaxSumPath = findMaxSumPath;
  this.mergeTwoTrees = mergeTwoTrees;
  this.constructSpecialBT = constructSpecialBT;
  this.doesEachNodeHaveOnlyOneChild = doesEachNodeHaveOnlyOneChild;
  this.isTreeComplete = isTreeComplete;
  this.boundaryTraversal = boundaryTraversal;
  this.fixBSTAfterSwap = fixBSTAfterSwap;
  this.floorAndCeil = floorAndCeil;
  this.morrisTraversal = morrisTraversal;
  this.iterativePostOrder = iterativePostOrder;
  this.existsTripletThatSumsToZero = existsTripletThatSumsToZero;
  this.removeNodesOutsideRange = removeNodesOutsideRange;
  this.areTreesIsomorphic = areTreesIsomorphic;
  this.maxDepthOfOddLevelLeaf = maxDepthOfOddLevelLeaf;
  this.areAllLeafsSameLevel = areAllLeafsSameLevel;
  this.printLeftView = printLeftView;
  this.printRightView = printRightView;
  this.addGreaterValuesToEachNode = addGreaterValuesToEachNode;
  this.removeNodesWhosePathLessThanK = removeNodesWhosePathLessThanK;
  this.extractLeavesToDoublyLinkedList = extractLeavesToDoublyLinkedList;
  this.findDeepestLeftNode = findDeepestLeftNode;
  this.getNextRightNode = getNextRightNode;
  this.sumOfAllNumsFormedFromRootToLeafPaths = sumOfAllNumsFormedFromRootToLeafPaths;
  this.printNodesWithoutSibling = printNodesWithoutSibling;
  this.printVerticalTree = printVerticalTree;
  this.printAlternateLevels = printAlternateLevels;
  this.findMaxPathSumBetweenTwoLeaves = findMaxPathSumBetweenTwoLeaves;
  this.areNodesCousins = areNodesCousins;

  this.segmentTree = segmentTree;
  this.bTree = bTree;
  this.splayTree = this.splayTree;
  this.redBlackTree = redBlackTree;
  this.getRandomBSTNode = getRandomBSTNode;
  this.treeToCircularDoublyLinkedList = treeToCircularDoublyLinkedList;
  this.linkedListToBinaryTree = linkedListToBinaryTree;
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

function getInOrder(node, arr) {
  if (node !== null) {
    this.getInOrder(node.left, arr);
    arr.push(node.data);
    this.getInOrder(node.right, arr);
  }
}

function getPreOrder(node, arr) {
  if (node !== null) {
    arr.push(node.data);
    this.getPreOrder(node.left, arr);
    this.getPreOrder(node.right, arr);
  }
}

function find(data) {
  return _find(this.root, data);
}

function _find(node, data) {
  if (node === null) {
    return false;
  }

  if (data === node.data) {
    return node;
  } else if (data < node.data) {
    return _find(node.left, data);
  } else {
    return _find(node.right, data);
  }
}

function size(node) {
  if (node === null) {
    return 0;
  }

  return 1 + this.size(node.left) + this.size(node.right);
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

/*******************************************************/

// AVL Tree
function AVLNode(data) {
  this.data = data;
  this.left = null;
  this.right = null;
  this.height = 1;  // new Nodes are always inserted at a leaf so it's default height is always 1
}

function AVLTree() {
  this.root = null;
  this.leftRotate = leftRotate;
  this.rightRotate = rightRotate;
  this.AVLInsert = AVLInsert;
  this._AVLInsert = _AVLInsert;
//this.delete = AVLDelete;
//this._delete = _AVLDelete;
  this.AVLGetHeight = AVLGetHeight;
  this.getBalance = getBalance;
  this.AVLPreOrder = AVLPreOrder;
  this.find = find;
  this._find = find;
  this.size = size;
}

function AVLPreOrder(node, arr) {
  if (node !== null) {
    arr.push(node.data);
    this.AVLPreOrder(node.left, arr);
    this.AVLPreOrder(node.right, arr);
  }
}

function leftRotate(node) {
  var rightChild = node.right;

  // perform rotation
  node.right = rightChild.left;
  rightChild.left = node;

  // update root if applicable
  if (node === this.root) {
    this.root = rightChild;
  }

  // update heights
  node.height = Math.max(this.AVLGetHeight(node.left), this.AVLGetHeight(node.right)) + 1;
  rightChild.height = Math.max(this.AVLGetHeight(rightChild.left), this.AVLGetHeight(rightChild.right)) + 1;

  // return new root
  return rightChild;
}

function rightRotate(node) {
  var leftChild = node.left;

  // perform rotation
  node.left = leftChild.right;
  leftChild.right = node;

  // update root if applicable
  if (node === this.root) {
    this.root = leftChild;
  }

  // update heights
  node.height = Math.max(this.AVLGetHeight(node.left), this.AVLGetHeight(node.right)) + 1;
  leftChild.height = Math.max(this.AVLGetHeight(leftChild.left), this.AVLGetHeight(leftChild.right)) + 1;

  // return new root
  return leftChild;
}

// http://www.geeksforgeeks.org/avl-tree-set-1-insertion/
function AVLInsert(data) {
  if (this.root === null) {
    this.root = new AVLNode(data, null, null);
    return;
  }

  this._AVLInsert(this.root, data);
}

function _AVLInsert(node, data) {
  /* 1. Normal BST insertion */
  if (node === null) {
    return new AVLNode(data, null, null);
  }

  if (data < node.data) {
    node.left = this._AVLInsert(node.left, data);
  } else {
    node.right = this._AVLInsert(node.right, data);
  }

  /* 2. Update height of this ancestor node */
  node.height = Math.max(this.AVLGetHeight(node.left), this.AVLGetHeight(node.right)) + 1;

  /* 3. Check balance factor of this Node to check whether this Node became unbalanced with the insertion */
  var balance = this.getBalance(node);

  // 4. If this Node becomes unbalanced, then there are 4 cases (note: a negative balance means that the tree longer on the right):

  // Left Left Case
  if (balance > 1 && data < node.left.data) {
    return this.rightRotate(node);
  }

  // Right Right Case
  if (balance < -1 && data > node.right.data) {
    return this.leftRotate(node);
  }

  // Left Right Case
  if (balance > 1 && data > node.left.data) {
    node.left = this.leftRotate(node.left);
    return this.rightRotate(node);
  }

  // Right Left Case
  if (balance < -1 && data < node.right.data) {
    node.right = this.rightRotate(node.right);
    return this.leftRotate(node);
  }

  // return the (unchanged) node pointer
  return node;
}

// AVL Tree helper fxn. Gets height relative to Node 
function AVLGetHeight(node) {
  if (node === null) {
    return 0;
  }
  return node.height;
}

// AVLTree helper fxn. Gets balance factor of Node N
function getBalance(node) {
  if (node === null) {
    return 0;
  }
  return this.AVLGetHeight(node.left) - this.AVLGetHeight(node.right);
}

// http://www.geeksforgeeks.org/avl-tree-set-2-deletion/
function AVLDelete(data) {
  
}

/*******************************************************/

/* note: not fully tested
function isBST() {
  var dummy = new Node(Infinity, this.root, null);
  return _isBST(this.root, true, false, dummy.data);
}

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
*/

function isBST(node) {
  return this._isBST(node, -Infinity, Infinity);
}

function _isBST(node, min, max) {
  if (node === null) {
    return true;
  }

  // false if node violates min/max constraint
  if (node.data < min || node.data > max) {
    return false;
  }

  return this._isBST(node.left, min, node.data - 1) && this._isBST(node.right, node.data + 1, max);
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

// http://www.geeksforgeeks.org/find-the-largest-subtree-in-a-tree-that-is-also-a-bst/
function getLargestBSTSubTreeSize(node) {
  if (this.isBST(node)) {
    return this.size(node);
  } else {
    return Math.max(this.getLargestBSTSubTreeSize(node.left), this.getLargestBSTSubTreeSize(node.right));
  }
}

// http://www.geeksforgeeks.org/write-c-code-to-determine-if-two-trees-are-identical/
// NOTE: this is O(n^2)
function areTreesIdentical(node1, node2) {
  if (node1 === null && node2 === null) {
    return true;
  }

  if ((node1 === null && node2 !== null) ||
      (node1 !== null && node2 === null) ||
      (node1.data !== node2.data)) {
    return false;
  } else {
    return this.areTreesIdentical(node1.left, node2.left) && this.areTreesIdentical(node1.right, node2.right);
  }
}

function mirror(node1, node2) {
  // 1. both empty
  if (node1 === null && node2 === null) {
    return true;
  }

  // 2. both non-empty
  if (node1 !== null || node2 !== null) {
    return node1.data === node2.data &&
           this.mirror(node1.left, node2.right) &&
           this.mirror(node1.right, node2.left);
  }

  // 3. one empty but other one isn't
  return false;
}

// http://www.geeksforgeeks.org/check-if-a-binary-tree-is-subtree-of-another-binary-tree/
// check if tree2 is a subtree of tree1
function isSubTree(node1, node2) {
  // base cases
  if (node2 === null) {
    return true;
  }
  if (node1 === null) {
    return false;
  }

  // check the tree with root as current node
  if (this.areTreesIdentical(node1, node2)) {
    return true;
  }

  // if the tree with root as current node doesn't match then try left and right subtrees one by one
  return this.isSubTree(node1.left, node2) || this.isSubTree(node1.right, node2);
}

// http://www.geeksforgeeks.org/the-great-tree-list-recursion-problem/
// http://www.geeksforgeeks.org/in-place-convert-a-given-binary-tree-to-doubly-linked-list/
// http://www.geeksforgeeks.org/convert-a-given-binary-tree-to-doubly-linked-list-set-2/
function treeToCircularDoublyLinkedList(tree) {

}

// http://www.geeksforgeeks.org/given-linked-list-representation-of-complete-tree-convert-it-to-linked-representation/
function linkedListToBinaryTree(list) {

}

// http://www.geeksforgeeks.org/given-a-binary-tree-print-out-all-of-its-root-to-leaf-paths-one-per-line/
function printAllPaths() {

}

// http://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-search-tree/
// http://www.geeksforgeeks.org/lowest-common-ancestor-binary-tree-set-1/
function lowestCommonAncestor(tree1, tree2) {

}

// http://www.geeksforgeeks.org/level-order-tree-traversal/
function printByLevel() {

}

// http://www.geeksforgeeks.org/difference-between-sums-of-odd-and-even-levels/
function differenceBetweenOddAndEvenLevelSums() {

}

// http://www.geeksforgeeks.org/get-level-of-a-node-in-a-binary-tree/
function getLevelOfNode(node) {

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

// http://www.geeksforgeeks.org/diameter-of-a-binary-tree/ or http://www.geeksforgeeks.org/maximum-width-of-a-binary-tree/
function getTreeDiameter() {

}

// http://www.geeksforgeeks.org/how-to-determine-if-a-binary-tree-is-balanced/
function isTreeBalanced() {

}

// http://www.geeksforgeeks.org/root-to-leaf-path-sum-equal-to-a-given-number/
function existsPathSum() {

}

// http://www.geeksforgeeks.org/if-you-are-given-two-traversal-sequences-can-you-construct-the-binary-tree/,
// http://www.geeksforgeeks.org/construct-tree-from-given-inorder-and-preorder-traversal/
// http://www.geeksforgeeks.org/full-and-complete-binary-tree-from-given-preorder-and-postorder-traversals/
// http://www.geeksforgeeks.org/construct-bst-from-given-preorder-traversa/
// http://www.geeksforgeeks.org/construct-bst-from-given-preorder-traversal-set-2/
// http://www.geeksforgeeks.org/print-postorder-from-given-inorder-and-preorder-traversals/
// http://www.geeksforgeeks.org/construct-tree-inorder-level-order-traversals/
function recreateTreeGivenTwoTraversals(t1, t2) {

}

// http://www.geeksforgeeks.org/double-tree/
function doubleTree() {

}

// http://www.geeksforgeeks.org/foldable-binary-trees/
function canFold() {

}

// http://www.geeksforgeeks.org/print-nodes-at-k-distance-from-root/ or http://www.geeksforgeeks.org/print-nodes-distance-k-leaf-node/ or http://www.geeksforgeeks.org/print-nodes-distance-k-given-node-binary-tree/
function kDistanceFromRoot() {

}

// http://www.geeksforgeeks.org/sorted-order-printing-of-an-array-that-represents-a-bst/
function printArrayRepresentationOfBST() {

}

// http://www.geeksforgeeks.org/check-for-identical-bsts-without-building-the-trees/
function checkIdenticalArrayBST(arr1, arr2) {

}

// http://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/
function getSuccessor(node) {

}

// http://www.geeksforgeeks.org/inorder-predecessor-successor-given-key-bst/
function getPredecessorAndSuccessor(node) {

}

// http://www.geeksforgeeks.org/find-k-th-smallest-element-in-bst-order-statistics-in-bst/ or http://stackoverflow.com/questions/2329171/find-kth-smallest-element-in-a-binary-search-tree-in-optimum-way/2329236#2329236
function kthSmallestElement(k) {

}

// http://www.geeksforgeeks.org/print-ancestors-of-a-given-node-in-binary-tree/
http://www.geeksforgeeks.org/print-ancestors-of-a-given-binary-tree-node-without-recursion/
function printAncestors(node) {

}

// http://www.geeksforgeeks.org/print-bst-keys-in-the-given-range/
function printInGivenRange(k1, k2) {

}

// http://www.geeksforgeeks.org/connect-nodes-at-same-level/
function connectNodesAtSameLevel() {

}

// http://www.geeksforgeeks.org/sorted-array-to-balanced-bst/
function sortedArrayToBalancedBST(arr) {

}

// http://www.geeksforgeeks.org/vertical-sum-in-a-given-binary-tree/
function getVerticalSums() {

}

// http://www.geeksforgeeks.org/find-the-maximum-sum-path-in-a-binary-tree/
function findMaxSumPath() {

}

// http://www.geeksforgeeks.org/merge-two-bsts-with-limited-extra-space/
function mergeTwoTrees() {

}

// http://www.geeksforgeeks.org/construct-binary-tree-from-inorder-traversal/
// http://www.geeksforgeeks.org/construct-a-special-tree-from-given-preorder-traversal/
function constructSpecialBT() {

}

// http://www.geeksforgeeks.org/check-if-each-internal-node-of-a-bst-has-exactly-one-child/
function doesEachNodeHaveOnlyOneChild() {

}

// http://www.geeksforgeeks.org/check-if-a-given-binary-tree-is-complete-tree-or-not/
function isTreeComplete() {

}

// http://www.geeksforgeeks.org/boundary-traversal-of-binary-tree/
function boundaryTraversal() {

}

// http://www.geeksforgeeks.org/fix-two-swapped-nodes-of-bst/
function fixBSTAfterSwap() {

}

// http://www.geeksforgeeks.org/floor-and-ceil-from-a-bst/
function floorAndCeil() {

}

// http://www.geeksforgeeks.org/morris-traversal-for-preorder/
function morrisTraversal() {

}

// http://www.geeksforgeeks.org/iterative-postorder-traversal-using-stack/ 
function iterativePostOrder() {

}

// http://www.geeksforgeeks.org/find-if-there-is-a-triplet-in-bst-that-adds-to-0/
// http://www.geeksforgeeks.org/find-a-pair-with-given-sum-in-bst/
function existsTripletThatSumsToZero() {

}

// http://www.geeksforgeeks.org/remove-bst-keys-outside-the-given-range/
function removeNodesOutsideRange() {

}

// http://www.geeksforgeeks.org/tree-isomorphism-problem/
function areTreesIsomorphic(tree1, tree2) {
  
}

// http://www.geeksforgeeks.org/find-depth-of-the-deepest-odd-level-node/
function maxDepthOfOddLevelLeaf() {

}

// http://www.geeksforgeeks.org/check-leaves-level/
function areAllLeafsSameLevel() {

}

// http://www.geeksforgeeks.org/print-left-view-binary-tree/
function printLeftView() {

}

// http://www.geeksforgeeks.org/print-right-view-binary-tree-2/
function printRightView() {

}

// http://www.geeksforgeeks.org/add-greater-values-every-node-given-bst/
function addGreaterValuesToEachNode() {

}

// http://www.geeksforgeeks.org/remove-all-nodes-which-lie-on-a-path-having-sum-less-than-k/
function removeNodesWhosePathLessThanK() {

}

// http://www.geeksforgeeks.org/connect-leaves-doubly-linked-list/
function extractLeavesToDoublyLinkedList() {

}

// http://www.geeksforgeeks.org/deepest-left-leaf-node-in-a-binary-tree/
function findDeepestLeftNode() {

}

// http://www.geeksforgeeks.org/find-next-right-node-of-a-given-key/
function getNextRightNode(node) {

}

// http://www.geeksforgeeks.org/sum-numbers-formed-root-leaf-paths/
function sumOfAllNumsFormedFromRootToLeafPaths() {

}

// http://www.geeksforgeeks.org/print-nodes-dont-sibling-binary-tree/
function printNodesWithoutSibling() {

}

// http://www.geeksforgeeks.org/print-binary-tree-vertical-order/
function printVerticalTree() {

}

// http://www.geeksforgeeks.org/reverse-alternate-levels-binary-tree/
function printAlternateLevels() {

}

// http://www.geeksforgeeks.org/find-maximum-path-sum-two-leaves-binary-tree/
function findMaxPathSumBetweenTwoLeaves(leaf1, leaf2) {

}

// http://www.geeksforgeeks.org/check-two-nodes-cousins-binary-tree/
function areNodesCousins(node1, node2) {

}

function getRandomBSTNode() {

}

// http://www.geeksforgeeks.org/convert-a-given-tree-to-sum-tree/
function convertToSumTree() {

}

// http://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/
// http://www.geeksforgeeks.org/segment-tree-set-1-range-minimum-query/
function segmentTree() {

}

// http://www.geeksforgeeks.org/b-tree-set-1-introduction-2/
// http://www.geeksforgeeks.org/b-tree-set-1-insert-2/
// http://www.geeksforgeeks.org/b-tree-set-3delete/
function bTree() {

}

// http://www.geeksforgeeks.org/splay-tree-set-1-insert/
// http://www.geeksforgeeks.org/splay-tree-set-2-insert-delete/
function splayTree() {

}

// http://www.geeksforgeeks.org/red-black-tree-set-1-introduction-2/
// http://www.geeksforgeeks.org/red-black-tree-set-2-insert/
// http://www.geeksforgeeks.org/red-black-tree-set-3-delete-2/
function redBlackTree() {

}

// http://www.geeksforgeeks.org/check-binary-tree-subtree-another-binary-tree-set-2/ O(n) solution for isSubTree
function isSubTree2(tree1, tree2) {
  var inOrder1 = [],
      preOrder1 = [],
      inOrder2 = [],
      preOrder2 = [];

  this.getInOrder(tree1, inOrder1);
  this.getPreOrder(tree1, preOrder1);
  this.getInOrder(tree2, inOrder2);
  this.getPreOrder(tree2, preOrder2);

  /*
TODO: research pattern matching algorithms  
  console.log(inOrder1);
  console.log(preOrder1);
  console.log(inOrder2);
  console.log(preOrder2);
    c,a,x,b
    x,a,c,b

    c,a,x,b,d
    x,a,c,b,d
  */
}

var BinarySearchTree = function() {
  return {
    BinarySearchTree: BST,
    Node: Node,
    AVLTree: AVLTree
  }
}();

module.exports = BinarySearchTree;

// STAR PROBLEMS
// http://www.geeksforgeeks.org/tournament-tree-and-binary-heap/
// http://www.geeksforgeeks.org/find-all-possible-interpretations/
// http://www.geeksforgeeks.org/clone-binary-tree-random-pointers/