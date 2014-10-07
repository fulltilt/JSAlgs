function Node(data) {
	this.data = data;
	this.next = null;
}

function LinkedList() {
	this.head = null;
	this.size = 0;
	this.find = find;
	this.insertHead = insertHead;
	this.insertAfter = insertAfter;
	this.remove = remove;
	this.removeHead = removeHead;
	this.clear = clear;
	this.print = print;

	this.mergeSort = mergeSort;
	this._mergeSort = _mergeSort;
	this.merge = merge;
	this.getMiddle = getMiddle;
}

function find(item) {
	var currentNode = this.head;
	while (currentNode !== null)
		if(currentNode.data === item)
			return currentNode;
		else
			currentNode = currentNode.next;

	return null;
}

function insertHead(item) {
	var node = new Node(item);
	node.next = this.head;
	this.head = node;
	this.size++;
}

function insertAfter(item, after) {
	var node = new Node(item);
	if (this.head === null) {
		this.head = node;
	} else {
		var nodeToInsertAfter = this.find(after);

		if (nodeToInsertAfter === null) {
			throw new Error('Invalid node error.');
		}

		node.next = nodeToInsertAfter.next;
		nodeToInsertAfter.next = node;
	}

	this.size++;
}

function removeHead() {
	if (this.head === null) {
		return;
	}
	var temp = this.head.next;
	this.head = null;
	this.head = temp;
	this.size--;
}

function remove(item) {
	var current = this.head,
	    trailing = null;

	while (current !== null) {
		if (current.data === item) {
			if (current === this.head) {
				this.head = this.head.next;
			} else {
				trailing.next = current.next;
			}
			current = null;
			this.size--;
			return true;
		}

		trailing = current;
		current = current.next;
	}

	return false;
}

function clear() {
	while (this.head !== null) {
		this.removeHead();
	}
}

function print() {
	var current = this.head;
	var output = '';
	while (current !== null) {
		output += current.data + ' ';
		current = current.next;
	}
	console.log(output);
	return output.trim();
}

function mergeSort() {
	this._mergeSort(this.head);
}

function _mergeSort(head) {
	if (head === null || head.next === null) {
		return head;
	}

	var middle = this.getMiddle(head);
	var sHalf = middle.next;
	middle.next = null;

	return this.merge(this._mergeSort(head), this._mergeSort(sHalf));
}

// merge 2 lists
function merge(a, b) {
	var dummyHead = new Node();
	var current = dummyHead;

	while (a !== null && b !== null) {
		if (a.data <= b.data) {
			current.next = a;
			a = a.next;
		} else {
			current.next = b;
			b = b.next;
		}
	}
	current.next = (a === null) ? b : a;
	return dummyHead.next;
}

function getMiddle(head) {
	if (head === null) {
		return head;
	}

	var slow = fast = head;
	while (fast.next !== null && fast.next.next !== null) {
		slow = slow.next;
		fast = fast.next.next;
	}

	return slow;
}

module.exports = LinkedList;