var LinkedList = require('../LinkedList.js');

describe("LinkedList", function() {
  var ll = new LinkedList();

  beforeEach(function() {
    ll.clear();
    ll.insertHead(2);
    ll.insertHead(7);
    ll.insertHead(8);
    ll.insertHead(9);
    ll.insertHead(6);
    ll.insertHead(5);
  });
  
  it('tests insertHead and insertAfter', function() {
    expect(ll.size).toEqual(6);
    expect(ll.head.data).toEqual(5);
    expect(ll.print()).toEqual('5 6 9 8 7 2');
    ll.insertAfter(10, 9);
    expect(ll.size).toEqual(7);
    expect(ll.print()).toEqual('5 6 9 10 8 7 2');
    //expect(ll.insertAfter(10, -1)).toThrow('Invalid node error.');
  });

  it('tests remove() and removeHead()', function() {
    ll.remove(8);
    expect(ll.size).toEqual(5);
    expect(ll.print()).toEqual('5 6 9 7 2');
    ll.removeHead();
    expect(ll.size).toEqual(4);
    expect(ll.print()).toEqual('6 9 7 2');
  });

  it('tests find()', function() {
    expect(ll.find(8)).toNotEqual(null);
    expect(ll.find(-3)).toEqual(null);
  });

  it('tests insertionSort without swapping', function() {
    ll.insertionSortWithoutSwappingNodes();
    expect(ll.print()).toEqual('2 5 6 7 8 9');
  });

  it('tests insertionSort with swapping', function() {
    ll.insertionSortWithSwappingNodes();
    expect(ll.print()).toEqual('2 5 6 7 8 9');
  });

  it('tests merge sort', function() {
    //ll.mergeSort();
    //ll.print();
  });
});