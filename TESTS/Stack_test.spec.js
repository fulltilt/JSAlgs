var Stack = require('../Stack.js');

describe("Stack", function() {
  var s = new Stack.Stack(),
      ts = new Stack.TwoStacks();

  beforeEach(function() {
    s.clear();
    ts.dataStore = [];
  });

  it('tests push and pop for two stacks using a single array', function() {
    ts.push1(5);
    ts.push2(10);
    ts.push2(15);
    ts.push1(11);
    ts.push2(7);
    expect(ts.pop1()).toEqual(11);
    ts.push2(40);
    expect(ts.pop2()).toEqual(40);
  });

  it('tests isPalindrome', function() {
    expect(s.isPalindrome('hello')).toEqual(false);
    expect(s.isPalindrome('racecar')).toEqual(true);
    expect(s.isPalindrome(1001)).toEqual(true);
  });

  it('tests isParanthesesBalanced', function() {
    expect(s.isParenthesesBalanced('(')).toEqual(false);
    expect(s.isParenthesesBalanced('()')).toEqual(true);
    expect(s.isParenthesesBalanced('()()')).toEqual(true);
    expect(s.isParenthesesBalanced('(()')).toEqual(false);
    expect(s.isParenthesesBalanced(')')).toEqual(false);
    expect(s.isParenthesesBalanced('((()))')).toEqual(true);
    expect(s.isParenthesesBalanced('2.3 + 23 / 12 + (3.14159* .24)')).toEqual(true);
    expect(s.isParenthesesBalanced('2.3 + 23 / 12 + (3.14159* .24')).toEqual(false);
  });

  it('tests StackWithMin1', function() {
    var swm1 = new Stack.StackWithMin1();
    swm1.push(4);
    swm1.push(3);
    swm1.push(5);
    //console.log(swm1.stack);  // 4,3,5
    //console.log(swm1.aux);    // 4,3,3
    expect(swm1.getMin()).toEqual(3);
  });

  it('tests StackWithMin2', function() {
    var swm2 = new Stack.StackWithMin2();
    swm2.push(4); // 4
    swm2.push(3); // 4,2  // 2 * 3 - 4 = 2
    swm2.push(5); // 4,2,5
    expect(swm2.getMin()).toEqual(3);
    swm2.pop();   // 4,2  // 2 * 3 - 5 = 1
    expect(swm2.getMin()).toEqual(3);
    expect(swm2.pop()).toEqual(3);   // 3 // this.min = 2 * 3 - 2 = 4
    expect(swm2.getMin()).toEqual(4);
  });

  it('tests isStackSequence', function() {
    s.clear();
    expect(s.isStackSequence([1,2,3,4,5], [4,5,3,2,1])).toEqual(true);
    expect(s.isStackSequence([1,2,3,4,5], [4,3,5,1,2])).toEqual(false);
  });
});
