var Dynamic = require('../Dynamic.js');

describe("Dynamic", function() {
  var d = new Dynamic();

  it("tests longest common substring", function() {
    expect(d.longestCommonSubsequence('back', 'cace')).toEqual('ac');
    expect(d.longestCommonSubsequence('abbcc', 'dbbcc')).toEqual('bbcc');
    expect(d.longestCommonSubsequence('abbcc', 'dbbccc')).toEqual('bbcc');
    expect(d.longestCommonSubsequence('aafweajfiewajofij309afweajfiewajofij309u90sduf3j32oi22u90sduf3j32oi22bbcc', '2gdfgsf23afweaafweajfiewajofij309u90sduf3j32oi22jfiewajofij309u90sduf3j32oi22mbnmm3454354')).toEqual('afweajfiewajofij309u90sduf3j32oi22');
    expect(d.longestCommonSubsequence('abbcc', 'vsz')).toEqual('');
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

  it('tests longestIncreasingSubsequence', function() {
    expect(d.longestIncreasingSubsequence([10, 22, 9, 33, 21, 50, 41, 60, 80])).toEqual(6);
  });

  it('tests word break', function() {
    expect(d.wordBreak(['i', 'like', 'sam', 'sung', 'samsung', 'mobile', 'ice', 'cream', 'icecream', 'man', 'go', 'mango'], 'ilikesamsung')).toEqual(true);
    expect(d.wordBreak(['i', 'like', 'sam', 'sung', 'samsung', 'mobile', 'ice', 'cream', 'icecream', 'man', 'go', 'mango'], 'creamilikesamicesung')).toEqual(true);
    expect(d.wordBreak(['i', 'like', 'sam', 'sung', 'samsung', 'mobile', 'ice', 'cream', 'icecream', 'man', 'go', 'mango'], 'creamilikesamicecat')).toEqual(false);
  });

  it('tests maxWines', function() {
    var arr = [2,3,5,1,4],
        cache = [],
        length = arr.length;

    for (var i = 0; i < length; i++) {
      cache[i] = [];
      for (var j = 0; j < length; j++) {
        cache[i][j] = -1;
      }      
    }

    expect(d.maxWines(arr, cache, 0, length - 1)).toEqual(50);
  });

  it('tests largestContiguousSumSubarray', function() {
    var arr = [-2, -3, 4, -1, -2, 1, 5, -3];
    expect(d.largestContiguousSumSubarray(arr)).toEqual(7);
  });

  it('tests maxSumOfNonAdjacentElements', function() {
    //expect(d.maxSumOfNonAdjacentElements([5,  5, 10, 40, 50, 35])).toEqual(80);
  });
});