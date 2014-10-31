function Node(data) {
	this.data = data;
	this.next = null;
}

Node.prototype = {
	// Used to print from a specific Node. Used for Merge Sort algorithm
	printFromNode: function() {
		var output = '';
		var current = this;
		while (current !== null) {
			output += current.data + ' ';
			current = current.next;
		}
		return output.trim();
	}
};

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
	this.reverseFromNode = reverseFromNode;
	this.isPalindrome = isPalindrome;
	this.copyLinkedListWithArbitraryPtr = copyLinkedListWithArbitraryPtr;
	this.splitCircularListInTwo = splitCircularListInTwo;
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

function reverseFromNode(node) {
	var previous = null,
			current = node,
			next;

	while (current !== null) {
		next = current.next;
		current.next = previous;
		previous = current;
		current = next;
	}
	return previous;	// return the head of the reversed list
}

// http://www.geeksforgeeks.org/function-to-check-if-a-singly-linked-list-is-palindrome/
function isPalindrome(head) {
	var length = 0,
			current = head,
			midIndex,
			midStart;

	// get length
	while (current !== null) {
		length += 1;
		current = current.next;
	}

	// get middle node
	if (length % 2 === 0) {
		midIndex = Math.floor(length / 2) - 1;
		midStart = midIndex + 1;
	} else {
		midIndex = Math.floor(length / 2) - 1;
		midStart = midIndex + 2;	// exclude the middle element for odd length arrays
	}

	// get the median nodes. The first one will be reversed and compared to the second median node list
	var m1 = head,
			m2 = head,
			count = 0;
	while (count < midIndex) {
		m1 = m1.next;
		count += 1;
	}

	count = 0;
	while (count < midStart) {
		m2 = m2.next;
		count += 1;
	}
	m1.next = null;
	
	var list1Head = this.reverseFromNode(m2);	// reverse from the m2 Node (reverse returns the end of the list which is the head of the reversed list)

	while (m1 !== null && m2 !== null) {
		if (m1.data !== m2.data) {
			return false;
		}
		m1 = m1.next;
		m2 = m2.next;
	}

	return (m1 === null && m2 === null) ? true : false;
}

// http://www.geeksforgeeks.org/a-linked-list-with-next-and-arbit-pointer/
function copyLinkedListWithArbitraryPtr(head) {
	var current = head;

	// create new Nodes after each of the original Nodes all while setting the next pointers
	while (current !== null) {
		var newNode = new Node(current.data),
				nextNode = current.next;
		
		current.next = newNode;
		newNode.next =nextNode;
		current = nextNode; 
	}

	// set the arbitrary pointer (reuses the 'previous' variable for double linked lists)
	current = head;
	while (current !== null) {
		current.next.previous = current.previous.next;
		current = current.next.next;
	}

	// separate both lists
	current = head;
	var copyHead = head.next;
	while (current !== null) {
		var nextCopy = current.next;
		current.next = current.next.next;
		if (nextCopy.next !== null) {	// tricky part
			nextCopy.next = nextCopy.next.next;
		}
		current = current.next;
	}

	/* test that the order is the same
	current = head;
	count = 0;
	while (count < 5) {
		console.log(current.data);
		current = current.previous;count++;
	}

	count = 0;
	while (count < 5) {
		console.log(copyHead.data);
		copyHead = copyHead.previous;count++;
	}
	*/
}

// http://www.geeksforgeeks.org/split-a-circular-linked-list-into-two-halves/
function splitCircularListInTwo(head) {
	// get length of the circular list
	var length = 1,
			current = head.next;
	while (current !== head) {
		length += 1;
		current = current.next;
	}

	var mid = Math.floor(length / 2),
			count = 0,
			previous = null;
	current = head;
	while (count < mid) {
		previous = current;
		current = current.next;
		count += 1;
	}

	// split lists
	previous.next = head;	// create the first circular list

	// create the second circular list (note: current is currently pointing to the middle element)
	var midHead = current;
	while (true) {
		if (current.next !== head) {
			current = current.next;
		} else {
			break;
		}
	}
	current.next = midHead;

	/* test both lists
	count = 0;
	current = head;
	while (count < 5) {
		console.log(current.data);
		current = current.next;
		count += 1;
	}

	count = 0;
	current = midHead;
	while (count < 5) {
		console.log(current.data);
		current = current.next
		count += 1;
	}
	*/
}

// http://www.geeksforgeeks.org/pairwise-swap-elements-of-a-given-linked-list/
// swaps nodes
function swapPairwise() {
	if (this.head === null || this.head.next === null) {
		return;
	}

	var dummyHead = new Node(-1),
			previous = dummyHead,
			current = this.head,
			nextNode;

	dummyHead.next = this.head;
	while (current !== null) {
		nextNode = current.next;
		current.next = nextNode.next;
		nextNode.next = current;
		previous.next = nextNode;

		// do this step so the proceeding steps don't look so confusing
		var temp = nextNode;
		nextNode = current;
		current = temp;
		
		if (nextNode === this.head) {	// case for the initial swap
			this.head = current;
		}

		if (nextNode.next === null) {	// check to see if the next node and the node after that is null
			break;
		} else if (nextNode.next.next === null) {
			break;
		} else {	// make sure that we advance each pointer two spots up
			previous = current.next;
			current = nextNode.next;
			nextNode = nextNode.next.next;
		}
	}
	delete dummyNode;
}

// http://www.geeksforgeeks.org/delete-alternate-nodes-of-a-linked-list/
function deleteAlternating() {
	var current = this.head;
	while (current.next !== null) {
		nextNode = current.next;
		current.next = nextNode.next;
		delete nextNode;

		if (current.next === null) {	// for even length lists
			break;
		} else {
			current = current.next;
		}
	}
}

// http://www.geeksforgeeks.org/alternating-split-of-a-given-singly-linked-list/
function alternateSplit() {
	if (this.head === null || this.head.next === null) {
		return;
	}

	var current = this.head,
			nextNode = current.next;
			secondHead = nextNode;

	while (nextNode !== null) {
		current.next = nextNode.next;
		if (current.next !== null) {
			nextNode.next = current.next.next;
		} else {
			break;
		}

		current = current.next;
		nextNode = nextNode.next;
	}
	//console.log(secondHead.printFromNode());	// test that the second list works
}

// http://www.geeksforgeeks.org/reverse-a-list-in-groups-of-given-size/
// NOTE: I tried to do this iteratively but was way complicated. The recursive solution is so much easier since you don't have to worry about all those pointers
function reverseInKGroups(head, k) {
	var current = head,
			next = null,
			previous = null,
			count = 0;

	// reverse first k nodes of the list
	while (current !== null && count < k) {
		next = current.next;
		current.next = previous;
		previous = current;
		current = next;
		count += 1;
	}

	// next is now a pointer to the (k + 1)th Node. Recursively call for the list starting from current
	// and make rest of the list as next of first node
	if (next !== null) {
		head.next = this.reverseInKGroups(next, k);
	}

	// condition to change the head pointer for printing purposes
	if (head === this.head) {
		this.head = previous;
	}
	// previous is new head of the input list
	return previous;
}

// http://www.geeksforgeeks.org/delete-nodes-which-have-a-greater-value-on-right-side/
function deleteNodesWithGreaterValueOnRight() {
	var current = this.head,
			previous = null;

	while (current.next !== null) {
		if (current.next.data > current.data) {
			if (current === this.head) {
				this.head = current.next;
			} else {
				previous.next = current.next;
			}
		} else {	// tricky part: only update previous pointer if we don't remove a value
			previous = current;
		}

		current = current.next;
	}
}

// http://www.geeksforgeeks.org/segregate-even-and-odd-elements-in-a-linked-list/
// we could use 2 pointers and swap the data accordingly but this problem states that the numbers should stay in the same relative order
function segregateEvenAndOdd() {
	var oddHead = new Node(-1),
			evenHead = new Node(-1),
			currentOdd = oddHead,
			currentEven = evenHead,
			current = this.head;

	while (current !== null) {
		var next = current.next;
		if (current.data % 2 === 0) {
			currentEven.next = current;
			currentEven = currentEven.next;
		} else {
			currentOdd.next = current;
			currentOdd = currentOdd.next;
		}
		current.next = null;
		current = next;
	}
	currentEven.next = oddHead.next;	// join both lists
	this.head = evenHead.next;
}

// http://www.geeksforgeeks.org/add-two-numbers-represented-by-linked-lists/
function additionWithTwoLists(list1, list2) {
	list1.reverse();
	list2.reverse();

	var result = null,
			temp,
			previous = null,
			carry = 0,
			sum,
			num1Ptr = list1.head,
			num2Ptr = list2.head;

	while (num1Ptr !== null || num2Ptr !== null) {
		sum = (num1Ptr ? num1Ptr.data : 0) + (num2Ptr ? num2Ptr.data : 0) + carry;
		carry = (sum >= 10) ? 1 : 0;
		sum = sum % 10;

		var newNode = new Node(sum);
		if (result === null) {
			result = newNode;
		} else {
			previous.next = newNode;
		}

		previous = newNode;

		if (num1Ptr) {
			num1Ptr = num1Ptr.next;
		}
		if (num2Ptr) {
			num2Ptr = num2Ptr.next;
		}
	}

	if (carry > 0) {
		newNode.next = new Node(carry);
	}

	// reverse the result
	var previous = null,
			current = result,
			next;
	while (current !== null) {
		next = current.next;
		current.next = previous;
		previous = current;
		current = next;
	}
	return previous;
}

// http://www.geeksforgeeks.org/union-and-intersection-of-two-linked-lists/
// assumes each individual list has no duplicates
function unionAndIntersection(list1, list2) {
	var union = null,
			intersection = null,
			previousUnion,
			previousIntersection,
			current1 = list1.head,
			current2 = list2.head,
			table = {},
			data;

	// create union list
	while (current1 !== null) {
		data = current1.data;
		table[data] = 1;

		var newNode = new Node(current1.data);
		if (union === null) {
			union = newNode;
		} else {
			previousUnion.next = newNode;
		}
		previousUnion = newNode;
		current1 = current1.next;
	}

	while (current2 !== null) {
		data = current2.data;
		if (!table[data]) {
			var newNode = new Node(current2.data);
			if (union === null) {
				union = newNode;
			} else {
				previousUnion.next = newNode;
			}
			previousUnion = newNode;
		}
		current2 = current2.next;
	}

	// create intersection
	current1 = list1.head;
	current2 = list2.head;
	table = {};
	while (current1 !== null) {
		data = current1.data;
		table[data] = 1;

		current1 = current1.next;
	}

	while (current2 !== null) {
		data = current2.data;
		if (table[data]) {
			var newNode = new Node(current2.data);
			if (intersection === null) {
				intersection = newNode;
			} else {
				previousIntersection.next = newNode;
			}
			previousIntersection = newNode;	
		}
		current2 = current2.next;
	}

	// test output for union and intersection
	//console.log(union.printFromNode());
	//console.log(intersection.printFromNode());
}

// http://www.geeksforgeeks.org/rotate-a-linked-list/
function rotateList(list, k) {
	var current = list.head,
			count = 1;

	// to the kth element
	while (count < k) {
		current = current.next;
		count += 1;
	}

	var next = current.next,
			newHead = next;
	current.next = null;
	current = next;
	
	while (current.next !== null) {
		current = current.next;
	}

	current.next = list.head;
	return newHead;
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

/* NOTES
-a recurring problem is exiting out of the algorithm depending on whether the list is of even or odd length
-when swapping Nodes, a lot of the times it's easier to just swap the data. Swapping links is more efficient if there are a lot
 of fields to swap
-tip that i need to verify: for lists of varying lengths, it might be best to make the while loop conditional true and the logic to 
 determine when to break inside the loop 
-reverse is tricky as a typical reverse option starts at a node and every index after that is reversed all the way to the end.
 A trickier reverse operation is to reverse a sub-list inside the list
-a lot of added complexity is keeping track of the head node so I can print for testing purposes. During interviews, you are probably
 able to avoid that
-before setting 'current.next = null' in the middle of a list, make sure you get a reference to the next node and after setting current.next
 to null, set 'current = next':
 	var next = current.next,
			newHead = next;
	current.next = null;
	current = next;
*/

// PRACTICE: reverseInKGroups