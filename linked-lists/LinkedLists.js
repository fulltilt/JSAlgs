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
	}

	this.delete = function(data) {
		var current = this.head;
		var previous = this.head;
		while (current !== null) {
			if (current.data === data) {
				if (current === this.head) {	// Node to delete is the head Node
					this.head = current.next;
					delete current;
					return;
				}

				if (current === this.tail) {	// Node to delete is the tail Node
					previous.next = null;
					this.tail = previous;
					delete current;
					return;
				}

				previous.next = current.next;
				delete current;
			} 
			
			previous = current;
			current = current.next;
		}
		--this.size;
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