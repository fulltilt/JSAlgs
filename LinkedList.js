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

	this.insertionSortWithoutSwappingNodes = insertionSortWithoutSwappingNodes;
	this.insertionSortWithSwappingNodes = insertionSortWithSwappingNodes;
	this.mergeSort = mergeSort;
	this._mergeSort = _mergeSort;
	this.merge = merge;
	this.getMiddle = getMiddle;

	this.mergeSortedLists = mergeSortedLists;
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

// swapping data elements only. No swapping of nodes
function insertionSortWithoutSwappingNodes() {
	var slow,
			fast,
			tempLowest;

	for (slow = this.head; slow.next !== null; slow = slow.next) {
		tempLowest = slow;
		for (fast = slow.next; fast !== null; fast = fast.next) {
			if (fast.data < tempLowest.data) {
				tempLowest = fast;
			}
		}

		var temp = tempLowest.data;
		tempLowest.data = slow.data;
		slow.data = temp; 
	}
}

// swaps actual nodes. This is tough as it requires keeping track of 6 pointers: the slow pointer and it's previous pointer, the fast pointer and it's previous 
// pointer and the temporaryLowest pointer and its previus pointer
function insertionSortWithSwappingNodes() {
	if (this.head === null || this.size === 1) {
		return;
	}

	var slow, fast, tempLowest;

	// keep track of previous pointers which we need if we have to swap values
	var dummyHead = new Node();
	dummyHead.next = this.head;
	var previousSlow = dummyHead,
			previousTempLowest = dummyHead,
			previousFast = slow;

	// slow pointer iterates one-by-one
	for (slow = this.head; slow.next !== null; previousSlow = previousTempLowest = slow, slow = previousFast = slow.next) {
		tempLowest = slow;
		
		// from slow to the end, compare the current node to the slow node and mark it if its data is less than slow's data
		for (fast = slow.next; fast !== null; previousFast = fast, fast = fast.next) {
			if (fast.data < tempLowest.data) {
				previousTempLowest = previousFast;
				tempLowest = fast;
			}
		}

		if (tempLowest !== slow) {
			if (slow === this.head) {  // only applicable if the head is swapped
				this.head = tempLowest;
			}

			// swap nodes
			previousSlow.next = previousTempLowest.next;
			previousTempLowest.next = slow;
			var temp = tempLowest.next;
			tempLowest.next = slow.next;
			slow.next = temp;
			slow = tempLowest;
		}
	}
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
	console.log(middle.data);

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
	if (head === null || head === undefined) {
		return head;
	}

	var slow = fast = head;
	while (fast.next !== null && fast.next.next !== null) {
		slow = slow.next;
		fast = fast.next.next;
	}

	return slow;
}

function mergeSortedLists(list1, list2) {
	if (list1 === null && list2 === null) {
		return null;
	} else if (list1 === null) {
		return list2;
	} else if (list2 === null) {
		return list1;
	}


}

module.exports = LinkedList;