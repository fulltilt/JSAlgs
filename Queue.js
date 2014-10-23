function Queue() {
	this.dataStore = [];
	this.enqueue = enqueue;
	this.dequeue = dequeue;
	this.front = front;
	this.back = back;
	this.toString = toString;
	this.isEmpty = isEmpty;
}

function enqueue(element) {
	this.dataStore.push(element);
}

function dequeue() {
	this.dataStore.shift();
}

function front() {
	if (this.dataStore.length > 0)
		return this.dataStore[0];
}

function back() {
	if (this.dataStore.length > 0)
		return this.dataStore[this.dataStore.length - 1];
}

function toString() {
	var retStr = "";
	for (var i = 0; i < this.dataStore.length; ++i) {
		retStr += this.dataStore[i] + "\n";
	}
	return retStr;
}

function isEmpty() {
	return this.dataStore.length === 0;
}

// implementation of a queue where enqueue, dequeue and getMin are all constant time operations
// http://stackoverflow.com/questions/4802038/implement-a-queue-in-which-push-rear-pop-front-and-get-min-are-all-consta
function ConstantQueue() {
	this.pushStack = [];
	this.popStack = [];
	this.enqueue = enqueue2;
	this.dequeue = dequeue2;
	this.getMin = getMin;
	this.clear = clear;
	this.toString = toString;
}

function enqueue2(data) {
	var size = this.pushStack.length;
	if (size === 0) {
		this.pushStack.push([data, data]);
		return;
	}

	var currentMin = this.pushStack[size - 1][1];
	if (data < currentMin) {
		this.pushStack.push([data, data]);
	} else {
		this.pushStack.push([data, currentMin]);
	}
}

function dequeue2() {
	if (this.popStack.length === 0 && this.pushStack.length === 0) {
		throw new Error('queue is empty');
	}

	if (this.popStack.length === 0) {	// if popStack is empty, pop all the elements from pushStack and push it onto popStack
		// as we push items onto popStack, update the min value. By default, the first element is min
		var currentData = this.pushStack.pop()[0];
		this.popStack.push([currentData, currentData]);
		var currentMin = currentData;

		while (this.pushStack.length > 0) {
			currentData = this.pushStack.pop()[0]
			
			if (currentData < currentMin) {
				this.popStack.push([currentData, currentData]);
				currentMin = currentData;
			} else {
				this.popStack.push([currentData, currentMin]);
			}
		}
	}

	return this.popStack.pop();
}

function getMin() {
	if (this.popStack.length === 0 && this.pushStack.length === 0) {
		throw new Error('queue is empty');
	} else if (this.popStack.length === 0) {
		return this.pushStack[this.pushStack.length - 1][1];
	} else if (this.pushStack.length === 0) {
		return this.popStack[this.popStack.length - 1][1];
	} else {
		return Math.min(this.pushStack[this.pushStack.length - 1][1], this.popStack[this.popStack.length - 1][1]);
	}
}

function clear() {
	this.pushStack = [];
	this.popStack = [];
}

function toString() {
	return this.pushStack;
}

module.exports = ConstantQueue;