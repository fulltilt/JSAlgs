var fs = require('fs');
var Trie = require('../Trie.js');

describe("Trie", function() {
  var trie = new Trie();

  beforeEach(function() {
    /* note: asynchronous fxns make testing hard
    fs.readFile('../text/example.txt', function(err, data) {
      if (err) throw err;
      trie.createWordTree(data.toString());
      trie.print();
    });
    */
    trie.wordTree = {};
  });

  it('tests addWord and isWord', function() {
    trie.addWord('banana');
    trie.addWord('anana');
    trie.addWord('nana');
    trie.addWord('ana');
    trie.addWord('na');
    trie.addWord('a');
    
    expect(trie.isWord('nana')).toEqual(true);
    expect(trie.isWord('nan')).toEqual(false);
  });

  it('tests isWord', function() {
    
  });
});