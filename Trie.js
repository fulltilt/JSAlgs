var fs = require("fs");

function Trie() {
  this.wordTree = {};
}

Trie.prototype = {
  createWordTree: function(wordList) {
    var lines = wordList.split("\n");
    var words = 0, line, match, letters, root, c;
    
    while (lines.length > 0) {
      line = lines.pop();
      if (line) {
        root = this.wordTree;
        letters = line.trim().toUpperCase();
        
        var length = letters.length;
        for (var i = 0; i < length; i++) {
          c = letters[i];
          
          if (!root[c]) {
            root[c] = {};
          }
          root = root[c];
          
          if (i === length - 1) {
            words += 1;
            root.$ = 1;
            // store description in tree
            //root.$d = match[2];
          }
        }
      }
    }
  },
  
  isWord: function(wordTree, letters) {
    var root = wordTree,
        length = letters.length;

    for (var i = 0; i < length; i++) {
      var character = letters[i];
      if (!root[character]) {
        return false;
      }
      root = root[character];
    }
    
    if (!root.$) {
      return false;
    }
    
    return root;
  },

  print: function() {
    console.log(this.wordTree);
  }
};

fs.readFile('example.txt', function(err, data) {
  if (err) throw err;
  var trie = new Trie();
  trie.createWordTree(data.toString());
  //trie.print();
  console.log(trie.isWord(trie.wordTree, 'NEUROANATOMICAL'));
  console.log(trie.isWord(trie.wordTree, 'penis'));
});

module.exports = Trie;

// http://www.geeksforgeeks.org/pattern-searching-using-trie-suffixes/
// http://www.geeksforgeeks.org/trie-insert-and-search/
// http://www.geeksforgeeks.org/trie-delete/
// http://www.geeksforgeeks.org/longest-prefix-matching-a-trie-based-solution-in-java/
// main code from: https://github.com/mutaphysis/wordlistparser/blob/master/wordparser.js