var Heap = require('../Heaps.js');

describe("Heap", function() {
  var heap = new Heap.MinHeap(function(x) { return x; });

  beforeEach(function() {
    heap.contents = [];
    heap.push(10);
    heap.push(3);
    heap.push(4);
    heap.push(9);
    heap.push(1);
    heap.push(6);
  });

  it('tests pop', function() {
    expect(heap.pop()).toEqual(1);
    expect(heap.pop()).toEqual(3);
  });

  it('tests Heap with objects', function() {
    var test = new Heap.MinHeap(function(x) { return x.frequency; });
    test.push(new Node('a', 16));
    test.push(new Node('b', 2));
    test.push(new Node('c', 8));
    test.push(new Node('d', 7));
    expect(test.pop().char).toEqual('b');
    expect(test.pop().char).toEqual('d');
  });
});

function Node(char, frequency) {
  this.char = char;
  this.frequency = frequency;
}