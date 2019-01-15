var BTree = require('../Trees/BTree.js');

describe("B Tree", function() {
  var t = null;

  beforeEach(function() {
    t = null;
    t = new BTree(3);
    t.insert(10);
    t.insert(20);
    t.insert(5);
    t.insert(6);
    t.insert(12);
    t.insert(30);
    t.insert(7);
    t.insert(17);
    t.traverse();
  });

  it('tests search', function() {
    expect(t.search(6)).not.toEqual(null);
    expect(t.search(15)).toEqual(null);
  });
});
