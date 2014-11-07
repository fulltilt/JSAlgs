var LinkedList = require('../LinkedList.js');
var DLL = require('../DoublyLinkedList.js');
var BST = require('../BinarySearchTree.js');

describe("LinkedList", function() {
  var ll = new LinkedList();
  var dll = new DLL.DoublyLinkedList();

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

    expect(ll.mergeSortedLists(ll1.head, ll2.head).printFromNode()).toEqual('1 2 3 4 5 6 7 8');
    ll1.clear();
    ll2.clear();
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
    ll1.clear;
  });

  it('tests getNthFromEnd', function() {
    expect(ll.getNthFromEnd(3)).toEqual(8);
    expect(ll.getNthFromEnd(1)).toEqual(2);
  });

  it('tests reverse a linked list', function() {
    ll.reverse();
    expect(ll.print()).toEqual('2 7 8 6 9 5');
  });

  it('tests reverse from a Node', function() {
    var node1 = ll.find(8)
        node2 = ll.find(2);
    ll.reverseFromNode(node1);
    expect(node2.printFromNode()).toEqual('2 7 8');
  });

  it('tests reverse a doubly linked list', function() {
    dll.reverseDoublyLinkedList();
    expect(dll.print()).toEqual('2 7 8 6 9 5');
    expect(dll.reversePrint()).toEqual('5 9 6 8 7 2');
  });

  it('tests isPalindrome', function() {
    expect(ll.isPalindrome(ll.head)).toEqual(false);
    var ll1 = new LinkedList();
    ll1.insertHead(6);
    ll1.insertHead(5);
    ll1.insertHead(4);
    ll1.insertHead(4);
    ll1.insertHead(5);
    ll1.insertHead(6);
    expect(ll.isPalindrome(ll1.head)).toEqual(true);
    ll1.clear();
    ll1.insertHead(6);
    ll1.insertHead(5);
    ll1.insertHead(3);
    ll1.insertHead(5);
    ll1.insertHead(6);
    expect(ll.isPalindrome(ll1.head)).toEqual(true);
    ll1.clear();
    ll1.insertHead(6);
    ll1.insertHead(2);
    ll1.insertHead(3);
    ll1.insertHead(5);
    ll1.insertHead(6);
    expect(ll.isPalindrome(ll1.head)).toEqual(false);
    ll1.clear();
  });

  it('tests copyLinkedListWithArbitraryPtr',function() {
    // use Doubly Linked List structure to create a list with arbitrary pointers
    var dll = new DLL.DoublyLinkedList();
    dll.insertHead(5);
    dll.insertHead(4);
    dll.insertHead(3);
    dll.insertHead(2);
    dll.insertHead(1);
    var node1 = dll.find(1),
        node2 = dll.find(2),
        node3 = dll.find(3),
        node4 = dll.find(4),
        node5 = dll.find(5);
    node1.previous = node3;
    node2.previous = node1;
    node3.previous = node5;
    node4.previous = node3;
    node5.previous = node2;
    ll.copyLinkedListWithArbitraryPtr(dll.head);
    dll.clear();
  });

  it('tests splitCircularListInTwo', function() {
    var cl = new LinkedList();
    cl.insertHead(11);
    cl.insertHead(2);
    cl.insertHead(56);
    cl.insertHead(12);
    cl.find(11).next = cl.find(12);
    ll.splitCircularListInTwo(cl.head);
  });

  it('tests swapPairwise', function() {
    var swp = new LinkedList();
    // test odd length list
    swp.insertHead(7);
    swp.insertHead(6);
    swp.insertHead(5);
    swp.insertHead(4);
    swp.insertHead(3);
    swp.insertHead(2);
    swp.insertHead(1);
    swp.swapPairwise();
    expect(swp.print()).toEqual('2 1 4 3 6 5 7');
    swp.clear();

    // test even length list
    swp.insertHead(6);
    swp.insertHead(5);
    swp.insertHead(4);
    swp.insertHead(3);
    swp.insertHead(2);
    swp.insertHead(1);
    swp.swapPairwise();
    expect(swp.print()).toEqual('2 1 4 3 6 5');
  });

  it('tests deleteAlternating', function() {
    var swp = new LinkedList();
    // test odd length list
    swp.insertHead(5);
    swp.insertHead(4);
    swp.insertHead(3);
    swp.insertHead(2);
    swp.insertHead(1);
    swp.deleteAlternating();
    expect(swp.print()).toEqual('1 3 5');
    swp.clear();

    // test even length list
    swp.insertHead(4);
    swp.insertHead(3);
    swp.insertHead(2);
    swp.insertHead(1);
    swp.deleteAlternating();
    expect(swp.print()).toEqual('1 3');
    swp.clear();
  });

  it('tests alternateSplit', function() {
    var as = new LinkedList();
    // test even length;
    as.insertHead(1);
    as.insertHead(0);
    as.insertHead(1);
    as.insertHead(0);
    as.insertHead(1);
    as.insertHead(0);
    as.alternateSplit();
    //console.log(as.print());

    // test odd length
    as.clear();
    as.insertHead(0);
    as.insertHead(1);
    as.insertHead(0);
    as.insertHead(1);
    as.insertHead(0);
    as.alternateSplit()
    //console.log(as.print());
    as.clear();
  });

  it('tests reverseInKGroups', function() {
    var rikg = new LinkedList();
    // test even length;
    rikg.insertHead(8);
    rikg.insertHead(7);
    rikg.insertHead(6);
    rikg.insertHead(5);
    rikg.insertHead(4);
    rikg.insertHead(3);
    rikg.insertHead(2);
    rikg.insertHead(1);
    rikg.reverseInKGroups(rikg.head, 3);
    expect(rikg.print()).toEqual('3 2 1 6 5 4 8 7');

    rikg.clear();
    rikg.insertHead(8);
    rikg.insertHead(7);
    rikg.insertHead(6);
    rikg.insertHead(5);
    rikg.insertHead(4);
    rikg.insertHead(3);
    rikg.insertHead(2);
    rikg.insertHead(1);
    rikg.reverseInKGroups(rikg.head, 5);
    expect(rikg.print()).toEqual('5 4 3 2 1 8 7 6');
    rikg.clear();
  });

  it('tests deleteNodesWithGreaterValueOnRight', function() {
    var dvr = new LinkedList();
    dvr.insertHead(3);
    dvr.insertHead(2);
    dvr.insertHead(6);
    dvr.insertHead(5);
    dvr.insertHead(11);
    dvr.insertHead(10);
    dvr.insertHead(9);
    dvr.insertHead(15);
    dvr.insertHead(12);
    dvr.deleteNodesWithGreaterValueOnRight();
    expect(dvr.print()).toEqual('15 11 6 3');
    dvr.clear();
  });

  it('tests segregateEvenAndOdd', function() {
    var seo = new LinkedList();
    seo.insertHead(6);
    seo.insertHead(7);
    seo.insertHead(1);
    seo.insertHead(4);
    seo.insertHead(5);
    seo.insertHead(10);
    seo.insertHead(12);
    seo.insertHead(8);
    seo.insertHead(15);
    seo.insertHead(17);
    seo.segregateEvenAndOdd();
    expect(seo.print()).toEqual('8 12 10 4 6 17 15 5 1 7');

    seo.clear();
    seo.insertHead(6);
    seo.insertHead(1);
    seo.insertHead(4);
    seo.insertHead(5);
    seo.insertHead(10);
    seo.insertHead(12);
    seo.insertHead(8);
    seo.segregateEvenAndOdd();
    expect(seo.print()).toEqual('8 12 10 4 6 5 1');

    seo.clear();
    seo.insertHead(7);
    seo.insertHead(5);
    seo.insertHead(3);
    seo.insertHead(1);
    seo.segregateEvenAndOdd();
    expect(seo.print()).toEqual('1 3 5 7');

    seo.clear();
    seo.insertHead(10);
    seo.insertHead(12);
    seo.insertHead(8);
    seo.segregateEvenAndOdd();
    expect(seo.print()).toEqual('8 12 10');
  });

  it('tests additionWithTwoLists', function() {
    var atl1 = new LinkedList();
    atl1.insertHead(7);
    atl1.insertHead(5);
    atl1.insertHead(9);
    atl1.insertHead(4);
    atl1.insertHead(6);

    var atl2 = new LinkedList();
    atl2.insertHead(8);
    atl2.insertHead(4);
    expect(atl1.additionWithTwoLists(atl1, atl2).printFromNode()).toEqual('6 5 0 0 5');
    atl1 = null;
    atl2 = null;
  });

  it('tests unionAndIntersection', function() {
    var uai1 = new LinkedList();
    uai1.insertHead(20);
    uai1.insertHead(4);
    uai1.insertHead(15);
    uai1.insertHead(10);

    var uai2 = new LinkedList();
    uai2.insertHead(10);
    uai2.insertHead(2);
    uai2.insertHead(4);
    uai2.insertHead(8);
    uai1.unionAndIntersection(uai1, uai2);
    uai1 = null;
    uai2 = null;
  });

  it('tests rotateList', function() {
    var rl = new LinkedList();
    rl.insertHead(60); 
    rl.insertHead(50);
    rl.insertHead(40);
    rl.insertHead(30);
    rl.insertHead(20);
    rl.insertHead(10);
    expect(rl.rotateList(rl, 4).printFromNode()).toEqual('50 60 10 20 30 40');
  });

  it('tests flattenList', function() {
    var fl = new DLL.DoublyLinkedList();
    fl.insertHead(28);
    fl.insertHead(19);
    fl.insertHead(10);
    fl.insertHead(5);
    fl.head.previous = new DLL.Node(7);
    fl.head.previous.previous = new DLL.Node(8);
    fl.head.previous.previous.previous = new DLL.Node(30);

    var tempNode = fl.find(10);
    tempNode.previous = new DLL.Node(20);

    tempNode = fl.find(19);
    tempNode.previous = new DLL.Node(22);
    tempNode.previous.previous = new DLL.Node(50);

    tempNode = fl.find(28);
    tempNode.previous = new DLL.Node(35);
    tempNode.previous.previous = new DLL.Node(40);
    tempNode.previous.previous.previous = new DLL.Node(45);
    expect(fl.flattenList()).toEqual('5 7 8 10 19 20 22 28 30 35 40 45 50');
    fl = null;
    
    /* test out that list is formed correctly
    var current = fl.head;
    while (current !== null) {
      var down = current.previous;
      console.log('*' + current.data)
      while (down !== null) {
        console.log(down.data);
        down = down.previous;
      }
      current = current.next;
    }
    */
  });

  it('tests flattenMultLevelList', function() {
    // manually create a multi level linked list
    var head = new DLL.Node(10);
    head.previous = new DLL.Node(4);
    head.previous.next = new DLL.Node(20);
    head.previous.next.previous = new DLL.Node(2);
    head.previous.next.next = new DLL.Node(13);
    head.previous.next.next.previous = new DLL.Node(16);
    head.previous.next.next.previous.previous = new DLL.Node(3);

    head.next = new DLL.Node(5);
    head.next.next = new DLL.Node(12);
    head.next.next.next = new DLL.Node(7);

    head.next.next.next.previous = new DLL.Node(17);
    head.next.next.next.previous.next = new DLL.Node(6);
    head.next.next.next.previous.previous = new DLL.Node(9);
    head.next.next.next.previous.previous.next = new DLL.Node(8);
    head.next.next.next.previous.previous.previous = new DLL.Node(19);
    head.next.next.next.previous.previous.previous.next = new DLL.Node(15);

    head.next.next.next.next = new DLL.Node(11);

    var newList = dll.flattenMultLevelList(head),
        current = newList,
        output = '';
    while (current !== null) {
      output += current.data + ' ';
      current = current.next;
    }
    expect(output.trim()).toEqual('10 5 12 7 11 4 20 13 17 6 2 16 9 8 3 19 15');
    /* print list by level
    var level = [],
        children = [];
    var current = head;
    while (current !== null) {
      level.push(current);
      current = current.next;
    }

    while (level.length !== 0) {
      for (var i = 0; i < level.length; i++) {
        console.log(level[i].data);
        if (level[i].previous !== null) {
          children.push(level[i].previous);

          var innerCurrent = level[i].previous.next;
          while (innerCurrent !== null) {
            children.push(innerCurrent);
            innerCurrent = innerCurrent.next;
          }
        }
      }
      level = children.slice(0);
      children = [];
    }
    */
  });

  it('tests sortZeroesOnesTwos', function() {
    var szot = new LinkedList();
    szot.insertHead(0);
    szot.insertHead(1);
    szot.insertHead(0);
    szot.insertHead(2);
    szot.insertHead(1);
    szot.insertHead(1);
    szot.insertHead(2);
    szot.insertHead(1);
    szot.insertHead(2);
    expect(szot.sortZeroesOnesTwos(szot).printFromNode()).toEqual('0 0 1 1 1 1 2 2 2');
    szot = null;
  });

  it('tests deleteNNodesAfterMNodes', function() {
    var dnam = new LinkedList();
    dnam.insertHead(8);
    dnam.insertHead(7);
    dnam.insertHead(6);
    dnam.insertHead(5);
    dnam.insertHead(4);
    dnam.insertHead(3);
    dnam.insertHead(2);
    dnam.insertHead(1);
    expect(dnam.deleteNNodesAfterMNodes(dnam, 2, 2)).toEqual('1 2 5 6');

    dnam.clear();
    dnam.insertHead(10);
    dnam.insertHead(9);
    dnam.insertHead(8);
    dnam.insertHead(7);
    dnam.insertHead(6);
    dnam.insertHead(5);
    dnam.insertHead(4);
    dnam.insertHead(3);
    dnam.insertHead(2);
    dnam.insertHead(1);
    expect(dnam.deleteNNodesAfterMNodes(dnam, 3, 2)).toEqual('1 2 3 6 7 8');

    dnam.clear();
    dnam.insertHead(10);
    dnam.insertHead(9);
    dnam.insertHead(8);
    dnam.insertHead(7);
    dnam.insertHead(6);
    dnam.insertHead(5);
    dnam.insertHead(4);
    dnam.insertHead(3);
    dnam.insertHead(2);
    dnam.insertHead(1);
    expect(dnam.deleteNNodesAfterMNodes(dnam, 1, 1)).toEqual('1 3 5 7 9');
    dnam = null;
  });

  it('tests reverseAlternateAndAppendAtEnd', function() {
    var raa = new LinkedList();
    raa.insertHead(6);
    raa.insertHead(5);
    raa.insertHead(4);
    raa.insertHead(3);
    raa.insertHead(2);
    raa.insertHead(1);
    expect(raa.reverseAlternateAndAppendAtEnd()).toEqual('1 3 5 6 4 2');

    raa.clear();
    raa.insertHead(20);
    raa.insertHead(18);
    raa.insertHead(16);
    raa.insertHead(14);
    raa.insertHead(12);
    expect(raa.reverseAlternateAndAppendAtEnd()).toEqual('12 16 20 18 14');

    raa = null;
  });

  it('tests LRUCache', function() {
    expect(true).toEqual(false);
  });

  xit('tests sortedLLToBalancedBST', function() {
    var slbb1 = new LinkedList(),
        slbb2 = new LinkedList(),
        slbb3 = new LinkedList(),
        slbb4 = new LinkedList(),
        bst = new BST.BinarySearchTree();

    slbb1.insertHead(3);
    slbb1.insertHead(2);
    slbb1.insertHead(1);
    ll.sortedLLToBalancedBST(slbb1, 0, slbb1.size - 1, bst);
    bst.printByLevel(bst.root);
    bst.clear();

    slbb2.insertHead(7);
    slbb2.insertHead(6);
    slbb2.insertHead(5);
    slbb2.insertHead(4);
    slbb2.insertHead(3);
    slbb2.insertHead(2);
    slbb2.insertHead(1);
    ll.sortedLLToBalancedBST(slbb2, 0, slbb2.size - 1, bst);
    bst.printByLevel(bst.root);
    bst.clear();

    slbb3.insertHead(4);
    slbb3.insertHead(3);
    slbb3.insertHead(2);
    slbb3.insertHead(1);
    ll.sortedLLToBalancedBST(slbb3, 0, slbb3.size - 1, bst);
    bst.printByLevel(bst.root);
    bst.clear();

    slbb4.insertHead(6);
    slbb4.insertHead(5);
    slbb4.insertHead(4);
    slbb4.insertHead(3);
    slbb4.insertHead(2);
    slbb4.insertHead(1);
    ll.sortedLLToBalancedBST(slbb4, 0, slbb4.size - 1, bst);
    bst.printByLevel(bst.root);
    bst.clear();
  });
});