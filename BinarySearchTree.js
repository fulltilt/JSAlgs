var LinkedList = require('./LinkedList.js');
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
  this.getLargestBSTSubTreeSize = getLargestBSTSubTreeSize;
  this.areTreesIdentical = areTreesIdentical;
  this.mirror = mirror;

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
  this.recreateTreeGivenTwoTraversals = recreateTreeGivenTwoTraversals;
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
  //this.mergeTwoTrees = mergeTwoTrees;

  this.segmentTree = segmentTree;
  this.bTree = bTree;
  this.splayTree = this.splayTree;
  this.redBlackTree = redBlackTree;
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

function treeToDoublyLinkedList(root) {
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
function printByLevel() {
  var currentLevel = [],
      children = [];

  currentLevel.push(this.root);
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
}

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
function existsPathSum(node, sum, n) {
  if (node === null) {
    return false;
  }

  if (node.left === null && node.right === null) {
    return node.data + sum === n;
  } else {
    return this.existsPathSum(node.left, node.data + sum, n) || this.existsPathSum(node.right, node.data + sum, n);
  }
}

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
function canFold(node1, node2) {
  if (node1 === null && node2 === null) {
    return true;
  }

  if (((node1.left && node2.right) || (!node1.left && !node2.right)) &&
      this.canFold(node1.left, node2.right) &&
      this.canFold(node1.right, node2.left)) {
    return true;
  }

  return false;
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
// this algorithm doesn't need a parent pointer
// 2 cases we need to handle: if the right child is not null or is null
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
    } else {
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

// http://www.geeksforgeeks.org/check-for-identical-bsts-without-building-the-trees/
function checkIdenticalArrayBST(arr1, arr2) {

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

/* NOTE: delaying this as I have to implement a merge function that uses 'left' and 'right' instead of 'previous' and 'next'
// http://www.geeksforgeeks.org/merge-two-bsts-with-limited-extra-space/
function mergeTwoTrees(root1, root2) {
  root1 = this.treeToDoublyLinkedList(root1);
  root2 = this.treeToDoublyLinkedList(root2);
  var LL = new LinkedList();
  var list = mergeTwoConvertedLists(root1, root2);
  console.log(list.data);
}

// helper function for mergeTwoTrees. Since the conversion fxn from a tree to a list uses 'left' instead of 'previous' and 'right' instead of 'next', 
function mergeTwoConvertedLists(list1, list2) {
  var dummyHead = new Node(),
      current = dummyHead;

  while (list1 !== null && list2 !== null) {
    if (list1.data < list2.data) {
      current.next = list1;
      list1 = list1.right;
    } else {
      current.next = list2;
      list2 = list2.right;
    }
  }

  current.next = (list1 !== null) ? list1 : list2;
  return dummyHead.next;  
}
*/

// http://www.geeksforgeeks.org/fix-two-swapped-nodes-of-bst/
function fixBSTAfterSwap(root) {
  var stack = [],
      inOrder = [];
  current = root;
  while (stack.length > 0 || current) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      current = stack[stack.length - 1];
      stack.pop();
      inOrder.push(current);
      current = current.right;
    }
  }

  inOrder.sort(function(a, b) { return a.data - b.data; });
  console.log(inOrder);
}

// http://www.geeksforgeeks.org/if-you-are-given-two-traversal-sequences-can-you-construct-the-binary-tree/
// http://www.geeksforgeeks.org/construct-tree-from-given-inorder-and-preorder-traversal/
// http://www.geeksforgeeks.org/full-and-complete-binary-tree-from-given-preorder-and-postorder-traversals/
// http://www.geeksforgeeks.org/construct-bst-from-given-preorder-traversa/
// http://www.geeksforgeeks.org/construct-bst-from-given-preorder-traversal-set-2/
// http://www.geeksforgeeks.org/print-postorder-from-given-inorder-and-preorder-traversals/
// http://www.geeksforgeeks.org/construct-tree-inorder-level-order-traversals/
function recreateTreeGivenTwoTraversals(t1, t2) {

}

// http://www.geeksforgeeks.org/construct-binary-tree-from-inorder-traversal/
// http://www.geeksforgeeks.org/construct-a-special-tree-from-given-preorder-traversal/
function constructSpecialBT() {

}

// http://www.geeksforgeeks.org/check-if-each-internal-node-of-a-bst-has-exactly-one-child/
function doesEachNodeHaveOnlyOneChild() {

}

// http://www.geeksforgeeks.org/morris-traversal-for-preorder/
function morrisTraversal() {

}

// http://www.geeksforgeeks.org/iterative-postorder-traversal-using-stack/ 
function iterativePostOrder() {

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

/* NOTES:
- return this.BTFind(node.left, data) || this.BTFind(node.right, data); // apparently doing null || Object will return the Object
-when returning values, don't mix integers (return 0) with true/false return values

THINGS TO TRY WHEN STUMPED: 
-instead of the usual else-if recursive structure, take out the conditionals so that each statement can be run (see ceiling())


REVIEW: differenceBetweenOddAndEvenLevelSums2, getTreeDiameter, getMaxWidth. kDistanceFromLeaf, *kDistanceFromNode,
        getPredecessorAndSuccessor, verticalSum, iterativeInOrder, ceiling
*/