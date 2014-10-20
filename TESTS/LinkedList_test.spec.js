var LinkedList = require('../LinkedList.js');
var DoublyLinkedList = require('../DoublyLinkedList.js');

describe("LinkedList", function() {
  var ll = new LinkedList();
  var dll = new DoublyLinkedList();

  beforeEach(function() {
    ll.clear();
    ll.insertHead(2);
    ll.insertHead(7);
    ll.insertHead(8);
    ll.insertHead(6);
    ll.insertHead(9);
    ll.insertHead(5);

    dll.clear();
    dll.insertHead(2);
    dll.insertHead(7);
    dll.insertHead(8);
    dll.insertHead(6);
    dll.insertHead(9);
    dll.insertHead(5);
  });

  it('tests insertHead and insertAfter', function() {
    expect(ll.size).toEqual(6);
    expect(ll.head.data).toEqual(5);
    expect(ll.print()).toEqual('5 9 6 8 7 2');
    ll.insertAfter(10, 9);
    expect(ll.size).toEqual(7);
    expect(ll.print()).toEqual('5 9 10 6 8 7 2');
    //expect(ll.insertAfter(10, -1)).toThrow('Invalid node error.');
  });

  it('tests insertHead and insertAfter for DoublyLinkedLists', function() {
    expect(dll.size).toEqual(6);
    expect(dll.head.data).toEqual(5);
    expect(dll.print()).toEqual('5 9 6 8 7 2');
    dll.insertAfter(10, 9);
    expect(dll.size).toEqual(7);
    expect(dll.print()).toEqual('5 9 10 6 8 7 2');
    expect(dll.reversePrint()).toEqual('2 7 8 6 10 9 5');
    dll.insertAfter(1, 2);  // insert at tail
    expect(dll.size).toEqual(8);
    expect(dll.print()).toEqual('5 9 10 6 8 7 2 1');
    expect(dll.reversePrint()).toEqual('1 2 7 8 6 10 9 5');
  });

  it('tests remove() and removeHead()', function() {
    ll.remove(8);
    expect(ll.size).toEqual(5);
    expect(ll.print()).toEqual('5 9 6 7 2');
    ll.removeHead();
    expect(ll.size).toEqual(4);
    expect(ll.print()).toEqual('9 6 7 2');
  });

  it('tests remove and removeHead for DoublyLinkedList', function() {
    dll.remove(8);
    expect(dll.size).toEqual(5);
    expect(dll.print()).toEqual('5 9 6 7 2');
    dll.remove(5);  // remove head
    expect(dll.size).toEqual(4);
    expect(dll.print()).toEqual('9 6 7 2');
    expect(dll.reversePrint()).toEqual('2 7 6 9');
    dll.remove(2);  // remove tail
    expect(dll.print()).toEqual('9 6 7');
    expect(dll.reversePrint()).toEqual('7 6 9');
  });

  it('tests find()', function() {
    expect(ll.find(8)).toNotEqual(null);
    expect(ll.find(-3)).toEqual(null);
  });

  it('tests find for DoublyLinkedList', function() {
    expect(ll.find(8)).toNotEqual(null);
    expect(ll.find(-3)).toEqual(null);
  });

  it('tests reverseDoublyLinkedList', function() {
    dll.reverseDoublyLinkedList();
    expect(dll.print()).toEqual('2 7 8 6 9 5');
    expect(dll.reversePrint()).toEqual('5 9 6 8 7 2');
  });

  it('tests insertionSort without swapping', function() {
    ll.insertionSortWithoutSwappingNodes();
    expect(ll.print()).toEqual('2 5 6 7 8 9');
  });

  it('tests insertionSort with swapping', function() {
    ll.insertionSortWithSwappingNodes();
    expect(ll.print()).toEqual('2 5 6 7 8 9');
  });

  it('tests mergeSortedLists()', function() {
    var ll1 = new LinkedList();
    ll1.insertHead(7);
    ll1.insertHead(6);
    ll1.insertHead(3);
    ll1.insertHead(1);
    var ll2 = new LinkedList();
    ll2.insertHead(8);
    ll2.insertHead(5);
    ll2.insertHead(4);
    ll2.insertHead(2);

    expect(ll.mergeSortedLists(ll1.head, ll2.head)).toEqual('1 2 3 4 5 6 7 8');
  }); 

  it('tests getMiddle()', function() {
    expect(ll.getMiddle(ll.head).data).toEqual(6);  // even # of items
    ll.insertHead(1);
    expect(ll.getMiddle(ll.head).data).toEqual(6);  // odd # if items
    var ll1 = new LinkedList();
    expect(ll1.getMiddle(ll1.head)).toEqual(null);  // no items
    ll1.insertHead(1);
    expect(ll1.getMiddle(ll1.head).data).toEqual(1);  // 1 item
    ll1.insertHead(2);
    expect(ll1.getMiddle(ll1.head).data).toEqual(2);  // 2 items
  });

  it('tests merge sort', function() {
    expect(ll.mergeSort().printFromNode()).toEqual('2 5 6 7 8 9');
  });

  it('tests hasCycle() and getCycleEntry()', function() {
    expect(ll.hasCycle()).toEqual(false);
    var ll1 = new LinkedList();
    ll1.insertHead(6);
    ll1.insertHead(5);
    ll1.insertHead(4);
    ll1.insertHead(3);
    ll1.insertHead(2);
    ll1.insertHead(1);
    ll1.find(6).next = ll1.find(3);
    expect(ll1.hasCycle()).toEqual(true);
    expect(ll1.getCycleEntry().data).toEqual(3);
  });

  it('tests getNthFromEnd', function() {
    expect(ll.getNthFromEnd(3)).toEqual(8);
    expect(ll.getNthFromEnd(1)).toEqual(2);
  });

  it('tests reverse a linked list', function() {
    ll.reverse();
    expect(ll.print()).toEqual('2 7 8 6 9 5');
  });

  it('tests reverse a doubly linked list', function() {
    dll.reverseDoublyLinkedList();
    //expect(dll.print()).toEqual('2 7 8 6 9 5');
    //expect(dll.reversePrint()).toEqual('5 9 6 8 7 2');
  });
});