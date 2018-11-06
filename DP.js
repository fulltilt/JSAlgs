/*
-I'm finding that good examples are really important it has to be short enough so that the example doesn't
 take too long to get through but long enough that it can expose flaws in your logic and find corner cases
 you didn't take into account
-when whiteboarding and building out the table, leave ample room for the padding column/row in case you need it
-sometimes you will fill out the table and it makes sense until you get near the end and you get a result that
 doesn't jive with your logic even though it makes sense (see Longest Common Substring). In that case, for 
 now just say that the table is always right and modify the inner logic accordingly
-I'm running into a lot of cases where I'm building out the table and my results and resulting inner logic works
 out but it doesn't jive completely with the algo Tushar has meaning I'm potentially doing something non-optimal or 
 doesn't work for all cases


Things to revisit:
https://www.youtube.com/watch?v=WxpIHvsu1RI

Catalan Numbers
*/

/* Optimal Strategy Game Pick from Ends of array (https://www.youtube.com/watch?v=WxpIHvsu1RI)
N pots, each with some number of gold coins, are arranged   in a line. You are playing a game against 
another player. You take turns picking a pot of gold. You may pick a pot from either end of the line, 
remove the pot, and keep the gold pieces. The player with the most gold at the end wins. Develop a 
strategy for playing this game
*/


function kadane(arr) {
  let max = Math.max(0, arr[0]);
  let currentSum = arr[0];

  for (let i = 1; i < arr.length; ++i) {
    currentSum += arr[i];

    if (currentSum < 0) {
      currentSum = 0;
    }

    if (currentSum > max) {
      max = currentSum;
    }
  }

  return max;
}
// console.log(kadane([-2,-3,4,-1,-2,1,5,-3])); // 7


function fibonacci(n) {
  let i = 2;
  let table = [0, 1];

  if (n === 0 || n === 1) {
    return table[i];
  }
  
  while (i <= n) {
    table[i] = table[i - 2] + table[i - 1];
    ++i;
  }

  return table[n];
}
// console.log(fibonacci(2));
// console.log(fibonacci(23));
// console.log(fibonacci(84));

/*
TOP DOWN
def Fib(n):
  return FibHelper(n, dict())

def FibHelper(n, dp):
  1. check base cases
  2. check cache for answer
  3. compute fxn normally
  4. write to cache
  5. return answer from (3)
*/

/*
BOTTOM UP
-bottom up - starting with base cases and building up the values
-top down - start with the case you want to solve and then solve the rest recursively with caching
-top down is always there but bottom up may not be very 
-top down has the potential to being efficient in the sense that it only calls on the values it needs whereas
 with bottom up, you may precompute values that may not be needed
*/

// Minimum Path Sum (https://leetcode.com/problems/minimum-path-sum/description/) (BOTTOM UP)
// -in order to do bottom up, we need the values for dp[i + 1][j] and dp[i][j + 1]. A way to do that is to start from the bottom right
//  and sweep from right to left and go up once you are done sweeping the row. 
// -due to the fact that we have those "+1's", we add a dummy layer of padding to the right and bottom edges and since we're trying to find
//  the min, we set the values to Infinity. If we were looking for the max, we'd set those to -Infinity
var minPathSum = function(grid) {
  let height = grid.length,
      width = grid[0].length,
      dp = [];

  // initialize dp table and add outer padding
  for (let i = 0; i <= height; ++i) {
    let temp = [];
    temp[width] = Infinity;
    if (i === height) {
      for (let j = 0; j < width; ++j) {
        temp[j] = Infinity;
      }
    }
    dp.push(temp);
  }
  
  for (let i = height - 1; i >= 0; --i) {
    for (let j = width - 1; j >= 0; --j) {
      if (i === height - 1 && j === width - 1) {
        dp[i][j] = grid[i][j];
      } else {
        dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  return dp[0][0];
};

var matrix = [
  [1,3,1],
  [1,5,1],
  [4,2,1]
];
// minPathSum(matrix)

/*
UNDERSTANDING STATE
-same problem as last but this time you can go up with the caveat that you cannot revisit a visited cell
-https://www.youtube.com/watch?v=a9iQgJtYNVQ&list=PLRKxhQQOfTrmGI32jyGmUyH3AVQl1Jc0X&index=3
 -is high, low just a more space efficient way to determine where you've been?
  -he mentioned in previous video that DP solutions can get unruly when you have too many fxn arguments
  -it seems that minimizing fxn args results in hard to follow algorithms
 -be wary of when your algorithm starts going circular. If so, you likely have to rethink your algorithm
 -time complexity is determined by the # of states multiplied by the time it takes to calculate that state
*/

/* Bytelandian Coins (https://www.youtube.com/watch?v=eHB9pohoNAY&index=4&list=PLRKxhQQOfTrmGI32jyGmUyH3AVQl1Jc0X)
https://www.codechef.com/problems/COINS
F(n) = Math.max(F(n/2) + F(n/3) + F(n/4), n)
-recursive no caching time complexity: O(3^(log (base 2) n)) = O(n^log (base 2) 3) 
*/
function bytelandian(n) {
  let dp = [];
  dp[0] = 0;
  dp[1] = 0;
  dp[2] = 2;

  for (let i = 3; i <= n; ++i) {
    dp[i] = Math.max(i, Math.floor(i / 2) + Math.floor(i / 3) + Math.floor(i / 4));
  }
  return dp[n];
}
// console.log(bytelandian(12))
// console.log(bytelandian(200))


/* Ski slope problem ()
Top down:
F(x,y) = 1 + max over all neighbors N with h(N) > h(x,y) (F(N))
          else = 1 if no valid neighbors

Bottom up: not so clear as you can't necessarily sweep since you can go 4 directions
 -you'd have to turn this into a graph and do a topological sort
*/
var longestIncreasingPath = function(matrix) {
  if (matrix === null || matrix.length === 0) return 0;
  let h = matrix.length,
      w = matrix[0].length,
      dp = [],
      max = -Infinity;

  for (let i = 0; i < h; ++i) {
    dp.push(Array(w).fill(null));
  }

  // calculate max path for every cell
  for (let i = 0; i < h; ++i) {
    for (let j = 0; j < w; ++j) {
      max = Math.max(max, dfs(i, j, matrix, dp));
    }
  }
  
  return max;
};

function dfs(i, j, m, cache) {
  // after every run of dfs in the main fxn, the max path length is calculated for that cell so if there's a value 
  // in the cache, just return that value. This is our base case that makes sure no work is duplicated
  if (cache[i][j]) {
    return cache[i][j];
  }
  let w = cache[0].length,
      h = cache.length;

  cache[i][j] = 1;
  if (i - 1 >= 0 && m[i - 1][j] > m[i][j]) {
    cache[i][j] = Math.max(cache[i][j], 1 + dfs(i - 1, j, m, cache));
  }

  if (j + 1 < w && m[i][j + 1] > m[i][j]) {
    cache[i][j] = Math.max(cache[i][j], 1 + dfs(i, j + 1, m, cache));
  }

  if (i + 1 < h && m[i + 1][j] > m[i][j]) {
    cache[i][j] = Math.max(cache[i][j], 1 + dfs(i + 1, j, m, cache));
  }

  if (j - 1 >= 0 && m[i][j - 1] > m[i][j]) {
    cache[i][j] = Math.max(cache[i][j], 1 + dfs(i, j - 1, m, cache));
  }

  return cache[i][j];
}
var matrix = [
  [3,4,5],
  [3,2,6],
  [2,2,1]
];
// console.log(longestIncreasingPath(matrix))


/* 0-1 Knapsack
*/
let values = [6,10,12];
let weights = [1,2,3];
let maxWeight = 5;

// 0 0  1  2  3  4  5
// 0 0  0  0  0  0  0
// 1 0  6  6  6  6  6
// 2 0  6  10 16 16 16
// 3 0  6  10 16 18 22

function knapsack(values, weights, maxWeight) {
  let dp = [];
  for (let i = 0; i <= values.length; ++i) {
    if (i === 0) {
      dp.push(Array(maxWeight + 1).fill(0));
    } else {
      dp.push([0])
    }
  }

  for (let i = 1; i <= values.length; ++i) {
    for (let j = 1; j <= maxWeight; ++j) {
      if (weights[i - 1] <= j) { // j - weights[i - 1] >= 0:  I had this originally but doing inequality math, you can simplify this
        dp[i][j] = Math.max(
          dp[i - 1][j],                                 // use previous max
          values[i - 1] + dp[i - 1][j - weights[i - 1]] // use current value + previous value
        );
      } else {
        dp[i][j] = dp[i - 1][j];  // use previous max
      }
    }
  }
  return dp[values.length][maxWeight];
}
// console.log(knapsack(values,weights,maxWeight))


/* Catalan Numbers (https://www.youtube.com/watch?v=pmEABou6X7M&index=7&list=PLRKxhQQOfTrmGI32jyGmUyH3AVQl1Jc0X)
-find the number of ways you can form a binary search tree given a sorted array
f(0) = 1 (there is exactly one zero node tree)
f(1) = f(0) * f(0) = 1
f(2) = f(0) * f(1) + f(1) * f(0) = 2
f(3) = (f(2) * f(0)) + (f(1) * f(1)) + (f(0) * f(2)) = 2 + 1 + 2 = 5
f(n) = sum (f(i) & f(n - 1 -i)) (where 0 <= i <= n - 1)

O(n) = O(n) time per state * O(n) space = O(n^2)
*/

/* Expression Trees https://www.youtube.com/watch?v=F0DAglb9Xjw&list=PLRKxhQQOfTrmGI32jyGmUyH3AVQl1Jc0X&index=8()
f(array) = Math.min over all 0 <= i <= array.length - 1 (f(array[0:i - 1])) + f(array[:len - 1])
                + sum(array[0:i - 1]) % M + sum(array[i:len - 1]) % M
*/


/* House Robber
f(n) = Math.max(f(n + 1), arr[i] + f(n + 2))
*/
/* TOP DOWN SOLUTION
function robber(arr) {
  let t = [];
  return robberH(0, arr, t);
};

function robberH(i, arr, t) {
  if (i >= arr.length) {
    return 0;
  }

  if (t[i]) {
    return t[i];
  }

  t[i] = Math.max(robberH(i + 1, arr, t), arr[i] + robberH(i + 2, arr, t));
  return t[i];
}*/
function robber(nums) {
  if (nums === null || nums === 0) {
    return 0;
  }

  if (nums.length === 1) {
    return nums[0];
  }

  let t = [];
  t[0] = nums[0];
  t[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; ++i) {
    t[i] = Math.max(nums[i] + t[i - 2], t[i - 1]);
  }
  return Math.max.apply(null, t);
}
// console.log(robber([2,7,9,3,1]));


/* Longest Increasing Subsequence (https://www.youtube.com/watch?v=CE2b_-XfVDk)
Given an array find longest increasing subsequence in this array
3 4 -1 0 6 2 3

-initial memo array to all 1's since each an array of length 1 is at least length 1
-starting from the second index and working to the end, set another pointer (j) from 0 until i and if the 
 cell at j is greater than what it is in i, if memo[i] < memo[j] + 1, set memo[i] = memo[j] + 1
*/
function lis(arr) {
  let t = Array(arr.length).fill(1);
  for (let i = 1; i < arr.length; ++i) {
    for (let j = 0; j < i; ++j) {
      if (arr[i] > arr[j]) {
        t[i] = Math.max(t[i], t[j] + 1);
      }
    }
  }
  return Math.max.apply(null, t);
}
// console.log(lis([3,4,-1,0,6,2,3]));


/* Coin Change Number of Ways (https://www.youtube.com/watch?v=_fgjrs570YE)
Given coins of certain denominations and a total, how many ways these coins can be combined to get the total

coins = [1,2,3], total=5
1 1 1 1 1
2 2 1
2 1 1 1
3 1 1
3 2 2

       1 2 3 4 5
     0 0 0 0 0 0
(1)0 1 1 1 1 1 1  // to get 5 using only ones, there's only one way: 1 1 1 1 1
(2)1 1 1 2 2 3 3
(3)2 1 1 2 3 4 5

-while working out the problem, since I found that I had to reference the previous row, that's when I knew I 
 had to add padding
 -there is a trick though: the padded columns is full of 1's (don't know the reasoning why yet)
-while going row by row, the total for that cell is the the sum of the cell above it plus the value of j - coins[i] on the same row.
 This is how you don't have to worry about j % coins[i] === 0 which is a trap
-as of this point of writing this, the way the table is used is not quite typical

if (j >= coins[i - 1])
  t[i][j] = t[i - 1][j] + t[i][j - coins[i - 1]];
else
  t[i][j] = t[i - 1][j];
*/
function coinChange(coins, total) {
  let t = [Array(total + 1).fill(0)];
  for (let i = 0; i < coins.length; ++i) {
    t.push([1]);
  }

  for (let i = 1; i <= coins.length; ++i) {
    for (let j = 1; j <= total; ++j) {
      if (j >= coins[i - 1]) {
        t[i][j] = t[i - 1][j] + t[i][j - coins[i - 1]];
      } else {
        t[i][j] = t[i - 1][j];
      }
    }
  }
  return t[coins.length][total];
}
// console.log(coinChange([1,2,3], 5));


/* Minimum Coin Change (https://www.youtube.com/watch?v=Y0ZqKpToTic)
Given coins of certain denominations and a total, how many minimum coins would you need to make this total.

1 5 6 8 Total=11
  0 1 2 3 4 5 6 7 8 9 10 11
0 0 1 2 3 4 5 6 7 8 9 10 11
1 0 1 2 3 4 5 6 7 8 9 10 11
2 0 1 2 3 4 1 2 3 4 5 2  3
3 0 1 2 3 4 1 1 2 3 4 2  2
4 0 1 2 3 4 1 1 2 1 2 2  2

if (j >= coins[i]) {
  t[i][j] = Math.min(1 + t[i][j - coins[i]], t[i - 1][j]);
} else {
  t[i][j] = t[i - 1][j];
}

-the tricky part for this is initializing the initial row to be 0 through total
*/
function minCoin(coins, total) {
  let t = [];
  for (let i = 0; i <= coins.length; ++i) {
    t.push([0]);
    if (i === 0) {
      for (let j = 1; j <= total; ++j) {
        t[0][j] = j;
      }
    }
  }

  for (let i = 1; i <= coins.length; ++i) {
    for (let j = 1; j <= total; ++j) {
      if (j >= coins[i - 1]) {
        t[i][j] = Math.min(1 + t[i][j - coins[i - 1]], t[i - 1][j]);
      } else {
        t[i][j] = t[i - 1][j];
      }
    }
  }
  return t[coins.length][total];
}
// console.log(minCoin([1,5,6,8], 11));


/* Cutting Rod (https://www.youtube.com/watch?v=IRwVmTmN6g)
Given a rod of length and prices at which different length of this rod can sell, how do you cut this rod to maximize profit
length = 5
1 2 3 4
2 5 7 8

  0 1 2 3 4  5
0 0 0 0 0 0  0
1 0 2 4 6 8  10
2 0 2 5 7 10 12
3 0 2 5 7 10 12
4 0 2 5 7 10 12
-note: in the first if statement we have j >= i as i represents the current length. However, inside the if,
 we have vals[i - 1]. This is because the for loops are considered with the extra padding while the vals array
 is still zero indexed which is why we need i - 1
*/
function rod(vals, length) {
  let t = [Array(length + 1).fill(0)];
  for (let i = 0; i < vals.length; ++i) {
    t.push([0]);
  }

  for (let i = 1; i <= vals.length; ++i) {
    for (let j = 1; j <= length; ++j) {
      if (j >= i) {
        t[i][j] = Math.max(vals[i - 1] + t[i][j - i], t[i - 1][j]);
      } else {
        t[i][j] = t[i - 1][j];
      }
    }
  }
  return t[vals.length][length];
}
// console.log(rod([2,5,7,8], 5))


/* Weighted Job Scheduling (https://www.youtube.com/watch?v=cr6Ip0J9izc)
Given certain jobs with start and end time and amount you make on finishing the job, 
find the maximum value you can make by scheduling jobs in non-overlapping way

(1,3) (2,5) (4,6) (6,7) (5,8) (7,9)
5     6     5     4     11    2

-first sort by ending time
-from here, apply longest increasing subsequence algorithm where the consideration is if j's ending time 
 is less than or equal to i's starting time

 i = 0
 5 6 5 4 11 2

 i = 1
 5 6 5 4 11 2

 i = 2
 5 6 10 4 11 2

i = 3
5 6 10 14 11 2

i = 4
5 6 10 14 17 16
*/
function jobScheduling(arr) {
  let t = [];

  // assume we put logic here to sort the array

  for (let i = 0; i < arr.length; ++i) {
    t[i] = arr[i].weight;
  }

  for (let i = 1; i < arr.length; ++i) {
    for (let j = 0; j < i; ++j) {
      if (arr[i].time[0] >= arr[j].time[1]) {
        t[i] = Math.max(t[i], arr[i].weight + t[j]);
      }
    }
  }
  return Math.max.apply(null, t);
}
// console.log(jobScheduling([
//   {
//     time: [1,3],
//     weight: 5
//   }, {
//     time: [2,5],
//     weight: 6
//   }, {
//     time: [4,6],
//     weight: 5
//   }, {
//     time: [6,7],
//     weight: 4
//   }, {
//     time: [5,8],
//     weight: 11
//   }, {
//     time: [7,9],
//     weight: 2
//   }
// ]));


/* Longest Bitonic Subsequence (https://www.youtube.com/watch?v=TWHytKnOPaQ)
Find longest bitonic subsequence in given array. Bitonic subsequence first increases then decreases

2 -1 4 3 5 -1 3 2

lis from l->r
1 1 2 2 3 1 2 2

lis from r->l
2 1 3 2 3 1 2 1 

adding both together
3 2 5 4 6 2 4 3

the max is 6 so subtract 1 so we don't double count a cell and the result is 5

-algo: do longest increasing subsequence(lis) from l->r and then in a separate array, do lis from r->l.
 Add both matrices together, take the max and then subtract 1 from that value so you don't double count
 a cell
*/
function bitonic(arr) {
  let lr = [];
  let rl = [];

  for (let i = 0; i < arr.length; ++i) {
    lr[i] = 1;
    rl[i] = 1;
  }

  for (let i = 1; i < arr.length; ++i) {
    for (let j = 0; j < i; ++j) {
      if (arr[i] > arr[j]) {
        lr[i] = Math.max(lr[i], 1 + lr[j]);
      }
    }
  }

  let arrReverse = arr.slice(0).reverse();
  for (let i = 1; i < arrReverse.length; ++i) {
    for (let j = 0; j < i; ++j) {
      if (arrReverse[i] > arrReverse[j]) {
        rl[i] = Math.max(rl[i], 1 + rl[j]);
      }
    }
  }
  rl.reverse();

  let result = [];
  for (let i = 0; i < lr.length; ++i) {
    result[i] = lr[i] + rl[i];
  }
  return Math.max.apply(null, result) - 1;
}
// console.log(bitonic([2,-1,4,3,5,-1,3,2]));


/* Longest Common Subsequence (https://www.youtube.com/watch?v=NnD96abizww)
Given two strings, find longest common subsequence between them

abcdaf
acbcf

    a b c d a f
  0 0 0 0 0 0 0
a 0 1 1 1 1 1 1
c 0 1 1 2 2 2 2
b 0 1 2 2 2 2 2
c 0 1 2 3 3 3 3
f 0 1 2 3 3 3 4

-when you're at [3,5], you're comparing letter c (from substring ac) to d (from substring abcd). The longest
 common subsequence to that point is ac
-if the letters are different, we take the max from the top and left cells (1 letter less than the second
 string or 1 letter less than the first substring)
-if the letters are the same, we take the value of 1 less both substrings and add 1

if letters equal:
  t[i][j] = 1 + t[i - 1][j - 1];
else
  t[i][j] = Math.max(t[i - 1][j], t[i][j - 1])
*/
function lcsub(str1, str2) {
  let t = [Array(str1.length + 1).fill(0)];
  for (let i = 0; i < str2.length; ++i) {
    t.push([0]);
  }

  for (let i = 1; i <= str2.length; ++i) {
    for (let j = 1; j <= str1.length; ++j) {
      if (str2[i - 1] === str1[j - 1]) {  // - 1's are to account for the extra padding from the for loops
        t[i][j] = 1 + t[i - 1][j - 1];
      } else {
        t[i][j] = Math.max(t[i - 1][j], t[i][j - 1]);
      }
    }
  }
  return t[str2.length][str1.length];
}
// console.log(lcsub('abcdaf', 'acbcf'));

/* Longest Common Substring (https://www.youtube.com/watch?v=BysNXJHzCEs)
abcdaf
zbcdf

    a b c d a f
  0 0 0 0 0 0 0
z 0 0 0 0 0 0 0
b 0 0 1 0 0 0 0
c 0 0 0 2 0 0 0
d 0 0 0 0 3 0 0
f 0 0 0 0 0 0 1

-what's tricky about this is if the letters don't match, you put 0. Doing a lot of common subsequence problems
 you automatically think that you should put the max of like the left and/or top but this isn't the case for
 this problem. I didn't really find an explanation for this other than if you were to fill the table out using
 subsequence logic, you find that you're adding 1 even in cases where the previous letter doesn't match which
 is incorrect. It only works out when you put 0 when there is no match
-to optimize this a little, you can check for the max at each cell

if (str1[j] === str2[i]) {
  t[i][j] = 1 + t[i - 1][j - 1];
} else {
  t[i][j] = 0;
}
*/
function lcsubstring(str1, str2) {
  let t = [Array(str1.length + 1).fill(0)];
  for (let i = 0; i < str2.length; ++i) {
    t.push([0]);
  }

  let max = -Infinity;
  for (let i = 1; i <= str2.length; ++i) {
    for (let j = 1; j <= str1.length; ++j) {
      if (str1[j - 1] === str2[i - 1]) {  // - 1's are to account for the extra padding from the for loops
        t[i][j] = 1 + t[i - 1][j - 1];
      } else {
        t[i][j] = 0;
      }
      max = Math.max(max, t[i][j]);
    }
  }
  return max;
}
// console.log(lcsubstring('abcdaf', 'zbcdf'));


/* Minimum Edit Distance (https://www.youtube.com/watch?v=We3YDTzNXEk)
Given two strings and operations edit, delete and add, how many minimum operations would it take to 
convert one string to another string

abcdef
azced
 
    a b c d e f
  0 1 2 3 4 5 6
a 0 0 1 2 3 4 5
z 0 1 1 2 3 4 5
c 0 2 2 1 2 3 4
e 0 3 3 2 2 2 3
d 0 4 4 3 3 3 3

-tricky part is that for this simple algorithm to work, the first line has to be initialized from 0-length of string on x-axis

t[i][j] = Math.min(t[i][j - 1], t[i - 1][j - 1], t[i - 1][j]);
if (str1[j] === str2[i]) {
  ++t[i][j];
}
*/
function minEditDistance(str1, str2) {
  let t = [[]];
  for (let i = 0; i < str2.length; ++i) {
    if (i === 0) {
      for (let j = 0; j <= str1.length; ++j) {
        t[0][j] = j;
      }
    }
    t.push([0]);
  }

  for (let i = 1; i <= str2.length; ++i) {
    for (let j = 1; j <= str1.length; ++j) {
      t[i][j] = Math.min(t[i][j - 1], t[i - 1][j - 1], t[i - 1][j]);
      if (str1[j - 1] !== str2[i - 1]) {
        ++t[i][j];
      }     
    }
  }
  return t[str2.length][str1.length];
}
// console.log(minEditDistance('abcdef', 'azced'));


/* Maximum Subsquare Matrix (https://www.youtube.com/watch?v=_Lf1looyJMU)
Given a matrix of 0s and 1s. Find biggest sub-square matrix entirely of 1s in this matrix

0 0 1 1 1
1 0 1 1 1
0 1 1 1 1
1 0 1 1 1

0 0 0 0 0 0
0 0 0 1 1 1
0 1 0 1 2 2
0 0 1 1 2 3
0 1 0 1 2 3

-go through each cell in matrix. If it's 1, take the min of left, top-left and top and add 1. Else add 0
 -don't know the reasoning but it works out if you build out the table

if (mat[i - 1][j - 1] === 1) {
  t[i][j] = 1 + Math.min(t[i][j - 1], t[i - 1][j - 1], t[i - 1][j]);
} else {
  t[i][j] = 0;
}
*/
function maxSubMatrix(mat) {
  let t = [Array(mat[0].length + 1).fill(0)];
  for (let i = 0; i < mat.length; ++i) {
    t.push([0]);
  }

  let max = -Infinity;
  for (let i = 1; i <= mat.length; ++i) {
    for (let j = 1; j <= mat[0].length; ++j) {
      if (mat[i - 1][j - 1] === 1) {
        t[i][j] = 1 + Math.min(t[i][j - 1], t[i - 1][j - 1], t[i - 1][j]);
      } else {
        t[i][j] = 0;
      }

      max = Math.max(max, t[i][j]);
    }
  }
  return max;
}
// console.log(maxSubMatrix([
//   [0,0,1,1,1],
//   [1,0,1,1,1],
//   [0,1,1,1,1],
//   [1,0,1,1,1]
// ]));


/* Total Ways in Matrix (https://www.youtube.com/watch?v=GO5QHC_BmvM)
Given a 2 dimensional matrix, how many ways you can reach bottom right from top left 
provided you can only move down and right

1 1 1 1
1 1 1 1
1 1 1 1
1 1 1 1 (basically a 4x4 matrix)

1 1 1  1
1 2 3  4
1 3 6  10
1 4 10 20

-first fill out the first row and column will all 1's since there is only one way to get there
-for each cell afterwards, add the top and left value
-you can easily find this algo out by building out the table and working the possibilites out in the early cells
*/
function matrixWays(mat) {
  let t = [Array(mat[0].length).fill(1)];
  for (let i = 1; i < mat.length; ++i) {
    t.push([1]);
  }
  for (let i = 1; i < mat.length; ++i) {
    for (let j = 1; j < mat[0].length; ++j) {
      t[i][j] = t[i - 1][j] + t[i][j - 1];
    }
  }
  return t[mat.length - 1][mat[0].length - 1];
}
// console.log(matrixWays([
//   [1,1,1,1],
//   [1,1,1,1],
//   [1,1,1,1],
//   [1,1,1,1]
// ]));


/* Min Cost Path (https://www.youtube.com/watch?v=lBRtnuxg-gU) 
Given a 2 dimensional matrix, find minimum cost path to reach bottom right from top left provided 
you can only from down and right
*/
function minPath(mat) {

}
console.log(minPath([
  [1,3,5,8],
  [4,2,1,7],
  [4,3,2,3]
]));