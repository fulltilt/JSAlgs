function Node(data) {
	this.data = data;
	this.next = null;

	this.printFromNode = printFromNode;
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
	
	this.hasCycle = hasCycle;
	this.getCycleEntry = getCycleEntry;
	this.getNthFromEnd = getNthFromEnd;
	this.reverse = reverse;
	this._reverse = _reverse;
	this.isPalindrome = isPalindrome;
	this.copyLinkedListWithArbitraryPtr = copyLinkedListWithArbitraryPtr;
	this.splitCircularListInTwo = splitCircularListInTwo;
	this.printAlternating = printAlternating;
	this.swapPairwise = swapPairwise;
	this.deleteAlternating = deleteAlternating;
	this.alternateSplit = alternateSplit;
	this.reverseInKGroups = reverseInKGroups;
	this.deleteNodesWithGreaterValueOnRight = deleteNodesWithGreaterValueOnRight;
	this.segregateEvenAndOdd = segregateEvenAndOdd;
	this.additionWithTwoLists = additionWithTwoLists;
	this.unionAndIntersection = unionAndIntersection;
	this.rotateList = rotateList;
	this.LRUCache = LRUCache;
	this.flattenList = flattenList;
	this.sortZeroesOnesTwos = sortZeroesOnesTwos;
	this.deleteNNodesAfterMNodes = deleteNNodesAfterMNodes;
	this.reverseAlternateAndAppendAtEnd = reverseAlternateAndAppendAtEnd;
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

// setting the current Node to null isn't quite working. Will have to look into how to do this correctly
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
//console.log(output);
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

// Used to print from a specific Node. Used for Merge Sort algorithm
function printFromNode() {
	var output = '';
	var current = this;
	while (current !== null) {
		output += current.data + ' ';
		current = current.next;
	}
	return output.trim();
}

/* Sorts a linked list and returns the head of the sorted list (note: the algorithm reorders the list nodes but doesn't update the head or any LinkedList
   specific fields. Just think of it as a bunch of Nodes linked together and not as a unifying LinkedList)

	You need 3 functions: the _mergeSort() function does error checking any splits the list in half using the auxiliary getMiddle() fxn. From here, we merge the
	lists using the merge() fxn which orders the nodes
*/
function mergeSort() {
	return this._mergeSort(this.head);
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

// merge 2 lists (exactly the same as mergeSortedLists() but the return values are different and this version is more concise)
function merge(a, b) {
	var dummyHead = new Node();
	var current = dummyHead;

	// merge both lists together in sorted order
	while (a !== null && b !== null) {
		if (a.data <= b.data) {
			current.next = a;
			a = a.next;
		} else {
			current.next = b;
			b = b.next;
		}
		current = current.next;
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

/* Take two sorted arrays and return a merged sorted array. Arguments are the nodes that points to each lists head. This makes this 
   function reusable in merge sort. This makes this tricky as you don't think of it as a List itself but as a manipulation of a bunch of
   Nodes. You don't have to worry about the head pointer because of this. It is also helpful to use a dummyNode which will be the entry
   point for the new 'List'
*/
function mergeSortedLists(list1Head, list2Head) {
	if (list1Head === null && list2Head === null) {
		return null;
	} else if (list1Head === null) {
		return list2Head;
	} else if (list2Head === null) {
		return list1Head;
	}

	var dummyHead = new Node(),
			newListPtr = dummyHead,
			list1Ptr = list1Head,
			list2Ptr = list2Head;

	// iterate through both arrays and arrange nodes in order onto a new list
	while (list1Ptr !== null && list2Ptr !== null) {
		if (list1Ptr.data <= list2Ptr.data) {
			newListPtr.next = list1Ptr;
			list1Ptr = list1Ptr.next;
		} else {
			newListPtr.next = list2Ptr;
			list2Ptr = list2Ptr.next;
		}
		newListPtr = newListPtr.next;
	}	
	
	// deal with leftovers
	newListPtr.next = (list1Ptr === null) ? list2Ptr : list1Ptr;

	return dummyHead.next.printFromNode(); // form output from the head node and print the rest of the list (have to do this as the algorithm deals with nodes and not lists)
}

/* Question 16 How do you check whether there is a loop in a linked list? */
function hasCycle() {
	if (this.head === null) {
		return false;
	}

	var slow = fast = this.head;

	while (fast.next !== null && fast.next.next !== null) {
		slow = slow.next;
		fast = fast.next.next;

		if (slow === fast) {
			return true;
		}
	}

	return false;
}

/* Question 17: If there is a loop in a linked list, how do you get the entry node of the loop? The entry node is 
the first node in the loop from the head of a list. For instance, the entry node of the loop in the list of Figure 3-9 is 
the node with value 3.
-algorithm: first confirm that the list has a cycle. From the point you found the cycle, iterate through the loop until you
 come back to the original point all while iterating a count for the length of the cycle. The next part I still don't know why it 
 works but you set 2 pointers to the beginning. One of the pointers traverses the length of the cycle. From here, both pointers 
 move in step and where they finally meet is the entry point of the cycle
*/
function getCycleEntry() {
	if (!this.hasCycle) {
		return null;
	}

	// we confirmed there is a cycle so get the cycle length
	var slow = fast = this.head, cycleLength = 0;
	while (fast.next !== null && fast.next.next !== null) {
		slow = slow.next;
		fast = fast.next.next;

		if (slow === fast) {	// found cycle now determing the length of the cycle
			fast = slow.next;
			++cycleLength;
			while (fast !== slow) {
				++cycleLength;
				fast = fast.next;
			}
			break;
		}
	}

	slow = fast = this.head;
	for (var i = 0; i < cycleLength; i++) {
		fast = fast.next;
	}
	while (true) {
		slow = slow.next;
		fast = fast.next;

		if (slow === fast) {
			return slow;
		}
	}
}

function getNthFromEnd(n) {
	if (n < 0 || n > this.size) {
		throw new Error('Invalid n');
	}

	var slow = fast = this.head;
	for (var i = 0; i < n; i++) {
		fast = fast.next;
	}

	while (fast !== null) {
		slow = slow.next;
		fast = fast.next;
	}

	return slow.data;
}

function reverse() {
	this._reverse(null, this.head);
}

function _reverse(previous, node) {
	if (node === null) {
		this.head = previous;
		return;
	}

	this._reverse(node, node.next);
	node.next = previous;
}

// http://www.geeksforgeeks.org/function-to-check-if-a-singly-linked-list-is-palindrome/
function isPalindrome(list) {

}

// http://www.geeksforgeeks.org/a-linked-list-with-next-and-arbit-pointer/
function copyLinkedListWithArbitraryPtr(list) {

}

// http://www.geeksforgeeks.org/split-a-circular-linked-list-into-two-halves/
function splitCircularListInTwo(list) {

}

// http://www.geeksforgeeks.org/practice-questions-for-linked-list-and-recursion/
function printAlternating() {

}

// http://www.geeksforgeeks.org/pairwise-swap-elements-of-a-given-linked-list/
function swapPairwise() {

}

// http://www.geeksforgeeks.org/delete-alternate-nodes-of-a-linked-list/
function deleteAlternating() {

}

// http://www.geeksforgeeks.org/alternating-split-of-a-given-singly-linked-list/
function alternateSplit() {

}

// http://www.geeksforgeeks.org/reverse-a-list-in-groups-of-given-size/
function reverseInKGroups() {

}

// http://www.geeksforgeeks.org/delete-nodes-which-have-a-greater-value-on-right-side/
function deleteNodesWithGreaterValueOnRight() {

}

// http://www.geeksforgeeks.org/segregate-even-and-odd-elements-in-a-linked-list/
function segregateEvenAndOdd() {

}

// http://www.geeksforgeeks.org/add-two-numbers-represented-by-linked-lists/
function additionWithTwoLists(list1, list2) {

}

// http://www.geeksforgeeks.org/union-and-intersection-of-two-linked-lists/
function unionAndIntersection(list1, list2) {

}

// http://www.geeksforgeeks.org/rotate-a-linked-list/
function rotateList(list, k) {

}

// http://www.geeksforgeeks.org/flattening-a-linked-list/ or http://www.geeksforgeeks.org/flatten-a-linked-list-with-next-and-child-pointers/
function flattenList(list) {

}

// http://www.geeksforgeeks.org/sort-a-linked-list-of-0s-1s-or-2s/
function sortZeroesOnesTwos(list) {

}

// http://www.geeksforgeeks.org/delete-n-nodes-after-m-nodes-of-a-linked-list/
function deleteNNodesAfterMNodes(list) {

}

// http://www.geeksforgeeks.org/given-linked-list-reverse-alternate-nodes-append-end/
function reverseAlternateAndAppendAtEnd(list) {

}

// http://www.geeksforgeeks.org/implement-lru-cache/
function LRUCache() {

}

// STAR PROBLEMS
// http://www.geeksforgeeks.org/sorted-linked-list-to-balanced-bst/

module.exports = LinkedList;