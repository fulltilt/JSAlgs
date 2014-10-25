var TwoStacks = require('../Stack.js');

describe("Stack", function() {
  var ts = new TwoStacks();

  beforeEach(function() {
    ts.push1(5);
    ts.push2(10);
    ts.push2(15);
    ts.push1(11);
    ts.push2(7);
  });

  it('tests push and pop for two stacks using a single array', function() {
    expect(ts.pop1()).toEqual(11);
    ts.push2(40);
    expect(ts.pop2()).toEqual(40);
  });
});
