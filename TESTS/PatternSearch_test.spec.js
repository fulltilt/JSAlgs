var PatternSearch = require('../Strings/PatternSearch.js'),
    Trie = require('../Strings/Trie.js'),
    TernarySearchTree = require('../Strings/TernarySearchTree.js');

describe("PatternSearch", function() {
  var ps = new PatternSearch(),
      tst = new TernarySearchTree(),
      trie = new Trie();

  it('tests naivePatternSearch', function() {
    expect(ps.naivePatternSearch('AABA', 'AABAACAADAABAAABAA')).toEqual([0,9,13]);
  });

  it('tests KMP', function() {
    expect(ps.KMP('AABA', 'AABAACAADAABAAABAA')).toEqual([0,9,13]);
  });

  it('tests RabinKarp', function() {
    expect(ps.RabinKarp('AABA', 'AABAACAADAABAAABAA')).toEqual([0,9,13]);
  });

  it('tests BoyerMoore', function() {
    expect(ps.BoyerMoore('AABA', 'AABAACAADAABAAABAA')).toEqual([0,9,13]);
  });

  xit('tests finiteAutomata', function() {
    expect(ps.finiteAutomata('AABA', 'AABAACAADAABAAABAA')).toEqual([0,9,13]);
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

  it('tests TernarySearchTree insert() and traverse()', function() {
    tst.insert('cat');
    tst.insert('cats');
    tst.insert('up');
    tst.insert('bug');
    expect(tst.traverse()).toEqual([ 'bug', 'cat', 'cats', 'up' ]);
  });

  it('tests TernarySearchTree search', function() {
    expect(tst.search('cats')).toEqual(true);
    expect(tst.search('bu')).toEqual(false);
    expect(tst.search('cat')).toEqual(true);
  });
});