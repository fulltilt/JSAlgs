function Node(data) {
  this.data = data;
  this.next = null;
  this.previous = null;
}

function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
  this.size = 0;

  this.find = find;
  this.insertHead = insertHead;
  this.insertAfter = insertAfter;
  this.remove = remove;
  this.clear = clear;
  this.print = print;
  this.reversePrint = reversePrint;
  this.reverseDoublyLinkedList = reverseDoublyLinkedList;
  this.flattenList = flattenList;
  this.flattenMultLevelList = flattenMultLevelList;
}

function find(data) {
  var currentNode = this.head;

  while(currentNode !== null) {
    if (currentNode.data === data) {
      return currentNode;
    }
    currentNode = currentNode.next;
  }

  return currentNode;
}

function insertHead(data) {
  var newNode = new Node(data);
  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
    this.size++;
    return;
  }

  newNode.next = this.head;
  this.head.previous = newNode;
  this.head = newNode;
  this.size++;
}

function insertAfter(data, dataOfNodeToInsertAfter) {
  var currentNode = this.find(dataOfNodeToInsertAfter);
  var newNode = new Node(data);
  
  newNode.next = currentNode.next;
  newNode.previous = currentNode;
  if (newNode.next !== null) {
    newNode.next.previous = newNode;
  }

  if (currentNode === this.tail) {  // special condition if the Node we're inserting after is the tail node
    this.tail = newNode;
  }

  currentNode.next = newNode;
  this.size++;
}

function remove(data) {
  var nodeToRemove = this.find(data);
  if (nodeToRemove === null) {
    return false;
  }

  if (nodeToRemove === this.head) {
    if (this.head.next !== null) {
      this.head.next.previous = null;
      this.head = this.head.next;
    }
  } else if (nodeToRemove === this.tail) {
    nodeToRemove.previous.next = null;
    this.tail = nodeToRemove.previous;
  } else {
    nodeToRemove.previous.next = nodeToRemove.next;
    nodeToRemove.next.previous = nodeToRemove.previous;
  }

  nodeToRemove = null;
  this.size -= 1;
}

// setting the current Node to null isn't quite working. Will have to look into how to do this correctly
function clear() {
  var currentNode = this.head;
  var nextNode;

  while (currentNode !== null) {
    nextNode = currentNode.next;
    currentNode.next = null;
    currentNode.previous = null;
    currentNode = null;
    currentNode = nextNode;
    this.size -= 1;
  }

  this.head = null;
}

function print() {
  var currentNode = this.head,
      output = '';

  while (currentNode !== null) {
    output += currentNode.data + ' ';
    currentNode = currentNode.next;
  }
//console.log(output.trim());
  return output.trim();
}

function reversePrint() {
  var currentNode = this.tail,
      output = '';

  while (currentNode !== null) {
    output += currentNode.data + ' ';
    currentNode = currentNode.previous;
  }
//console.log(output.trim());
  return output.trim();
}

// http://www.geeksforgeeks.org/reverse-a-doubly-linked-list/
function reverseDoublyLinkedList(list) {
  var currentNode = this.head,
      currentHead = this.head,
      currentTail = this.tail;

  while (currentNode !== null) {
    var currentNext = currentNode.next;
    currentNode.next = currentNode.previous;
    currentNode.previous = currentNext;
    currentNode = currentNext;
  }

  var temp = currentHead;
  this.head = currentTail;
  this.tail = currentHead; 
}

// modified helper merge function for flattenList that uses previous links instead of next links
function merge(a, b) {
  var dummyHead = new Node();
  var current = dummyHead;

  // merge both lists together in sorted order
  while (a !== null && b !== null) {
    if (a.data <= b.data) {
      current.previous = a;
      a = a.previous;
    } else {
      current.previous = b;
      b = b.previous;
    }
    current = current.previous;
  }
  current.previous = (a === null) ? b : a;
  return dummyHead.previous;
}

// http://www.geeksforgeeks.org/flattening-a-linked-list/
function flattenList() {
  var current = this.head,
      result = null
      newHead = null;
  
  while (current !== null) {
    if (result === null) {
      result = merge(current, result);
      newHead = result;
    } else {
      result = merge(current, result);
    }
    current = current.next;
  }

  // print list using previous links instead of next
  var output = '';
  current = newHead;
  while (current !== null) {
    output += current.data + ' ';
    current = current.previous;
  }
  return output.trim();
}

// http://www.geeksforgeeks.org/flatten-a-linked-list-with-next-and-child-pointers/
function flattenMultLevelList(head) {
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
}

var DoublyLinkedList = function() {
  return {
    DoublyLinkedList: DoublyLinkedList,
    Node: Node
  }
}();

module.exports = DoublyLinkedList;