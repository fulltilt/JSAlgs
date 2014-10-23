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
// a tricky part of the whole storing min thing is that each stack each has its own min. The min on the left stack IS NOT
// necessarily the absolute min between both stacks . To get the min, we return the min value between both stacks
// NOTE: do NOT mix the min and max queue fxns together. Before switching between a max and min queue, call clear
// NOTE: in regards to what amortized cost is. Getting the length of an list, is an O(n) operation. However, if we were to 
//       keep track of the size as we add and delete, getting the size is O(1). Is this an example of amortized cost?
function ConstantQueue() {
	this.pushStack = [];
	this.popStack = [];
	this.minEnqueue = minEnqueue;
	this.minDequeue = minDequeue;
	this.maxEnqueue = maxEnqueue;
	this.maxDequeue = maxDequeue;
	this.getMin = getMin;
	this.getMax = getMax;
	this.clear = clear;
	this.toString = toString;
}

// add extra field that stores the minimum value
function minEnqueue(data) {
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

// add extra field that stores the maximum value
function maxEnqueue(data) {
	var size = this.pushStack.length;
	if (size === 0) {
		this.pushStack.push([data, data]);
		return;
	}

	var currentMax = this.pushStack[size - 1][1];
	if (data > currentMax) {
		this.pushStack.push([data, data]);
	} else {
		this.pushStack.push([data, currentMax]);
	}
}

// used for queue fxn with getMin
function minDequeue() {
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

// used for queue fxn with getMax
function maxDequeue() {
	if (this.popStack.length === 0 && this.pushStack.length === 0) {
		throw new Error('queue is empty');
	}

	if (this.popStack.length === 0) { // if popStack is empty, pop all the elements from pushStack and push it onto popStack
		// as we push items onto popStack, update the min value. By default, the first element is max
		var currentData = this.pushStack.pop()[0];
		this.popStack.push([currentData, currentData]);
		var currentMax = currentData;

		while (this.pushStack.length !== 0) {
			currentData = this.pushStack.pop()[0];
			
			if (currentData > currentMax) {
				this.popStack.push([currentData, currentData]);
				currentMax = currentData;
			} else {
				this.popStack.push([currentData, currentMax]);
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

function getMax() {
	if (this.popStack.length === 0 && this.pushStack.length === 0) {
		throw new Error('queue is empty');
	} else if (this.popStack.length === 0) {
		return this.pushStack[this.pushStack.length - 1][1];
	} else if (this.pushStack.length === 0) {
		return this.popStack[this.popStack.length - 1][1];
	} else {
		return Math.max(this.pushStack[this.pushStack.length - 1][1], this.popStack[this.popStack.length - 1][1]);
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