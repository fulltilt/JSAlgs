var Dynamic = require('../Dynamic.js');

describe("Dynamic", function() {
  var d = new Dynamic();

  it('tests nthFibonacci', function() {
    expect(d.nthFibonacciIterative(45)).toEqual(1836311903);
    expect(d.nthFibonacciRecursive(45, [])).toEqual(1836311903);
  });

  it('tests both knapsack problem versions', function() {
    var value = [4,5,10,11,13];
    var size = [3,4,7,8,9];
    var capacity = 16;
    var n = 5;
    //expect(d.recursiveKnapsack(capacity, size, value, n)).toEqual(23);
    //expect(d.dynamicKnapsack(capacity, size, value, n)).toEqual(23);
    expect(d.recursiveKnapsack(capacity, size, value, 0)).toEqual(23);

    var table = [],
        length = size.length, i, j;

    for (i = 0; i <= capacity; i++) {
      table[i] = [];
      for (j = 0; j < length; j++) {
        table[i][j] = -1;
      }
    }

    expect(d.dynamicKnapsack(capacity, size, value, 0, table)).toEqual(23);
    //console.log(table);
  });

  it('tests dynamicCoinChange', function() {
    var sum = 11,
        values = [1, 3, 5],
        table = [], i, j;
    //expect(d.dynamicCoinChange(sum, values)).toEqual(3);
    //expect(d.dynamicCoinChange(15, [1,3,9,10])).toEqual(3);
    
    for (i = 0; i <= sum; ++i) {
      table[i] = [];
      for (j = 0; j < values.length; j++) {
        table[i][j] = 0;
      }
    }

    expect(d.dynamicCoinChange(sum, values, 0, table)).toEqual(3);

    sum = 15;
    values = [1,3,9,10];
    table = [];

    for (i = 0; i <= sum; ++i) {
      table[i] = [];
      for (j = 0; j < values.length; j++) {
        table[i][j] = 0;
      }
    }
    expect(d.dynamicCoinChange(sum, values, 0, table)).toEqual(3);    
  });

  it('tests longestIncreasingSequence', function() {
    var values = [5, 3, 4, 8, 6, 7];
    expect(d.longestIncreasingSequence(values)).toEqual([3,4,8]);
    values = [4, 5, 6, 2, 4, 9, 10, 4, 5, 6, 7, 10, 30, 4, 5];
    expect(d.longestIncreasingSequence(values)).toEqual([4,5,6,7,10,30]);
  });

  it('tests longestIncreasingSubsequence', function() {
    expect(d.longestIncreasingSubsequence([10, 22, 9, 33, 21, 50, 41, 60, 80])).toEqual(6);
    expect(d.longestIncreasingSubsequence([-7.10,9,2,3,3,8,8,1])).toEqual(4);
  });

  it('tests longest common subsequence', function() {
    expect(d.longestCommonSubsequence('ABCDGH', 'AEDFHR')).toEqual(3);
    expect(d.longestCommonSubsequence('AGGTAB', 'GXTXAYB')).toEqual(4);
  });

  it("tests longest common substring", function() {
    expect(d.longestCommonSubstring('back', 'cace')).toEqual(2);
    expect(d.longestCommonSubstring('abbcc', 'dbbcc')).toEqual(4);
    expect(d.longestCommonSubstring('abbcc', 'dbbccc')).toEqual(4);
    expect(d.longestCommonSubstring('abbcc', 'vsz')).toEqual(0);
    expect(d.longestCommonSubstring('helohelhello', 'hello')).toEqual(5);

    expect(d.longestCommonSubstring2('back', 'cace')).toEqual('ac');
    expect(d.longestCommonSubstring2('abbcc', 'dbbcc')).toEqual('bbcc');
    expect(d.longestCommonSubstring2('abbcc', 'dbbccc')).toEqual('bbcc');
    expect(d.longestCommonSubstring2('aafweajfiewajofij309afweajfiewajofij309u90sduf3j32oi22u90sduf3j32oi22bbcc', '2gdfgsf23afweaafweajfiewajofij309u90sduf3j32oi22jfiewajofij309u90sduf3j32oi22mbnmm3454354')).toEqual('afweajfiewajofij309u90sduf3j32oi22');
    expect(d.longestCommonSubstring2('aafwesdajfiewajofij309sdsu90sduff3j32oi22bbcc', '2gdfgsf23afweaafweajfiewajofij309u90sduf3j32oi22jfiewajofij309u90sduf3j32oi22mbnmm3454354')).toEqual('ajfiewajofij309');
    expect(d.longestCommonSubstring2('abbcc', 'vsz')).toEqual('');
    expect(d.longestCommonSubstring2('helohelhello', 'hello')).toEqual('hello');
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

  it('tests editDistance', function() {
    expect(d.editDistance('SATURDAY', 'SUNDAY')).toEqual(3);
  });

  it('tests largestContiguousSumSubarray', function() {
    var arr = [-2, -3, 4, -1, -2, 1, 5, -3];
    expect(d.largestContiguousSumSubarray(arr)).toEqual(7);
  });

  it('tests maxSumOfNonAdjacentElements', function() {
    //expect(d.maxSumOfNonAdjacentElements([5,  5, 10, 40, 50, 35])).toEqual(80);
  });
});