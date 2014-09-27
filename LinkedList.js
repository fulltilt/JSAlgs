function Node(element) {
	this.element = element;
	this.next = null;
}

function LinkedList() {
	this.head = null;
	this.find = find;
	this.insert = insert;
	this.remove = remove;
	this.display = display;
}

function find(item) {
	var currentNode = this.head;
	while (currentNode !== null)
		if(currentNode.element === item)
			return currentNode;
		else
			currentNode = currentNode.next;

	return null;
}

function insert(item, after) {
	var node = new Node(item);
	if (this.head === null) {
		this.head = node;
		return;
	}

	
}