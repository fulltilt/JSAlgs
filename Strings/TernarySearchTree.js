function Node(data) {
  this.data = data;
  this.isEndOfString = false;
  this.left = null;
  this.eq = null;
  this.right = null;
}

// http://www.geeksforgeeks.org/ternary-search-tree/
// http://www.sanfoundry.com/java-program-ternary-search-tree/
function TernarySearchTree() {
  this.root = null;
}

TernarySearchTree.prototype = {
  // insert a new word in a Ternary Search Tree
  insert: function(word) {
    this.root = this.insertUtil(this.root, word, 0);
  },

  insertUtil: function(node, word, index) {
    // base case: tree is empty
    if (node === null) {
      node = new Node(word[index]);
    }

    var length = word.length;

    // if current character of word is smaller than node's data, insert this word in left subtree of node
    if (word[index] < node.data) {
      node.left = this.insertUtil(node.left, word, index);
    } else if (word[index] > node.data) { // if current char of word > than node's data, insert this word in right subtree of node
      node.right = this.insertUtil(node.right, word, index);
    } else {  // if current char of word is same as node's character
      if (index + 1 < length) {
        node.eq = this.insertUtil(node.eq, word, index + 1);
      } else {  // last char of word
        node.isEndOfString = true;
      }
    }

    return node;
  },

  traverse: function() {
    var result = [];
    this.traverseUtil(this.root, result, '');
    return result;
  },

  traverseUtil: function(node, result, str) {
    if (node !== null) {
      // first traverse left subtree
      this.traverseUtil(node.left, result, str);

      // store character of this node
      str += node.data;
      if (node.isEndOfString) {
        result.push(str);
      }

      // traverse subtree using equal pointer
      this.traverseUtil(node.eq, result, str);
      str = str.substring(0, str.length - 1);

      // traverse right subtree
      this.traverseUtil(node.right, result, str);
    }
  },

  search: function(word) {
    return this.searchUtil(this.root, word, 0);
  },

  searchUtil: function(node, word, index) {
    if (node === null) {
      return false;
    }

    var length = word.length;

    if (word[index] < node.data) {
      return this.searchUtil(node.left, word, index);
    } else if (word[index] > node.data) {
      return this.searchUtil(node.right, word, index);
    } else {
      if (node.isEndOfString && index === length - 1) {
        return true;
      } else if (index === word.length - 1) {
        return false;
      } else {
        return this.searchUtil(node.eq, word, index + 1);
      }
    }
  }
}

module.exports = TernarySearchTree;