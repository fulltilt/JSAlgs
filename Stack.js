function Stack() {
	this.dataStore = [];
	this.top = 0;
	this.push = push;
	this.pop = pop;
	this.peek = peek;
	this.length = length;
	this.clear = clear;
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

function length() {
	return this.top;
}

function clear() {
	this.top = 0;
}

// Test #1
var s = new Stack();
s.push("David");
s.push("Raymond");
s.push("Bryan");
console.log("length: " + s.length());
console.log(s.peek());
var popped = s.pop();
console.log("The popped element is: " + popped);
console.log(s.peek());
s.push("Cynthia");
console.log(s.peek());
s.clear();
console.log("length: " + s.length());
console.log(s.peek());
s.push("Clayton");
console.log(s.peek());


// Palindrome tester
var isPalindrome = function(word) {
	if (typeof word === 'number')
		word = word.toString();

	var stack = new Stack();
	for (var i = 0; i < word.length; i++)
		stack.push(word.charAt(i));

  for (i = 0; i < word.length; i++)
		if (word[i] !== stack.pop())
			return false;

	return true;
};

console.log(isPalindrome('hello'));
console.log(isPalindrome('racecar'));
console.log(isPalindrome(1001));


// Balanced parentheses
var isParenthesesBalanced = function(expression) {
	var stack = new Stack();
	for (var i = 0; i < expression.length; i++) {
		if (expression[i] === ')') {
			if (stack.length() === 0)
				return i;
			else
				stack.pop();
		} else if (expression[i] === '(') {
			stack.push(i);
		}
	}

	if (stack.length() === 0)
		return true;
	else
		return stack.pop();
};

console.log(isParenthesesBalanced('('));
console.log(isParenthesesBalanced('()'));
console.log(isParenthesesBalanced('()()'));
console.log(isParenthesesBalanced('(()'));
console.log(isParenthesesBalanced(')'));
console.log(isParenthesesBalanced('((()))'));
console.log(isParenthesesBalanced('2.3 + 23 / 12 + (3.14159* .24)'));
console.log(isParenthesesBalanced('2.3 + 23 / 12 + (3.14159* .24'));

// Infix to postfix	
// .....

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

module.exports = TwoStacks;