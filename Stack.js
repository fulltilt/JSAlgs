function Stack() {
	this.dataStore = [];
	this.top = 0;
	this.push = push;
	this.pop = pop;
	this.peek = peek;
	this.size = size;
	this.clear = clear;
	this.isPalindrome = isPalindrome;
	this.isParenthesesBalanced = isParenthesesBalanced;
	this.infixToPostfix = infixToPostfix;
	this.isStackSequence = isStackSequence;
}

function push(element) {
	this.dataStore[this.top++] = element;
}

function pop() {
	if (this.top !== 0)
		return this.dataStore[--this.top];
}

function peek() {
	return this.dataStore[this.top - 1];
}

function size() {
	return this.dataStore.length;
}

function clear() {
	this.top = 0;
	this.dataStore = [];
}

// Palindrome tester
function isPalindrome(word) {
	if (typeof word === 'number')
		word = word.toString();

	for (var i = 0; i < word.length; i++)
		this.dataStore.push(word.charAt(i));

  for (i = 0; i < word.length; i++)
		if (word[i] !== this.dataStore.pop())
			return false;

	return true;
};

// Balanced parentheses
function isParenthesesBalanced(expression) {
	for (var i = 0; i < expression.length; i++) {
		if (expression[i] === ')') {
			if (this.size() === 0)
				return false;
			else
				this.dataStore.pop();
		} else if (expression[i] === '(') {
			this.dataStore.push(i);
		}
	}

	var result = this.size() === 0;
	this.dataStore = [];
	return result;
};

// Infix to postfix	
function infixToPostfix(str) {

}

// Apress #56: You are given two integer arrays, one of which is a sequence of numbers pushed into a stack 
// (supposing all numbers are unique). Please check whether the other array is a corresponding sequence popped from the stack
function isStackSequence(arr) {

}

// Apress #55: Define a stack in which we can get its minimum number with a function min. The time complexity of min, push, and pop on such stacks are all O(1)
function StackWithMin1() {
	this.stack = [],
	this.aux = [];
}

StackWithMin1.prototype = {
	push: function(val) {
		this.stack.push(val);
		if (this.aux.length === 0 || (this.aux.length > 0 && val < this.aux[this.aux.length - 1])) {
			this.aux.push(val);
		} else {
			this.aux.push(this.aux[this.aux.length - 1]);
		}
	},

	pop: function() {
		if (this.stack.length === 0) {
			throw new Error('Empty stack!');
		}

		var result = this.stack[this.stack.length - 1];
		this.stack.pop();
		this.aux.pop();
		
		return result;
	},

	getMin: function() {
		if (this.stack.length === 0) {
			throw new Error('Empty stack!');
		}

		return this.aux[this.aux.length - 1];
	}
}

function StackWithMin2() {
	this.stack = [],
	this.min;
}

StackWithMin2.prototype = {
	push: function(val) {
		if (this.stack.length === 0) {
			this.stack.push(val);
			this.min = val;
		} else if (val >= this.min) {
			this.stack.push(val);
		} else {
			this.stack.push(2 * val - this.min);
			this.min = val;
		}
	},

	pop: function() {
		if (this.stack.length === 0) {
			throw new Error('Empty stack!');
		}

		var top = this.stack[this.stack.length - 1],
				tempMin = this.min;
		// if top number is less than this.min, this isn't the real value. Recalculate 
		if (top < this.min) {
			this.min = 2 * this.min - this.stack[this.stack.length - 1];
		}

		this.stack.pop();
		return tempMin;
	},

	getMin: function() {
		if (this.stack.length === 0) {
			throw new Error('Empty stack!');
		}

		return this.min;		
	}
}

// http://www.geeksforgeeks.org/implement-two-stacks-in-an-array/
// Implementing two stacks using a single array. Starting indices for each stack are at opposite ends of the array and the stacks grow in opposite directions
function TwoStacks(n) {
	this.arr = [];
	this.size = n;
	this.top1 = -1;
	this.top2 = this.size;
	this.push1 = push1;
	this.push2 = push2;
	this.pop1 = pop1;
	this.pop2 = pop2;
}

function push1(data) {
	if ((this.top1 + 1) !== this.top2) {
		this.arr[++this.top1] = data;
	} else {
		throw new Error('reached capacity');
	}
}

function push2(data) {
	if ((this.top2 - 1) !== this.top1) {
		this.arr[--this.top2] = data;
	}	else {
		throw new Error('reached capacity');
	}
}

function pop1() {
	if (this.top1 !== -1) {
		return this.arr[this.top1--];
	} else {
		throw new Error('stack is empty');
	}
}

function pop2() {
if (this.top2 !== this.size) {
		return this.arr[this.top2++];
	} else {
		throw new Error('stack is empty');
	}	
}

function isStackSequence(pushSeq, popSeq) {
	var aux = [],
			popPtr = 0, 
			length = pushSeq.length, i;

	for (i = 0; i < length; i++) {
		aux.push(pushSeq[i]);
		while (aux[aux.length - 1] === popSeq[popPtr] && popPtr < length) { // NOTE: [] === (array index out of bounds) is true hence the 2nd conditional
			aux.pop();
			popPtr += 1;
		}
	}

	return aux.length === 0;
}

var Stack = function() {
  return {
    Stack: Stack,
    TwoStacks: TwoStacks,
    StackWithMin1: StackWithMin1,
    StackWithMin2: StackWithMin2
  }
}();

module.exports = Stack;