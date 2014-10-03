var Dynamic = require('../Dynamic.js');

describe("Dynamic", function() {
  var d = new Dynamic();

  it("tests longest common substring", function() {
    expect(d.lcs('back', 'cace')).toEqual('ac');
    expect(d.lcs('abbcc', 'dbbcc')).toEqual('bbcc');
    expect(d.lcs('abbcc', 'dbbccc')).toEqual('bbcc');
    expect(d.lcs('aafweajfiewajofij309afweajfiewajofij309u90sduf3j32oi22u90sduf3j32oi22bbcc', '2gdfgsf23afweaafweajfiewajofij309u90sduf3j32oi22jfiewajofij309u90sduf3j32oi22mbnmm3454354')).toEqual('afweajfiewajofij309u90sduf3j32oi22');
    expect(d.lcs('abbcc', 'vsz')).toEqual('');
  });

  it('tests both knapsack problem versions', function() {
    var value = [4,5,10,11,13];
    var size = [3,4,7,8,9];
    var capacity = 16;
    var n = 5;
    expect(d.recursiveKnapsack(capacity, size, value, n)).toEqual(23);
    expect(d.dynamicKnapsack(capacity, size, value, n)).toEqual(23);
  });

  it('tests dynamicCoinChange', function() {
    var sum = 11;
    var values = [1, 3, 5];
    expect(d.dynamicCoinChange(sum, values)).toEqual(3);
  });

  it('tests longestIncreasingSequence', function() {
    var values = [5, 3, 4, 8, 6, 7];
    expect(d.longestIncreasingSequence(values)).toEqual([3,4,8]);
    values = [4, 5, 6, 2, 4, 9, 10, 4, 5, 6, 7, 10, 30, 4, 5];
    expect(d.longestIncreasingSequence(values)).toEqual([4,5,6,7,10,30]);
  });
});