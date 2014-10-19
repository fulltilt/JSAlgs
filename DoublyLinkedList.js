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
  this.clear = clear;
  this.print = print;
  this.reversePrint = reversePrint;
  this.reverseDoublyLinkedList = reverseDoublyLinkedList; 
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
  currentNode.next = newNode;
  this.size++;
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
console.log(output.trim());
  return output.trim();
}

function reversePrint() {
  var currentNode = this.tail,
      output = '';

  while (currentNode !== null) {
    output += currentNode.data + ' ';
    currentNode = currentNode.previous;
  }
console.log(output.trim());
  return output.trim();
}

// http://www.geeksforgeeks.org/reverse-a-doubly-linked-list/
function reverseDoublyLinkedList(list) {

}

module.exports = DoublyLinkedList;