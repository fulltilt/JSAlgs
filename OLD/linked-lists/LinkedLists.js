/* Define a Linked List
*/
function List() {
	this.head = null;
	this.tail = null;
	this.size = 0;

	List.makeNode = function(data) {
		return { data : data,
		         next : null
		       };
	}

	this.add = function(data) {
		if (this.head === null) {
			this.head = List.makeNode(data);
			this.tail = this.head;
		} else {
			this.tail.next = List.makeNode(data);
			this.tail = this.tail.next;
		}
		++this.size;
	}

	this.insertAtHead = function(data) {
		var newNode = List.makeNode(data);
		newNode.next = this.head;
		this.head = newNode;
		++this.size;
	}

	this.insertAfter = function(dataToInsertAfter, data) {
		var current = this.head;
		var newNode = List.makeNode(data);

		while (current !== null) {
			if (current.data === dataToInsertAfter) {
				newNode.next = current.next;
				current.next = newNode;
				if (current == this.tail) {
					this.tail = newNode;
				}
				return;
			}
			current = current.next;
		}
		++this.size;
	}

	this.delete = function(data) {
		var current = this.head;
		var previous = this.head;
		while (current !== null) {
			if (current.data === data) {
				if (current === this.head) {	// Node to delete is the head Node
					this.head = current.next;
					delete current;
					--this.size;
					return;
				}

				if (current === this.tail) {	// Node to delete is the tail Node
					previous.next = null;
					this.tail = previous;
					delete current;
					--this.size;
					return;
				}

				previous.next = current.next;
				delete current;
				--this.size;
			} 
			
			previous = current;
			current = current.next;
		}
	}

	this.get = function(index) {
		if (index >= this.size || index < 0) {
			throw "Invalid index!!";
		}

		var current = this.head;
		for (var i = 0; i < index; i++) {
			current = current.next;
		}

		return current;
	}

	this.getSize = function() {
		return this.size;
	}

	this.print = function() {
		
		var current = this.head;
		while (current !== null) {
			console.log(current.data + " ");
			current = current.next;
		}
		console.log();
		
		//this.forEach(function(item) { console.log(item.data);});
	}

	this.forEach = function(f) {
		var current = this.start;
		while (current !== null) {
			f(current);
			current = current.next;
		}
	}
}

// test cases for add and delete 
/*
console.log('\nTesting List()...');
var list = new List();
for (var i = 0; i < 10; ++i) {
	list.add(i);
}
list.print();
list.delete(5);
list.print();
list.delete(0);
list.print();
list.delete(9);
list.print();
list.insertAfter(4,5);
list.print();
list.insertAfter(8,9);
list.print();
list.add(10);
list.print();
console.log(list.get(6).data);
list.get(-1);
*/

/* Implement a Stack using a Linked List
*/
function Stack() {
	var stack = new List();
	
	this.getSize = function() {
		return stack.getSize();
	}

	this.push = function(data) {
		stack.insertAtHead(data);
	}

	this.pop = function() {
		if (stack.getSize() === 0) {
			throw "Stack is empty!!!";
		}

		var top = stack.get(0).data;
		stack.delete(top);
		return top;
	}
}

/*
console.log('\nTesting Stack()...');
var s = new Stack();
s.push(5);
console.log('size: ' + s.getSize());
s.push(3);
console.log('size: ' + s.getSize());
console.log(s.pop());
console.log('size: ' + s.getSize());
console.log(s.pop());
s.pop();
*/

/*
 * Devise a time and space efficient algorithm to find the mth-to-last element
 * of a singly linked list.
 */
var getKthToLast = function(list, k) {
	if (k > list.getSize() || k < 1) {
		throw "Invalid index!!";
	}
	
	var slow = list.head;
	var fast = list.head;
	for (var i = 1; i <= k; i++) {
		fast = fast.next;
	}

	while (fast !== null) {
		slow = slow.next;
		fast = fast.next;
	}

	return slow;
}

/*
console.log('\nTesting getKthToLast()...');
var list = new List();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.add(6);
list.add(7);
list.add(8);
console.log(getKthToLast(list, 7).data);
*/
