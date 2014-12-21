var LinkedList = require('./LinkedList.js');
var Trie = require('./Strings/Trie.js');

function Node(data, left, right) {
  this.data = data;
  this.left = left || null;
  this.right = right || null;
}

Node.prototype = {
  show: function() {
    return this.data;
  }
} 

function BST() {
  this.root = null;

  this.insert = insert;
  this._insert = _insert;
  this.remove = remove;
  this._remove = _remove;
  this.find = find;
  this._find = _find;
  this.BTFind = BTFind;
  this.size = size;
  this.clear = clear;
  this._clear = _clear;
  this.min = min;
  this.max = max;
  this.getInOrder = getInOrder;
  this.iterativeInOrder = iterativeInOrder;
  this.getPreOrder = getPreOrder;

  this.isBST = isBST;
  this._isBST = _isBST;
  this.getHeight = getHeight;
  this._getHeight = _getHeight;
  this.isSubTree = isSubTree;
  this.isSubTree2 = isSubTree2;
  this.getLargestBSTSubTreeSize = getLargestBSTSubTreeSize;
  this.areTreesIdentical = areTreesIdentical;
  this.mirror = mirror;
  this.getMirror = getMirror;
  this.printAllPaths = printAllPaths;
  this.lowestCommonAncestorBST = lowestCommonAncestorBST;
  this.lowestCommonAncestorBT = lowestCommonAncestorBT;
  this.printByLevel = printByLevel;
  this.differenceBetweenOddAndEvenLevelSums = differenceBetweenOddAndEvenLevelSums;
  this.differenceBetweenOddAndEvenLevelSums2 = differenceBetweenOddAndEvenLevelSums2;
  this.printSpiral = printSpiral;
  this.countLeafNodes = countLeafNodes;
  this.doChildrenSumUpToNodeValue = doChildrenSumUpToNodeValue;
  this.getTreeDiameter = getTreeDiameter;
  this.getMaxWidth = getMaxWidth;
  this._getMaxWidth = _getMaxWidth;
  this.isTreeBalanced = isTreeBalanced;
  this.existsPathSum = existsPathSum;
  this.doubleTree = doubleTree;
  this.canFold = canFold;
  this.kDistanceFromRoot = kDistanceFromRoot;
  this.kDistanceFromLeaf = kDistanceFromLeaf;
  this.kDistanceFromNode = kDistanceFromNode;
  this.checkIdenticalArrayBST = checkIdenticalArrayBST;
  this.getSuccessor = getSuccessor;
  this.getPredecessorAndSuccessor = getPredecessorAndSuccessor;
  this.kthSmallestElement = kthSmallestElement;
  this.getLevelOfNode = getLevelOfNode;
  this.printAncestors = printAncestors;
  this.printInGivenRange = printInGivenRange;
  this.sortedArrayToBalancedBST = sortedArrayToBalancedBST;
  this.convertToSumTree = convertToSumTree;
  this.getVerticalSums = getVerticalSums;
  this._getVerticalSums = _getVerticalSums;
  this.findMaxSumPath = findMaxSumPath;
  this.constructSpecialBT = constructSpecialBT;
  this.doesEachNodeHaveOnlyOneChild = doesEachNodeHaveOnlyOneChild;
  this.isTreeComplete = isTreeComplete;
  this.boundaryTraversal = boundaryTraversal;
  this.fixBSTAfterSwap = fixBSTAfterSwap;
  this.ceiling = ceiling;
  this.morrisTraversalInOrder = morrisTraversalInOrder;
  this.morrisTraversalPreOrder = morrisTraversalPreOrder
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
  this.reverseAlternateLevels = reverseAlternateLevels;
  this.findMaxPathSumBetweenTwoLeaves = findMaxPathSumBetweenTwoLeaves;
  this.areNodesCousins = areNodesCousins;
  this.mergeTwoTrees = mergeTwoTrees;
  this.serialize = serialize;
  this.deserialize = deserialize;
  this.recreateFromInOrderAndPreOrder = recreateFromInOrderAndPreOrder;
  this.recreateFromPreOrderAndPostOrder = recreateFromPreOrderAndPostOrder;
  this.recreateFromInOrderAndLevelOrder = recreateFromInOrderAndLevelOrder;
  this.recreateFromInOrder = recreateFromInOrder;
  this.recreateFromPreOrder = recreateFromPreOrder;
  this.canRecreateFromPostOrder = canRecreateFromPostOrder;
  this.postOrderFromInOrderAndPreOrder = postOrderFromInOrderAndPreOrder;

  this.segmentTree = segmentTree;
  this.getRandomBSTNode = getRandomBSTNode;
  this.treeToDoublyLinkedList = treeToDoublyLinkedList;
  this.treeToCircularDoublyLinkedList = treeToCircularDoublyLinkedList;
  this.treeToCircularDoublyLinkedListUtil = treeToCircularDoublyLinkedListUtil;
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

// http://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/
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

/* without using min-max
function isBST2: function(node, prev) {
  if (node === null) {
    return true;
  }

  if (node.data < prev) return false;

  return this.isBST2(node.left, prev) &&
         node.data >= prev &&
         this.isBST2(node.right, node.data);
}*/

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
// NOTE: this is O(n * m) where n is the length of tree1 and m is the length of tree2
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

// check whether or not 2 trees are mirrors of each other
function mirror(node1, node2) {
  // 1. both empty
  if (node1 === null && node2 === null) {
    return true;
  }

  // 2. both non-empty
  if (node1 !== null && node2 !== null) {
    return node1.data === node2.data &&
           this.mirror(node1.left, node2.right) &&
           this.mirror(node1.right, node2.left);
  }

  // 3. one empty but other one isn't
  return false;
}

// modify tree to be its mirror image
function getMirror(source) {
  if (source === null) {
    return null;
  }

  var temp = source.left;
  source.left = source.right;
  source.right = temp;

  getMirror(source.left);
  getMirror(source.right);
}

// http://www.geeksforgeeks.org/check-if-a-binary-tree-is-subtree-of-another-binary-tree/
// Check if tree2 is a subtree of tree1. Algo is O(n*m) where n is the size of the source tree and m is the size of the subtree
// Algorithm: do a preorder traversal and if node1 equals node2, do a subtree comparison
function isSubTree(node1, node2) {
  if (node1 === null) {
    return false;
  }

  if (node1.data === node2.data) {
    return isSubTreeUtil(node1, node2);
  } 

  return isSubTree(node1.left, node2) || isSubTree(node1.right, node2);
}

// helper fxn for isSubTree. Similar to areTreesIdentical but for this algorithm, it's valid for node1 (source tree) to not be null but for node2 to be null
function isSubTreeUtil(node1, node2) {
  if (node2 === null) { // if potential subtree node is null return true
    return true;
  }
  if (node1 === null) { // if we got here, this means that potential subtree is not null but source tree is null so return false
    return false;
  }

  if (node1.data === node2.data) {
    return isSubTreeUtil(node1.left, node2.left) && isSubTreeUtil(node1.right, node2.right);
  } else {
    return false;
  }
}

// http://www.geeksforgeeks.org/check-binary-tree-subtree-another-binary-tree-set-2/ O(n) solution for isSubTree (requires extra space but more efficient than previous)
// note: check if tree2 is a subtree of tree1
// algorithm: get in-order and pre-order traversals for both trees and convert into strings. If tree2's traversals are substrings of tree1's respective traversals, tree2 is a subtree of tree1
function isSubTree2(tree1, tree2) {
  var inOrder1 = [],
      preOrder1 = [],
      inOrder2 = [],
      preOrder2 = [];

  // get respective in-order and pre-order traversal arrays
  this.getInOrder(tree1, inOrder1);
  this.getPreOrder(tree1, preOrder1);
  this.getInOrder(tree2, inOrder2);
  this.getPreOrder(tree2, preOrder2);

  // create a trie for the in-order traversal and pre-order traversal of tree2 (the potential subtree tree)
  if (inOrder1.join('').indexOf(inOrder2.join('')) === -1) {
    return false;
  }
  
  if (preOrder1.join('').indexOf(preOrder2.join('')) === -1) {
    return false;
  }

  /*  
    Tree 1
    In-order: a,c,x,b,z,e,k
    Pre-order: z,x,a,c,b,e,k

    Tree 2
    In-order: c,a,x,b
    Pre-order: x,a,c,b

    [ 'a', 'c', 'x', 'b', 'z', 'e', 'k' ]
    [ 'z', 'x', 'a', 'c', 'b', 'e', 'k' ]
    [ 'a', 'c', 'x', 'b' ]
    [ 'x', 'a', 'c', 'b' ]
  */
  return true;
}

// Apress #64
// http://www.geeksforgeeks.org/in-place-convert-a-given-binary-tree-to-doubly-linked-list/
// http://www.geeksforgeeks.org/convert-a-given-binary-tree-to-doubly-linked-list-set-2/
function treeToDoublyLinkedList(root) {
  var root = treeToDoublyLinkedListUtil(root);

  // traverse to head of newly created doubly linked list
  while (root.left !== null) {
    root = root.left;
  }

  return root;
}

// Helper fxn for treeToDoublyLinkedList
// NOTE: this fxn returns root node. 
function treeToDoublyLinkedListUtil(root) {
  // base case
  if (root === null) {
    return root;
  }

  var leftNode = root.left,
      rightNode = root.right;

  treeToDoublyLinkedListUtil(leftNode);
  treeToDoublyLinkedListUtil(rightNode);

  if (leftNode !== null) {
    while (leftNode.right !== null) {
      leftNode = leftNode.right;
    }

    root.left = leftNode;
    leftNode.right = root;
  }

  if (rightNode !== null) {
    while (rightNode.left !== null) {
      rightNode = rightNode.left;
    }

    root.right = rightNode;
    rightNode.left = root;
  }

  return root;
}

// http://www.geeksforgeeks.org/the-great-tree-list-recursion-problem/
// http://www.geeksforgeeks.org/in-place-convert-a-given-binary-tree-to-doubly-linked-list/
// http://www.geeksforgeeks.org/convert-a-given-binary-tree-to-doubly-linked-list-set-2/
function treeToCircularDoublyLinkedList(root) {
  // base case
  if (root === null) {
    return root;
  }
  
  // convert to DLL using treeToCircularDoublyLinkedListUtil()
  this.treeToCircularDoublyLinkedListUtil(root);

  // treeToCircularDoublyLinkedListUtil returns root node of the converted DLL. Go to the leftmost node to get the head of the newly created list
  while (root.left !== null) {
    root = root.left;
  }
  
  // link last Node to root (NOTE: THESE FOLLOWING 4 LINES ARE THE ONLY DIFFERENCE BETWEEN treeToDoubleLinkedList())
  var current = root;
  while (current.right !== null) {
    current = current.right;
  }
  current.right = root;

  return root;
}

function treeToCircularDoublyLinkedListUtil(node) {
  // base case
  if (node === null) {
    return null;
  }

  // convert left subtree and link to root
  if (node.left !== null) {
    // convert left subtree
    var left = this.treeToCircularDoublyLinkedListUtil(node.left);

    // get the inorder predecessor for the current node
    while (left.right !== null) {
      left = left.right;
    }

    left.right = node;  // make current node the next of the predecessor
    node.left = left;   // make predecessor the previous of the current node
  }

  // convert right subtree and link to root
  if (node.right !== null) {
    // convert right subtree
    var right = this.treeToCircularDoublyLinkedListUtil(node.right);

    // get the inorder successor of the current node
    while (right.left !== null) {
      right = right.left;
    }

    right.left = node;  // set 'right's predecessor to be current node
    node.right = right; // set current nodes successor to be 'right'
  }

  return node;
}

// http://www.geeksforgeeks.org/given-linked-list-representation-of-complete-tree-convert-it-to-linked-representation/
function linkedListToBinaryTree(node) {
  var queue = [],
      root = new Node(node.data);
  queue.push(root);
  node = node.next;

  while (node !== null) {
    var parent = queue.shift(),
        leftChild = null,   // finally an example of why it's important to declare your variables up top. If I don't do this step, if rightChild is set once, it will never be null
        rightChild = null;

    // traverse up to 2 spots in the list to get the current Node's children
    leftChild = new Node(node.data);
    queue.push(leftChild);
    node = node.next;
    if (node !== null) {
      rightChild = new Node(node.data);
      queue.push(rightChild);
      node = node.next;
    }

    parent.left = leftChild;
    parent.right = rightChild;
  }

  return root;
}

// http://www.geeksforgeeks.org/given-a-binary-tree-print-out-all-of-its-root-to-leaf-paths-one-per-line/
function printAllPaths(node, path) {
  if (node === null) {
    return null;
  }

  path.push(node.data);
  var left = this.printAllPaths(node.left, path),
      right = this.printAllPaths(node.right, path);

  if (left === null && right === null) {
    console.log(path);
  }
  path.pop(); // this part ensures that parts of other paths don't get added
}

// http://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-search-tree/
// http://www.geeksforgeeks.org/lowest-common-ancestor-binary-tree-set-1/
function lowestCommonAncestorBST(node1, node2) {
  var current = this.root,
      data1 = node1.data,
      data2 = node2.data;
  
  while (current !== null) {
    if (current.data < data1 && current.data < data2) {
      current = current.right;
    } else if (current.data > data1 && current.data > data2) {
      current = current.left;
    } else {
      return current;
    }
  }

  return null;
}

// algorithm different from lca for Binary Search Trees. We also have to use a different find fxn specific for binary trees
function lowestCommonAncestorBT(node1, node2) {
  if (node1 === null || node2 === null) {
    return null;
  }

  var current = this.root;
  while (current !== null) {
    if (this.BTFind(current.left, node1.data) && this.BTFind(current.left, node2.data)) {
      current = current.left;
    } else if (this.BTFind(current.right, node1.data) && this.BTFind(current.right, node2.data)) {
      current = current.right;
    } else {
      return current;
    }
  }

  return null;
}

// find function specific for binary trees
function BTFind(node, data) {
  if (node === null) {
    return null;
  }

  if (node.data === data) {
    return node;
  }
  return this.BTFind(node.left, data) || this.BTFind(node.right, data); // apparently doing null || Object will return the Object
}

// http://www.geeksforgeeks.org/level-order-tree-traversal/
function printByLevel(root) {
  var currentLevel = [],
      children = [];

  currentLevel.push(root);
  console.log(currentLevel[0].data);

  while (currentLevel.length > 0) {
    for (var i = 0; i < currentLevel.length; i++) {
      var currentNode = currentLevel[i];
      if (currentNode.left) {
        children.push(currentNode.left);
      }
      if (currentNode.right) {
        children.push(currentNode.right);
      }
    }

    var output = '';
    for (i = 0; i < children.length; i++) {
      output += children[i].data + ' ';
    }
    console.log(output.trim());
    currentLevel = children.slice(0);
    children = [];
  }
}

// http://www.geeksforgeeks.org/difference-between-sums-of-odd-and-even-levels/
function differenceBetweenOddAndEvenLevelSums(node) {
  var oddSum = 0,
      evenSum = 0,
      currentLevel = [],
      children = [],
      isOdd = false;

  currentLevel.push(node);
  oddSum += node.data;

  while (currentLevel.length > 0) {
    for (var i = 0; i < currentLevel.length; i++) {
      var currentNode = currentLevel[i];
      if (currentNode.left) {
        children.push(currentNode.left);
      }
      if (currentNode.right) {
        children.push(currentNode.right);
      }
    }

    var childrenSum = 0;
    for (i = 0; i < children.length; i++) {
      childrenSum += children[i].data;
    }

    if (isOdd) {
      oddSum += childrenSum;
    } else {
      evenSum += childrenSum;
    }

    currentLevel = children.slice(0);
    children = [];
    isOdd = !isOdd;
  }
  return oddSum - evenSum;
}

// super elegant and short version of fxn above
function differenceBetweenOddAndEvenLevelSums2(node) {
  if (node === null) {
    return 0;
  }
    
  return node.data - this.differenceBetweenOddAndEvenLevelSums2(node.left) - this.differenceBetweenOddAndEvenLevelSums2(node.right);
}

// http://www.geeksforgeeks.org/get-level-of-a-node-in-a-binary-tree/
function getLevelOfNode(node, data, level) {
  if (node === null) {
    return -1;
  }

  if (node.data === data) {
    return level + 1;
  } else if (data < node.data) {
    return getLevelOfNode(node.left, data, level + 1);
  } else {
    return getLevelOfNode(node.right, data, level + 1);
  }
}

// http://www.geeksforgeeks.org/level-order-traversal-in-spiral-form/
function printSpiral() {
  var currentLevel = [],
      children = [],
      isOdd = false,
      output = '';

  currentLevel.push(this.root);
  output += currentLevel[0].data + ' ';

  while (currentLevel.length > 0) {
    for (var i = 0; i < currentLevel.length; i++) {
      var currentNode = currentLevel[i];
      if (currentNode.left) {
        children.push(currentNode.left);
      }
      if (currentNode.right) {
        children.push(currentNode.right);
      }
    }

    if (isOdd) {
      for (i = children.length - 1; i >= 0; i--) {
        output += children[i].data + ' ';
      }
    } else {
      for (i = 0; i < children.length; i++) {
        output += children[i].data + ' ';
      }
    }

    currentLevel = children.slice(0);
    children = [];
    isOdd = !isOdd;
  }

  return output.trim();
}

// http://www.geeksforgeeks.org/write-a-c-program-to-get-count-of-leaf-nodes-in-a-binary-tree/
function countLeafNodes(node) {
  if (node === null) {
    return 0;
  }

  if (node.left === null && node.right === null) {
    return 1;
  } else {
    return this.countLeafNodes(node.left) + this.countLeafNodes(node.right);
  }
}

// http://www.geeksforgeeks.org/check-for-children-sum-property-in-a-binary-tree/
function doChildrenSumUpToNodeValue(node) {
  // node is null or it's a leaf
  if (node === null || (node.left === null && node.right === null)) {
    return true;
  } else {
    var leftData = 0,
        rightData = 0;

    // if left child is not present then 0 is used as data of left child. Do same for right child
    if (node.left !== null) {
      leftData = node.left.data;
    }
    if (node.right !== null) {
      rightData = node.right.data;
    }

    if ((node.data === leftData + rightData) &&
        this.doChildrenSumUpToNodeValue(node.left) &&
        this.doChildrenSumUpToNodeValue(node.right)) {
      return true;
    } else {
      return false;
    }
  }
}

// http://www.geeksforgeeks.org/how-to-determine-if-a-binary-tree-is-balanced/
// visits every node once but have to keep track of the depth
function isTreeBalanced(node, nodeDepth) {
  if (node === null) {
    return true;
  }

  var left = { depth: 0 },
      right = { depth: 0 };

  if (isTreeBalanced(node.left, left) && isTreeBalanced(node.right, right)) {
    if (Math.abs(left.depth - right.depth) <= 1) {
      nodeDepth.depth = 1 + (left.depth > right.depth ? left.depth : right.depth);
      return true;
    } 
  }

  return false;
}

/* easier but O(n^2)
function isTreeBalanced(node) {
  if (node === null) {
    return true;
  }

  var leftHeight = this._getHeight(node.left),
      rightHeight = this._getHeight(node.right);

  if (Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isTreeBalanced(node.left) && 
      this.isTreeBalanced(node.right)) {
    return true;
  }

  return false;
}*/

/* http://www.geeksforgeeks.org/diameter-of-a-binary-tree/
-diameter doesn't refer to the width per se but the # of nodes on the longest path between 2 leaves on a tree 
The diameter of a tree T is the largest of the following quantities:
* the diameter of T’s left subtree
* the diameter of T’s right subtree
* the longest path between leaves that goes through the root of T (this can be computed from the heights of the subtrees of T) 
-note: the max diameter does not have to go through root
*/
function getTreeDiameter(node) {
  if (node === null) {
    return 0;
  }

  // get height of left and right subtrees
  var leftHeight = this._getHeight(node.left),
      rightHeight = this._getHeight(node.right);

  // get the diameter of the left and right subtrees
  var leftDiameter = this.getTreeDiameter(node.left),
      rightDiameter = this.getTreeDiameter(node.right);

  // return max of the left diameter, right diameter and height of left and right subtree + 1
  return Math.max(leftHeight + rightHeight + 1, Math.max(leftDiameter, rightDiameter));
}

// http://www.geeksforgeeks.org/maximum-width-of-a-binary-tree/
function getMaxWidth(root) {
  var width,
      height = this._getHeight(root),
      count = [],
      level = 0;

  // initialize count array to zeroes
  for (var i = 0; i < height; i++) {
    count[i] = 0;
  }

  // fill the count array using preorder traversal
  this._getMaxWidth(root, count, level);

  count = count.sort(function(a, b) { return a - b; });

  return count[count.length - 1];
}

function _getMaxWidth(node, count, level) {
  if (node) {
    count[level] += 1;
    this._getMaxWidth(node.left, count, level + 1);
    this._getMaxWidth(node.right, count, level + 1);
  }
}

// http://www.geeksforgeeks.org/root-to-leaf-path-sum-equal-to-a-given-number/
// Algorithm: subtract the node value from the sum when recurring down and check to see if the sum is 0 when you run out of tree
function existsPathSum(node, sum) {
  if (node === null) {  // does doesn' seem necessary
    return sum === 0;
  }

  sum -= node.data;

  var result = false;

  if (node.left === null && node.right === null && sum === 0) {
    return true;
  }

  if (node.left !== null) {
    result = result || existsPathSum(node.left, sum);
  }
  if (node.right !== null) {
    result = result || existsPathSum(node.right, sum);
  }

  return result;  
}

/* original which I thought was incorrect but may be correct
function existsPathSum(node, sum, n) {
  if (node === null) {
    return false;
  }

  if (node.left === null && node.right === null) {
    return node.data + sum === n;
  } else {
    return this.existsPathSum(node.left, node.data + sum, n) || this.existsPathSum(node.right, node.data + sum, n);
  }
}*/

// http://www.geeksforgeeks.org/double-tree/
function doubleTree(node) {
  if (node === null) {
    return;
  }

  this.doubleTree(node.left);

  var leftChild = node.left;
  node.left = new Node(node.data);
  node.left.left = leftChild;

  this.doubleTree(node.right);
}

// http://www.geeksforgeeks.org/foldable-binary-trees/
// can also be called isSymmetrical()
function canFold(node1, node2) {  
  if (node1 === null && node2 === null) {
    return true;
  }

  if (node1 === null || node2 === null) {
    return false;
  }

  /* add this clause if the node data should be the same after folding
  if (node1.data !== node2.data) {
    return false;
  }*/

  return canFold(node1.left, node2.right) && canFold(node1.right, node2.left);
}

// http://www.geeksforgeeks.org/print-nodes-at-k-distance-from-root/
function kDistanceFromRoot(node, k, result) {
  if (node === null || k < 0) {
    return;
  }

  if (k === 0) {
    result.push(node.data);
    return;
  } else {
    this.kDistanceFromRoot(node.left, k - 1, result);
    this.kDistanceFromRoot(node.right, k - 1, result);
  }
}

// http://www.geeksforgeeks.org/print-nodes-distance-k-leaf-node/
function kDistanceFromLeaf(node, path, visited, pathLength, k, results) {
  if (node === null) {
    return;
  }

  // update path
  path.push(node.data);
  visited[pathLength] = false;
  pathLength += 1;
  //visited[node.data] = true;

  if (node.left === null && node.right === null && 
     (pathLength - k - 1 >= 0) && !visited[pathLength - k - 1]) {
    results.push(path[pathLength - k - 1]);
    visited[pathLength - k - 1] = true;
    path.pop();
    return;
  } else {
    this.kDistanceFromLeaf(node.left, path, visited, pathLength, k, results);
    this.kDistanceFromLeaf(node.right, path, visited, pathLength, k, results);
  }
  path.pop();
}

// http://www.geeksforgeeks.org/print-nodes-distance-k-given-node-binary-tree/
// to get nodes k distance below node we just use this.kDistanceFromRoot(). For the ancestors, we have to go through
// all the ancestors and find nodes at k - d distance from ancestor
function kDistanceFromNode(root, target, k, result) {
  if (root === null || k < 0) {
    return 0;
  }

  // if target is same as root. Use this.kDistanceFromRoot() to get all nodes at distance k in subtree rooted with target or root
  if (root === target) {
    this.kDistanceFromRoot(root, k, result);
    return 0;
  }

  // recur for left subtree
  var dl = this.kDistanceFromNode(root.left, target, k, result);

  // Check if target node was found in left subtree
  if (dl !== -1) {
    // if root is at distance k from target, node to result (note: dl is distance of root's left child from target)
    if (dl + 1 === k) {
      result.push(root.data);
    } else {  // go to right subtree and print all k - dl - 2 distant nodes (note: right child is 2 edges away from left child). This covers case when target is in left subtree and looking for nodes in right subtree
      this.kDistanceFromRoot(root.right, k - dl - 2, result);
    }

    // add 1 to the distance and return value for parent calls
    return 1 + dl;
  }

  // recur for right subtree. Basically mirror of above. Note that we reach here only when target wasn't found in left subtree
  var dr = this.kDistanceFromNode(root.right, target, k, result);
  if (dr !== -1) {
    if (dr + 1 === k) {
      result.push(root.data);
    } else {
      this.kDistanceFromRoot(root.left, k - dr - 2, result);
    }

    return 1 + dr;
  }

  // If target was neither present in left nor right subtree
  return -1;
}

// http://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/
// this algorithm doesn't need a parent pointer; also, this algorithm only works for binary search trees
// 2 cases we need to handle: if the right child is not null or is null (tricky)
// algorithm if right child is null: start from root. If root's data is greater than node's data, set root as potential successor and then set root to left child.
//  Else, traverse to the right child. Stop when you reach the target node and whatever was marked as successor last is node's successor
function getSuccessor(root, node) {
  // 1st case
  if (node.right !== null) {
    var current = node.right;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // 2nd case
  var successor = null;
  while (root !== null) {
    if (node.data < root.data) {
      successor = root;
      root = root.left;
    } else if (node.data > root.data) {
      root = root.right;
    } else {  // if we get here, that means we reached 'node'
      break;
    }
  }

  return successor;
}

// http://www.geeksforgeeks.org/inorder-predecessor-successor-given-key-bst/
function getPredecessorAndSuccessor(node, pred, succ, data) {
  if (node === null) {
    return;
  }

  // if current node's data is equal to data
  if (node.data === data) {
    // EASY CASES WHEN THE APPROPRIATE CHILDREN AREN'T NULL
    // if node.left does not equal null, predecessor is max of left subtree
    if (node.left !== null) {
      var current = node.left;
      while (current.right !== null) {
        current = current.right;
      }
      pred.data = current.data; // note: I can't do 'pred = current'. In JS I can change the contents but I can't change the reference
    }

    // if node.right does not equal null, successor is min of right subtree
    if (node.right !== null) {
      var current = node.right;
      while (current.left !== null) {
        current = current.left;
      }
      succ.data = current.data;
    }

    return;
  }

  // HARDER CASES WHEN THE APPROPRIATE CHILDREN ARE NULL
  if (node.data < data) {
    pred.data = node.data;
    this.getPredecessorAndSuccessor(node.right, pred, succ, data);
  } else {
    succ.data = node.data;
    this.getPredecessorAndSuccessor(node.left, pred, succ, data);
  }
}

// http://www.geeksforgeeks.org/find-k-th-smallest-element-in-bst-order-statistics-in-bst/ or http://stackoverflow.com/questions/2329171/find-kth-smallest-element-in-a-binary-search-tree-in-optimum-way/2329236#2329236
// -an augmented tree that keeps count of # of children on the left and # of children on the right leads to an O(log n) solution
// -this current solution isn't the most efficient as it requires a stack and it requires iterating through the whole tree. Haven't figured
// out how to cut the iteration early
function kthSmallestElement(node, stack) {
  if (node === null) {
    return;
  }

  this.kthSmallestElement(node.left, stack);
  stack.push(node.data);
  right = this.kthSmallestElement(node.right, stack);
}

// http://www.geeksforgeeks.org/print-ancestors-of-a-given-node-in-binary-tree/
// http://www.geeksforgeeks.org/print-ancestors-of-a-given-binary-tree-node-without-recursion/
// assumes binary tree
function printAncestors(node, target, result) {
  if (node === null) {
    return false;
  }

  if (node === target) {
    return true;
  }

  if (this.printAncestors(node.left, target, result) ||
      this.printAncestors(node.right, target, result)) {
    result.push(node.data);
    return true;
  }

  return false;
}

// http://www.geeksforgeeks.org/print-bst-keys-in-the-given-range/
function printInGivenRange(node, k1, k2, result) {
  if (node === null) {
    return;
  }

  if (node.data >= k1) {
    this.printInGivenRange(node.left, k1, k2, result);
  } 

  if (node.data >= k1 && node.data <= k2) {
    result.push(node.data);
  }

  if (node.data <= k2) {
    this.printInGivenRange(node.right, k1, k2, result);
  } 
}

// http://www.geeksforgeeks.org/sorted-array-to-balanced-bst/
function sortedArrayToBalancedBST(arr, lo, hi) {
  if (hi < lo) {
    return null;
  }

  var mid = Math.floor((lo + hi) / 2),
      root = new Node(arr[mid]);

  root.left = this.sortedArrayToBalancedBST(arr, lo, mid - 1);
  root.right = this.sortedArrayToBalancedBST(arr, mid + 1, hi);

  return root;
}

// http://www.geeksforgeeks.org/vertical-sum-in-a-given-binary-tree/
function getVerticalSums(root, map) {
  if (root === null) {
    return;
  }

  var horizontalDistance = 0;
  this._getVerticalSums(root, horizontalDistance, map);

  //var sortedKeys = Object.keys(map).sort(function(a, b) { return a - b; });
}

function _getVerticalSums(root, horizontalDistance, map) {
  if (root === null) {
    return;
  }

  // store the values in map for left subtree
  this._getVerticalSums(root.left, horizontalDistance - 1, map);

  // update vertical sum for horizontal distance for this node
  var previousSum = (!map[horizontalDistance]) ? 0 : map[horizontalDistance];
  map[horizontalDistance] = previousSum + root.data;

  // store the values in map for right subtree
  this._getVerticalSums(root.right, horizontalDistance + 1, map);
}

// http://www.geeksforgeeks.org/find-the-maximum-sum-path-in-a-binary-tree/
function findMaxSumPath(node, sum) {
  if (node === null) {
    return 0;
  }

  if (node.left === null && node.right === null) {
    return sum + node.data;
  }
  return Math.max(this.findMaxSumPath(node.left, sum + node.data), this.findMaxSumPath(node.right, sum + node.data));
}

// http://www.geeksforgeeks.org/check-if-a-given-binary-tree-is-complete-tree-or-not/
// algorithm: use level order and once you encounter a node that has no children, all the rest must have no children
// -there is a condition that if a node has a left child but no right child, the rest of the nodes on that level must not have any children
function isTreeComplete(root) {
  if (root === null) {
    return false;
  }

  var currentLevel = [],
      children = [],
      noMoreChildren = false;

  currentLevel.push(root);
  while (currentLevel.length > 0) {
    for (var i = 0; i < currentLevel.length; i++) {
      if (currentLevel[i].left) {
        if (noMoreChildren) {
          return false;
        }

        children.push(currentLevel[i].left);
      } else { 
        noMoreChildren = true;
      }

      if (currentLevel[i].right) {
        if (noMoreChildren) {
          return false;
        }

        children.push(currentLevel[i].right);
      } else {
        noMoreChildren = true;
      }
    }

    currentLevel = children.slice(0);
    children = [];
  }

  return true;
}

// http://www.geeksforgeeks.org/boundary-traversal-of-binary-tree/
// 3 parts: left boundary, leaves and right boundary. Following algorithm prints counter-clockwise
function boundaryTraversal(root) {
  console.log(root.data);

  // print left boundary
  var current = root.left;
  while (current) {
    console.log(current.data);
    current = current.left;
  }

  // get leaves
  var leaves = [];
  getLeaves(root, leaves);
  leaves.shift();
  leaves.pop();
  for (var i = 0; i < leaves.length; i++) {
    console.log(leaves[i]);
  }

  // print right boundary
  current = root.right;
  var queue = [];
  while (current) {
    queue.unshift(current.data);
    current = current.right;
  }
  for (i = 0; i < queue.length; i++) {
    console.log(queue[i]);
  }
}

// helper fxn for boundaryTraversal() that adds leaves to an array
function getLeaves(node, leaves) {
  if (node === null) {
    return;
  }

  if (node.left === null && node.right === null) {
    leaves.push(node.data);
  }

  getLeaves(node.left, leaves);
  getLeaves(node.right, leaves);
}

// http://www.geeksforgeeks.org/floor-and-ceil-from-a-bst/
// this has tricky logic. Less efficient fallback algorithm would be to convert tree to a sorted Array and iterate to find floor and ceiling values
function ceiling(node, n) {
  if (node === null) {
    return -1;
  }

  // we found equal key
  if (node.data === n) {
    return n;
  }
  
  // if root's key is smaller, ceiling must be in right subtree
  if (node.data < n) {
    return this.ceiling(node.right, n);
  }

  // else, either left subtree or root has the ceiling value (these 2 lines are the tricky part)
  var ceil = this.ceiling(node.left, n);
  return (ceil >= n) ? ceil : node.data;
}

// http://www.geeksforgeeks.org/find-if-there-is-a-triplet-in-bst-that-adds-to-0/
// http://www.geeksforgeeks.org/find-a-pair-with-given-sum-in-bst/
function existsTripletThatSumsToZero(root) {
  // convert tree into an array
  var arr = [];
  BSTToArray(root, arr);
  
  var length = arr.length;
  for (var i = 0; i < length; i++) {
    if (hasArrayTwoCandidates(arr, -arr[i])) {
      return true;
    }
  }

  return false;
}

// helper fxn for existsTripletThatSumsToZero that converts a BST to an ordered array
function BSTToArray(node, arr) {
  if (node === null) {
    return;
  }

  BSTToArray(node.left, arr);
  arr.push(node.data);
  BSTToArray(node.right, arr);
}

// helper fxn for existsTripletThatSumsToZero to determines if there are two values in array that sum up to n
function hasArrayTwoCandidates(arr, n) {
  var lo = 0,
      hi = arr.length - 1;

  while (hi > lo) {
    var tempSum = arr[lo] + arr[hi];
    if (tempSum === n) {
      return true;
    } else if (tempSum > n) {
      hi -= 1;
    } else if (tempSum < n) {
      lo += 1;
    }
  }
  return false;
}
// http://www.geeksforgeeks.org/remove-bst-keys-outside-the-given-range/
function removeNodesOutsideRange(node, min, max) {
  if (node === null) {
    return null;
  }

  // first fix the left and right subtrees of node
  node.left = this.removeNodesOutsideRange(node.left, min, max);
  node.right = this.removeNodesOutsideRange(node.right, min, max);
  
  // fix the root. 2 cases: 
  // 1A: Node's data is smaller than min value
  if (node.data < min) {
    var rightChild = node.right;
    delete node;
    return rightChild;
  }

  // 1B: Node's data is greater than max value
  if (node.data > max) {
    var leftChild = node.left;
    delete node;
    return leftChild;
  }

  // 2. Node is in range (do nothing)
  return node;
}

// http://www.geeksforgeeks.org/tree-isomorphism-problem/
function areTreesIsomorphic(n1, n2) {
  // both nodes are null, trees isomorphic by definition
  if (n1 === null && n2 === null) {
    return true;
  }

  // exactly one of the n1 and n2 is null, trees not isomorphic
  if (n1 === null || n2 === null) {
    return false;
  }

  // nodes data aren't equal. Return false
  if (n1.data !== n2.data) {
    return false;
  }

  /* There are 2 possible cases for n1 and n2 to be isomorphic:
     Case 1: the subtrees rooted at these nodes have NOT been 'flipped'. Both of these
             subtrees have to be isomorphic hence the '&&'
     Case 2: the subtrees rooted at these nodes have been 'flipped' */
  return (this.areTreesIsomorphic(n1.left, n2.left) && this.areTreesIsomorphic(n1.right, n2.right)) ||
         (this.areTreesIsomorphic(n1.left, n2.right) && this.areTreesIsomorphic(n1.right, n2.left));
}

// http://www.geeksforgeeks.org/find-depth-of-the-deepest-odd-level-node/
function maxDepthOfOddLevelLeaf(node, level) {
  if (node === null) {
    return 0;
  }

  if (level % 2 === 1 && node.left === null && node.right === null) {
    return level;
  } else {
    return Math.max(this.maxDepthOfOddLevelLeaf(node.left, level + 1), this.maxDepthOfOddLevelLeaf(node.right, level + 1));
  }
}

// http://www.geeksforgeeks.org/check-leaves-level/
// algorithm: first get the level of the leftmost leaf and store the value. From here, iterate through tree and compare to the stored level
// note: may be able to refactor this as I figured in printLeftView a way to get around not being able to pass primitives by reference
function areAllLeafsSameLevel(root, level) {
  var level = getInitialLeafLevel(root, 1);
  return _areAllLeafsSameLevel(root, 1, level);
}

function getInitialLeafLevel(node, level) {
  if (node === null) {
    return;
  }

  if (node.left === null && node.right === null) {
    return level;
  } else {
    return getInitialLeafLevel(node.left, level + 1) || getInitialLeafLevel(node.right, level + 1);
  }
}

function _areAllLeafsSameLevel(node, level, savedLevel) {
  if (node === null) {
    return true;
  }

  if (node.left === null && node.right === null) {
    return level === savedLevel;
  }
    
  return _areAllLeafsSameLevel(node.left, level + 1, savedLevel) &&
         _areAllLeafsSameLevel(node.right, level + 1, savedLevel);
}

// http://www.geeksforgeeks.org/print-left-view-binary-tree/
function printLeftView(root) {
  var maxLevel = { level: 0 };  // hack since we can't pass primitives by reference
  _printLeftView(root, 1, maxLevel);
}

function _printLeftView(node, level, maxLevel) {
  if (node === null) {
    return;
  }

  if (level > maxLevel.level) {
    console.log(node.data);
    maxLevel.level = level;
  }
  _printLeftView(node.left, level + 1, maxLevel);
  _printLeftView(node.right, level + 1, maxLevel);
}

// http://www.geeksforgeeks.org/print-right-view-binary-tree-2/
// similar to printLeftView but the trick is to visit the right Node before the left Node
function printRightView(root) {
  var maxLevel = { level: 0 };
  _printRightView(root, 1, maxLevel);
}

function _printRightView(node, level, maxLevel) {
if (node === null) {
    return;
  }

  if (level > maxLevel.level) {
    console.log(node.data);
    maxLevel.level = level;
  }
  _printRightView(node.right, level + 1, maxLevel);
  _printRightView(node.left, level + 1, maxLevel);
}

// http://www.geeksforgeeks.org/add-greater-values-every-node-given-bst/
function addGreaterValuesToEachNode(node, cumulativeSum) {
  if (node === null) {
    return;
  }

  this.addGreaterValuesToEachNode(node.right, cumulativeSum);

  node.data = node.data + cumulativeSum.sum;
  cumulativeSum.sum = node.data;

  this.addGreaterValuesToEachNode(node.left, cumulativeSum);
}

// http://www.geeksforgeeks.org/connect-leaves-doubly-linked-list/
// didn't do this recursively as I can't change the reference to what head points to
function extractLeavesToDoublyLinkedList(root) {
  var currentLevel = [],
      children = [],
      dummyHead = new Node(),
      head = dummyHead;

  currentLevel.push(root);
  while (currentLevel.length > 0) {
    for (var i = 0; i < currentLevel.length; i++) {
      var current = currentLevel[i];
      
      // if left child is a leaf, remove from tree and add to list. Else if left child isn't null, add left child to children
      if (isLeaf(current.left)) {
        head.right = current.left;
        current.left.left = head;
        head = head.right;
        current.left = null;
      } else if (current.left !== null) {
        children.push(current.left);
      }

      // if right child is a leaf, remove from tree and add to list. Else if right child isn't null, add right child to children
      if (isLeaf(current.right)) {
        head.right = current.right;
        current.right.left = head;
        head = head.right;
        current.right = null;
      } else if (current.right !== null) {
        children.push(current.right);
      }
    }

    currentLevel = children.slice(0);
    children = [];
  }

  return dummyHead.right;
}

function isLeaf(node) {
  if (node === null) {
    return false;
  }

  if (node.left === null && node.right === null) {
    return true;
  }
}

// http://www.geeksforgeeks.org/deepest-left-leaf-node-in-a-binary-tree/
function findDeepestLeftNode(node, level, isLeftChild, maxLevel) {
  if (node === null) {
    return;
  }

  if (isLeftChild && level > maxLevel.level) {
    maxLevel.level = level;
  }

  this.findDeepestLeftNode(node.left, level + 1, true, maxLevel);
  this.findDeepestLeftNode(node.right, level + 1, false, maxLevel);
}

// http://www.geeksforgeeks.org/find-next-right-node-of-a-given-key/
function getNextRightNode(root, k) {
  var currentLevel = [],
      children = [],
      checkRight = false;;

  currentLevel.push(root);
  while (currentLevel.length > 0) {
    for (var i = 0; i < currentLevel.length; i++) {
      var current = currentLevel[i];
      if (current.left) {
        if (current.left.data === k) {
          checkRight = true;
        }
        children.push(current.left);
      }

      if (current.right) {
        if (current.right.data === k) {
          checkRight = true;
        }
        children.push(current.right);
      }
    }

    if (checkRight) {
      for (i = 0; i < children.length; i++) {
        if (children[i].data === k) {
          if (i === (children.length - 1)) {  // we're at end of list so no element to the right. Return null
            return null;
          } else {
            return children[i + 1].data;
          }
        }
      }
    }

    currentLevel = children.slice(0);
    children = [];
  }
}

// http://www.geeksforgeeks.org/sum-numbers-formed-root-leaf-paths/
function sumOfAllNumsFormedFromRootToLeafPaths(node, path, result) {
  if (node === null) {
    return;
  }

  path.push(node.data);
  if (node.left === null && node.right === null) {  // we are at a leaf so get the # created by the path and push to 'result'
    result.sum += parseInt(path.join(''), 10);
  }

  this.sumOfAllNumsFormedFromRootToLeafPaths(node.left, path, result);
  this.sumOfAllNumsFormedFromRootToLeafPaths(node.right, path, result);
  path.pop();
}

// http://www.geeksforgeeks.org/print-nodes-dont-sibling-binary-tree/
function printNodesWithoutSibling(node, result) {
  if (node === null) {
    return;
  }

  if (node.left === null && node.right !== null) {
    result.push(node.right.data);
  }

  if (node.left !== null && node.right === null) {
    result.push(node.left.data);
  }

  this.printNodesWithoutSibling(node.left, result);
  this.printNodesWithoutSibling(node.right, result);
}

// http://www.geeksforgeeks.org/print-binary-tree-vertical-order/
function printVerticalTree(node, horizontalDistance, map) {
  if (node === null) {
    return;
  }

  if (!map[horizontalDistance]) {
    map[horizontalDistance] = [node.data];
  } else {
    map[horizontalDistance].push(node.data);
  }

  this.printVerticalTree(node.left, horizontalDistance - 1, map);
  this.printVerticalTree(node.right, horizontalDistance + 1, map);
}

// http://www.geeksforgeeks.org/reverse-alternate-levels-binary-tree/
// assumption: this is a perfect binary tree
function reverseAlternateLevels(root) {
  var currentLevel = [],
      children = [],
      level = 1;

  currentLevel.push(root);
  while (currentLevel.length > 0) {
    for (var i = 0; i < currentLevel.length; i++) {
      var current = currentLevel[i];

      if (current.left) {
        children.push(current.left);
      }

      if (current.right) {
        children.push(current.right);
      }
    }

    // if even level, reverse nodes
    var childLevel = level + 1; // tricky detail: child level is 1 plus the current level number
    if ((childLevel % 2) !== 0) {
      var lo = 0,
          hi = children.length - 1;
      while (hi > lo) {
        var temp = children[lo].data;
        children[lo].data = children[hi].data;
        children[hi].data = temp;
        lo += 1;
        hi -= 1;
      }
    }

    currentLevel = children.slice(0);
    children = [];
    level += 1;
  }

  this.printByLevel(root);
}

// http://www.geeksforgeeks.org/check-two-nodes-cousins-binary-tree/
function areNodesCousins(root, node1, node2) {
  var currentLevel = [],
      children = [],
      parent1 = null,
      parent2 = null,
      check = false;

  currentLevel.push(root);
  while (currentLevel.length > 0) {
    for (var i = 0; i < currentLevel.length; i++) {
      var current = currentLevel[i];

      if (current.left) {
        if (current.left.data === node1) {
          parent1 = current;
          check = true;
        } else if (current.left.data === node2) {
          parent2 = current;
          check = true;
        }

        children.push(current.left);
      }

      if (current.right) {
        if (current.right.data === node1.data) {
          parent1 = current;
          check = true;
        } else if (current.right.data === node2.data) {
          parent2 = current;
          check = true;
        }

        children.push(current.right);
      }
    }

    if (check) {
      return ((parent1 !== parent2) && (parent1 !== null) && (parent2 !== null));
    }

    currentLevel = children.slice(0);
    children = [];
  }

  return false;
}

// http://www.geeksforgeeks.org/convert-a-given-tree-to-sum-tree/
function convertToSumTree(node) {
  if (node === null) {
    return 0;
  }

/* less efficient but simpler algorithm
  node.data = sumTree(node.left) + sumTree(node.right);
  this.convertToSumTree(node.left);
  this.convertToSumTree(node.right);
*/
  
  // more efficient algorithm
  var oldValue = node.data;
  node.data = this.convertToSumTree(node.left) + this.convertToSumTree(node.right);
  return node.data + oldValue;
}

function sumTree(node) {
  if (node === null) {
    return 0;
  }

  return node.data + sumTree(node.left) + sumTree(node.right);
}

// http://www.geeksforgeeks.org/if-you-are-given-two-traversal-sequences-can-you-construct-the-binary-tree/
// http://www.geeksforgeeks.org/construct-tree-from-given-inorder-and-preorder-traversal/
// the trick is to keep a pointer to the preOrderIndex which you increment by one in each call
function recreateFromInOrderAndPreOrder(inOrder, preOrder, lo, hi, preOrderIndex) {
  if (hi < lo) {
    return null;
  }

  var root = new Node(preOrder[preOrderIndex.index]);   // root is always the left-most element within a subarray
  preOrderIndex.index += 1;

  // search for root in in-order to see where to split the tree
  var splitIndex = inOrder.indexOf(root.data);
  root.left = this.recreateFromInOrderAndPreOrder(inOrder, preOrder, lo, splitIndex - 1, preOrderIndex);
  root.right = this.recreateFromInOrderAndPreOrder(inOrder, preOrder, splitIndex + 1, hi, preOrderIndex);

  return root;
}

// http://www.geeksforgeeks.org/full-and-complete-binary-tree-from-given-preorder-and-postorder-traversals/
// assumption: this is a complete tree. No ambiguity if the tree is complete (a binary tree whose nodes either have zero or 2 children)
// similar to recreateFromInOrderAndPreOrder but we split on root's left child and the tricky part is the conditional (splitIndex <= hi)
function recreateFromPreOrderAndPostOrder(preOrder, postOrder, lo, hi, preOrderIndex) {
  if (hi < lo || preOrderIndex.index === preOrder.length) {
    return null;
  }

  var root = new Node(preOrder[preOrderIndex.index]);
      rootLeftChildData = preOrder[++preOrderIndex.index];

  // in postOrder, everything to the left of an index is in the left subtree
  var splitIndex = postOrder.indexOf(rootLeftChildData);

  // Use the index of element found in postorder to divide postorder array in two parts. Left subtree and right subtree
  if (splitIndex <= hi) { // must have this conditional
    root.left = this.recreateFromPreOrderAndPostOrder(preOrder, postOrder, lo, splitIndex, preOrderIndex);
    root.right = this.recreateFromPreOrderAndPostOrder(preOrder, postOrder, splitIndex + 1, hi, preOrderIndex);
  }
  return root;
}

// *** http://www.geeksforgeeks.org/construct-tree-inorder-level-order-traversals/
function recreateFromInOrderAndLevelOrder(inOrder, levelOrder, lo, hi) {
  if (hi < lo) {
    return null;
  }

  var root = new Node(levelOrder[lo]),
      splitIndex = inOrder.indexOf(root.data);
  
  // extract left subtree keys from level order traversal
  var leftLevel = extractKeys(inOrder, levelOrder, splitIndex, inOrder.length);

  // extract right subtree keys from level order traversal
  var rightLevel = extractKeys(inOrder, levelOrder, hi - splitIndex - 1, inOrder.length);
    
  root.left = this.recreateFromInOrderAndLevelOrder(inOrder, leftLevel, lo, splitIndex - 1);
  root.right = this.recreateFromInOrderAndLevelOrder(inOrder, rightLevel, splitIndex + 1, hi);

  return root;
}

// helper fxn for recreateFromInOrderAndLevelOrder
function extractKeys(inOrder, levelOrder, lo, hi) {
  var newLevel = [];
  for (var i = 0; i < hi; i++) {
    if(inOrder.indexOf(levelOrder[i]) !== -1) {
      newLevel.push(levelOrder[i]);
    }
  }

  return newLevel;
}

// http://www.geeksforgeeks.org/construct-binary-tree-from-inorder-traversal/
// assumption: special binary tree where the root data is greater than all the nodes of its left and right children
function recreateFromInOrder(inOrder, lo, hi) {
  if (hi < lo) {
    return null;
  }

  // get max index within range
  var max = inOrder[lo],
      maxIndex = lo;
  for (var i = lo + 1; i <= hi; i++) {
    if (inOrder[i] > max) {
      max = inOrder[i];
      maxIndex = i;
    }
  }

  var root = new Node(inOrder[maxIndex]);
  root.left = this.recreateFromInOrder(inOrder, lo, maxIndex - 1);
  root.right = this.recreateFromInOrder(inOrder, maxIndex + 1, hi);

  return root;
}

// http://www.geeksforgeeks.org/construct-a-special-tree-from-given-preorder-traversal/
// special tree in this case is a complete tree
function constructSpecialBT(preOrder, preLN, preOrderIndex) {
  if (preOrderIndex === preOrder.length) {
    return null;
  }

  var currentIndex = preOrderIndex.index,
      root = new Node(preOrder[currentIndex]);
  preOrderIndex.index += 1;

  if (preLN[currentIndex] === 'L') {
    return root;
  } else {
    root.left = this.constructSpecialBT(preOrder, preLN, preOrderIndex);
    root.right = this.constructSpecialBT(preOrder, preLN, preOrderIndex);
  }

  return root;
}

// http://www.geeksforgeeks.org/construct-bst-from-given-preorder-traversa/
// http://www.geeksforgeeks.org/construct-bst-from-given-preorder-traversal-set-2/
function recreateFromPreOrder(preOrder, lo, hi) {
  if (hi < lo) {
    return null;
  }

  var root = new Node(preOrder[lo]),
      leftLo = lo + 1,
      temp = leftLo;

  while (preOrder[temp] < root.data && temp !== preOrder.length) {
    temp += 1;
  }
  root.left = this.recreateFromPreOrder(preOrder, leftLo, temp - 1);
  root.right = this.recreateFromPreOrder(preOrder, temp, hi);

  return root;
}

// Apress #63
function canRecreateFromPostOrder(arr) {
  if (arr.length === 0) {
    return true;
  }

  var root = arr[arr.length - 1], // since this is a post-order array, root is always right-most element
      i = 0;

  // starting from the beginning of the array, keep iterating until you hit an element that is greater than the root element
  while (arr[i] < root) {
    i += 1;
  }

  var leftSubtree = arr.slice(0, i),
      rightSubTree = arr.slice(i, arr.length - 1);  // '- 1' as we don't want the last element which is the root
  
  // check to see if any #'s in the right subtree are less than root
  var length = rightSubTree.length;
  for (i = 0; i < length; i++) {
    if (rightSubTree[i] < root) {
      return false;
    }
  }

  return canRecreateFromPostOrder(leftSubtree) && canRecreateFromPostOrder(rightSubTree);
}

// http://www.geeksforgeeks.org/print-postorder-from-given-inorder-and-preorder-traversals/
function postOrderFromInOrderAndPreOrder(inOrder, preOrder, lo, hi, preOrderIndex, result) {
  if (hi < lo) {
    return;
  }

  // the first element in preOrder is always root. Search element in inOrder to find left and right subtrees
  var splitIndex = inOrder.indexOf(preOrder[preOrderIndex.index]);
  preOrderIndex.index += 1;

  // if left subtree is not empty, print left subtree
  this.postOrderFromInOrderAndPreOrder(inOrder, preOrder, lo, splitIndex - 1, preOrderIndex, result);
  this.postOrderFromInOrderAndPreOrder(inOrder, preOrder, splitIndex + 1, hi, preOrderIndex, result);

  result.push(inOrder[splitIndex]);
}

// http://www.geeksforgeeks.org/check-if-each-internal-node-of-a-bst-has-exactly-one-child/
function doesEachNodeHaveOnlyOneChild(preOrder) {
  var length = preOrder.length,
      min = -Infinity,
      max = Infinity;

  for (var i = 1; i < length; i++) {
    if (preOrder[i] < preOrder[i - 1] && preOrder[i] > min) {
      max = preOrder[i - 1];
    } else if (preOrder[i] > preOrder[i - 1] && preOrder[i] < max) {
      min = preOrder[i - 1];
    } else {
      return false;
    }
  }

  return true;
}

// http://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion/
// http://leetcode.com/2010/04/binary-search-tree-in-order-traversal.html
function iterativeInOrder(root) {
  var stack = [];
  current = root;
  while (stack.length > 0 || current) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      current = stack[stack.length - 1];
      stack.pop();
      console.log(current.data);
      current = current.right;
    }
  }
}

// 
function morrisTraversalInOrder() {

}

// http://www.geeksforgeeks.org/morris-traversal-for-preorder/
function morrisTraversalPreOrder() {

}

// http://www.geeksforgeeks.org/iterative-postorder-traversal-using-stack/ 
function iterativePostOrder() {

}

// http://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/
// http://www.geeksforgeeks.org/segment-tree-set-1-range-minimum-query/
function segmentTree() {

}

// Note: BSTToArray just puts the data into an Array not the actual Node. To be correct, BSTToArray variation should add the Node itself
function getRandomBSTNode(root) {
  var arr = [];
  BSTToArray(root, arr);
  return arr[Math.floor(Math.random() * arr.length)];
}

// *** http://www.geeksforgeeks.org/merge-two-bsts-with-limited-extra-space/
function mergeTwoTrees(root1, root2) {
  // convert both trees into doubly linked lists
  root1 = this.treeToDoublyLinkedList(root1);
  root2 = this.treeToDoublyLinkedList(root2);

  return mergeTwoConvertedLists(root1, root2);  // return a merged doubly linked list
}

// helper function for mergeTwoTrees. Since the conversion fxn from a tree to a list uses 'left' instead of 'previous' and 'right' instead of 'next', 
function mergeTwoConvertedLists(list1, list2) {
  var dummyHead = new Node(),
      current = dummyHead;

  while (list1 !== null && list2 !== null) {
    if (list1.data < list2.data) {
      current.right = list1;
      list1 = list1.right;
    } else {
      current.right = list2;
      list2 = list2.right;
    }
    current = current.right;
  }

  current.right = (list1 !== null) ? list1 : list2;
  
  return dummyHead.right;  
}

// http://www.geeksforgeeks.org/serialize-deserialize-binary-tree/ or Apress #62
// note: to serialize, do a preorder traversal
function serialize(result, node) {
  if (node === null) {
    result.str += '$,';
    return;
  }

  result.str += node.data + ',';
  serialize(result, node.left);
  serialize(result, node.right);
}

function deserialize(str) {
  if (str.str.length === 0 || str.str[0] === '$') {
    return null;
  }

  var node = new Node(parseInt(str.str[0]));

  str.str = str.str.substring(1);
  node.left = deserialize(str);
  str.str = str.str.substring(1);
  node.right = deserialize(str);

  return node;
}

// *** http://www.geeksforgeeks.org/fix-two-swapped-nodes-of-bst/
// naive: a simple method is to store inorder traversal of the input tree in an auxiliary array. Sort the auxiliary array. Finally, insert the 
//  auxiilary array elements back to the BST, keeping the structure of the BST same. Time complexity of this method is O(nLogn) and auxiliary space needed is O(n).
// -tricky part is that there are 2 situations: swapped nodes are adjacent in inOrder BST and swapped nodes are not adjacent in inOrder BST
function fixBSTAfterSwap(root) {
  // have to pass these as objects so I can pass them as references
  var previous = { node: null },
        first = { node: null },
        middle = { node: null },
        last = { node: null };

  fixBSTAfterSwapUtil(root, previous, first, middle, last);

  // fix tree
  if (first.node && last.node) {
    var temp = first.node.data;
    first.node.data = last.node.data;
    last.node.data = temp;
  } else if (first.node && middle.node) { // adjacent nodes swapped
    var temp = first.node.data;
    first.node.data = middle.node.data;
    middle.node.data = temp;
  }
}

function fixBSTAfterSwapUtil(root, previous, first, middle, last) {
  if (root === null) {
    return;
  }

  fixBSTAfterSwapUtil(root.left, previous, first, middle, last);

  // if this node is smaller than the previous node, it's violating the BST rule
  if (previous.node !== null && previous.node.data > root.data) {
    // if this is the first violation, mark these 2 nodes as 'first' and 'middle'
    if (first.node === null) {
      first.node = previous.node;
      middle.node = root;
    } else {  // if this is the 2nd violation, mark this node as last
      last.node = root;
    }
  }

  previous.node = root; // mark the current node as previous before recurring to the right subtree
  
  fixBSTAfterSwapUtil(root.right, previous, first, middle, last);
}

// *** http://www.geeksforgeeks.org/remove-all-nodes-which-lie-on-a-path-having-sum-less-than-k/
// trick is to work bottom up and to delete a node only when it's a leaf
// NOTE: not quite working. May have something to do with me not knowing how to properly delete an object
function removeNodesWhosePathLessThanK(node, k, cumulativeSum) {
  if (node === null) {
    return null;
  }

  // initialize left and right sums as sum from root to this node (including this node)
  var leftSum = cumulativeSum.sum + node.data,
      rightSum = leftSum;

  cumulativeSum.sum += node.data;

  // recursively prune left and right subtrees
  node.left = this.removeNodesWhosePathLessThanK(node.left, k, cumulativeSum);
  node.right = this.removeNodesWhosePathLessThanK(node.right, k, cumulativeSum);

  // get the max of left and right sums
  cumulativeSum.sum = Math.max(leftSum, rightSum);

  // If max is smaller than k and is a leaf, then this node must be deleted
  if (!node.left && !node.right && cumulativeSum.sum < k) {
    node = null;
  }

  return node;
}

// *** http://www.geeksforgeeks.org/find-maximum-path-sum-two-leaves-binary-tree/
// given a tree, find the max path sum between any leaf in the tree I initially thought it was given 2 leafs, what is the maximum path
// sum between the 2 leaves. Apparently that's just the leaves lowest common ancestor and get the sum of the value of the path of the first 
// leaf + the ancestor data + the sum of the path to the second leaf
function findMaxPathSumBetweenTwoLeaves(node, maxPath) {
  if (node === null) {
    return 0;
  }

  // Find max sum in the left and right subtree. Also find max root to leaf sums in left and right subtrees and store
  // in lLPSum and rLPSum
  var lLPSum = this.findMaxPathSumBetweenTwoLeaves(node.left, maxPath),
      rLPSum = this.findMaxPathSumBetweenTwoLeaves(node.right, maxPath);

  // Find the max path sum passing through root
  var currentSum = Math.max((lLPSum + node.data + rLPSum), Math.max(lLPSum, rLPSum));   // would 'var currentSum = lLPSum + node.data + rLPSum;' wor by itself?

  // Update maxPath if needed
  if (maxPath.sum < currentSum) {
    maxPath.sum = currentSum;
  }

  return Math.max(lLPSum, rLPSum) + node.data;
}

// *** http://www.geeksforgeeks.org/check-for-identical-bsts-without-building-the-trees/
function checkIdenticalArrayBST(arr1, arr2) {

}

var BinarySearchTree = function() {
  return {
    BinarySearchTree: BST,
    Node: Node
  }
}();

module.exports = BinarySearchTree;

// STAR PROBLEMS
// http://www.geeksforgeeks.org/tournament-tree-and-binary-heap/
// http://www.geeksforgeeks.org/find-all-possible-interpretations/
// http://www.geeksforgeeks.org/clone-binary-tree-random-pointers/

/* NOTES:
- return this.BTFind(node.left, data) || this.BTFind(node.right, data); // apparently doing null || Object will return the Object
-when returning values, don't mix integers (return 0) with true/false return values
-example of a way to change the tree while iterating through the tree
-the print level (breadth-first search) algorithm can be used for a lot of problems and avoids the overhead of recursion
-note: a lot of fxns are accepting a result array. This is mainly for testing purposes and can be omitted
-when given a preorder traversal array, the root is always the first element. For postorder, the root is always the last element
-when having to recreate a tree given 2 arrays, every algorithm that had preorder in it always required to have a reference to the current
 index which was incremented by one at each call

THINGS TO TRY WHEN STUMPED: 
-instead of the usual else-if recursive structure, take out the conditionals so that each statement can be run (see ceiling())
-iterate right first instead of left
-create and pass object that holds state as you traverse the tree

REVIEW: differenceBetweenOddAndEvenLevelSums2, getTreeDiameter, getMaxWidth. kDistanceFromLeaf, *kDistanceFromNode, getLargestBSTSubTreeSize (efficient version. Alternate soln in Apress #20)
        getPredecessorAndSuccessor, verticalSum, iterativeInOrder, ceiling, _remove, removeNodesOutsideRange, existsPathSum
        areTreesIsomorphic, removeNodesWhosePathLessThanK, findMaxPathSumBetweenTwoLeaves, doesEachNodeHaveOnlyOneChild
*/