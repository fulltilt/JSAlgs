var fs = require("fs");

function Trie() {
  this.wordTree = {};
  this.words = 0;
}

Trie.prototype = {
  addWord: function(word) {
    var root, letters, root, c;
    root = this.wordTree;
    letters = word.trim().toUpperCase();

    var length = letters.length;
    for (var i = 0; i < length; i++) {
      c = letters[i];

      if (!root[c]) {
        root[c] = {};
      }
      root = root[c];

      if (i === length - 1) {
        this.words += 1;
        root.$ = 1;
      }
    }
  },

  createWordTree: function(wordList) {
    var lines = wordList.split("\n");
    var line, letters, root, c;
    
    while (lines.length > 0) {
      line = lines.pop();
      if (line) {
        this.addWord(line);
      }
    }
  },
  
  isWord: function(letters) {
    var root = this.wordTree,
        length = letters.length;

    for (var i = 0; i < length; i++) {
      var character = letters[i].toUpperCase();

      if (!root[character]) {
        return false;
      }
      root = root[character];
    }
    
    if (!root.$) {
      return false;
    }
    
    return true;
  },

  print: function() {
    var json = JSON.stringify(this.wordTree, null, 2);
    console.log(json);
  }
};

/*
fs.readFile('text/example.txt', function(err, data) {
  if (err) throw err;
  var trie = new Trie();
  trie.createWordTree(data.toString());
  trie.print();
  console.log(trie.isWord(trie.wordTree, 'NEUROANATOMICAL'));
  console.log(trie.isWord(trie.wordTree, 'HAMBURGER'));
});
*/

module.exports = Trie;

// http://www.geeksforgeeks.org/pattern-searching-using-trie-suffixes/
// http://www.geeksforgeeks.org/trie-insert-and-search/
// http://www.geeksforgeeks.org/trie-delete/
// http://www.geeksforgeeks.org/longest-prefix-matching-a-trie-based-solution-in-java/
// main code from: https://github.com/mutaphysis/wordlistparser/blob/master/wordparser.js

/* NOTES
-If time is at its premium, go for TRIE. If space is at its premium, go for Ternary search tree.
*/