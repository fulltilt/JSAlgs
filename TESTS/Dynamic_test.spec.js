var Dynamic = require('../Dynamic.js');

describe("Dynamic", function() {
  var d = new Dynamic();

  it("tests longest common substring", function() {
    expect(d.lcs('back', 'cace')).toEqual('ac');
    expect(d.lcs('abbcc', 'dbbcc')).toEqual('bbcc');
    expect(d.lcs('abbcc', 'dbbccc')).toEqual('bbcc');
    expect(d.lcs('abbcc', 'vsz')).toEqual('');
  });

  it('tests both knapsack problem versions', function() {
    var value = [4,5,10,11,13];
    var size = [3,4,7,8,9];
    var capacity = 16;
    var n = 5;
    expect(d.recursiveKnapsack(capacity, size, value, n)).toEqual(23);
    expect(d.dynamicKnapsack(capacity, size, value, n)).toEqual(23);
  })
});