var Heap = require('../Heap.js');

describe("Heap", function() {
  var heap = new Heap(function(x) { return x; });

  beforeEach(function() {
    heap.push(10);
    heap.push(3);
    heap.push(4);
    heap.push(9);
    heap.push(1);
    heap.push(2);
    heap.push(6);
  });

  it('tests pop', function() {
    expect(heap.pop()).toEqual(1);
    expect(heap.pop()).toEqual(2);
  })
});