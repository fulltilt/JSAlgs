function BackTracking() {
  this.printAllPermutations = printAllPermutations;
  this.printAllPermutationsWithRepetitions = printAllPermutationsWithRepetitions;
  this.permuteNArrays = permuteNArrays;
  this.hasSubsetWithSumZero = hasSubsetWithSumZero;
  this.knightsTour = knightsTour;
  this.mazePuzzle = mazePuzzle;
  this.doesPathExist = doesPathExist;
  this.robotMove = robotMove;
  this.nQueen = nQueen;
  this.eightQueens = eightQueens;
  this.subsetSum = subsetSum;
  this.stairs = stairs;
  this.wordsFromPhoneDigits = wordsFromPhoneDigits;
  this.sudoku = sudoku;
  this.tugOfWar = tugOfWar;
}

// http://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/
// http://stackoverflow.com/questions/9960908/permutations-in-javascript or http://www.geeksforgeeks.org/print-all-permutations-with-repetition-of-characters/
// assumptions: input is in array form
// NOTE: to print lexicographically (http://www.geeksforgeeks.org/lexicographic-permutations-of-string/) I think all we need to do is to sort the string in order before running the algorithm
// NOTE2: see eightQueensPermutations() for another way to get permutations without having to use splice
function printAllPermutations(arr, permArr, usedChars) {
  var i, ch;
  for (i = 0; i < arr.length; i++) {
    ch = arr.splice(i, 1)[0]; // cut out the each index from the array one at a time (splice alters the original array; it also returns an Array hence the '[0]')
    usedChars.push(ch);

    // if after the splice arr is empty, usedChars should be the length of the original arr so push it to the results
    if (arr.length === 0) {
      permArr.push(usedChars.slice());
    }

    // recurse using a different starting point
    printAllPermutations(arr, permArr, usedChars);
    
    // put array back to its original state and remove the char from usedChars. This is so every index becomes the starting index before the first recursion
    arr.splice(i, 0, ch);
    usedChars.pop();
  }
}

// http://www.geeksforgeeks.org/print-all-permutations-with-repetition-of-characters/
function printAllPermutationsWithRepetitions(str) {
  var arr = [],
      strArr = str.split(''),
      length = str.length;

  strArr = strArr.sort();
  printAllPermutationsWithRepetitionsUtil(strArr, arr, length - 1, 0);
}

function printAllPermutationsWithRepetitionsUtil(strArr, arr, last, index) {
  var length = strArr.length;

  // one by one, fix all characters at the given index and recur for the subsequent indexes
  for (var i = 0; i < length; i++) {
    // fix the ith character at index and if this isn't the last index, recursively call for higher indexes
    arr[index] = strArr[i];

    // if this is the last index then print the string stored in arr[]
    if (index === last) {
      console.log(arr);
    } else {
      printAllPermutationsWithRepetitionsUtil(strArr, arr, last, index + 1);
    }
  }
}

/* alternate printAllPermutationsWithRepetitions which is similar to permute
function permute(str, index, res) {
  if (str.length === res.length) {
    console.log(res);
    return;
  }

  for (var i = 0; i < str.length; i++) {
    var temp = str[index];
    str[index] = str[i];
    str[i] = temp;

    res.push(str[i]);
    permute(str, index + 1, res);

    temp = str[i];
    str[i] = str[index];
    str[index] = temp;
    res.pop();
  }
}

Update 12/21/14: 
// this fxn gets all permutations with repetitions. To get all permutations without repetitions, in the for loop, change 'var i = 0' to 'var i = index'
function getPerms(arr, index, res) {
  if (arr.length === index) {
    console.log(res);
    return;
  }

  for (var i = 0; i < arr.length; i++) { 
    // NOTE: order matters
    var temp = arr[i];
    arr[i] = arr[index];
    arr[index] = temp;  

    res.push(arr[index]);
    getPerms(arr, index + 1, res);

    temp = arr[index];
    arr[index] = arr[i];
    arr[i] = temp;
    res.pop();
  }
}
*/

function swap(str, x, y) {
  var temp = str[x];
  str[x] = str[y];
  str[y] = temp;
}

// Apress #67
function permuteNArrays(arrs, result) {
  if (arrs.length === result.length) {
    console.log(result);
    return;
  }

  var arr = arrs[result.length];
  for (var i = 0; i < arr.length; i++) {
    result.push(arr[i]);
    permuteNArrays(arrs, result);
    result.pop();
  }
}

/* alternate permuteNArrays passing in an index instead of using result.length
function permuteNArrays(arrs, index, res) {
  if (res.length === arrs.length) {
    console.log(res);
    return;
  }

  var arr = arrs[index];
  for (var i = 0; i < arr.length; i++) {
    res.push(arr[i]);
    permuteNArrays(arrs, index + 1, res);
    res.pop();
  }
} */

// Apress #89: Given an array, please check whether it contains a subset of numbers (with one number at least) whose sum equals 0
// Algo: this is actually a brute force method that tries out every permutation until it hits a match. Don't know if there's a more efficient way to do this
function hasSubsetWithSumZero(arr) {
  var perms = [],
      length = arr.length, i;

  getBitSetPermutations(arr.length, [], perms); // get all permutations of 0's and 1's with repetitions
  
  var length2 = perms.length;
  for (i = 1; i < length2; i++) { // first permutation is all zeroes so exclude that permutation
    sum = 0;
    for (var j = 0; j < length; j++) {
      if (perms[i][j] === 1) {
        sum += arr[j];
      }
    }

    if (sum === 0) {
      return perms[i];
    }
  }

  return null;
}

// helper fxn for hasSubsetWithSumZero() that returns all permutations of 0's and 1's of a certain length
function getBitSetPermutations(length, res, perms) {
  if (res.length === length) {
    perms.push(res.slice(0));
    return;
  }

  for (var i = 0; i <= 1; i++) {
    res.push(i);
    getBitSetPermutations(length, res, perms);
    res.pop();
  }
}

// Apress #68:  Please generate all combinations of a given string. For example, combinations of a given string “abc” are “a”, “b”, “c”, “ab”, “ac”, “bc”, and “abc”
function generateAllCombos(str) {
  var result = [],
      length = str.length, i;

  // Since a combination may contain one characters, two characters, ..., or n characters for a given string with length n, there is a loop    
  for (i = 1; i <= length; i++) { // i represents the desired size of the combo
    generateAllCombosUtil(str, 0, i, result);
  }
}

function generateAllCombosUtil(str, index, number, result) {
  // we reached the desired length of the combo. Log the result and then return
  if (number === 0) {
    console.log(result);
    return;
  }

  // we are past the str length return
  if (index === str.length) {
    return;
  }

  // select the character str[index]
  result.push(str[index]);
  generateAllCombosUtil(str, index + 1, number - 1, result);
  result.pop();

  // ignore the character str[index] (notice how we pass 'number' by itself while previously we did 'number - 1' when we pushed the index to the result)
  generateAllCombosUtil(str, index + 1, number, result);
}

/*
function generateAllCombos(str, bits) {
  if (bits.length === str.length) {
    var output = '';
    for (var i = 0; i < bits.length; i++) {
      if (bits[i] === 1) {
        output += str[i];
      }
    }
    console.log(output);
    return;
  }

  // only valid inputs are 0 or 1
  for (var i = 0; i <= 1; i++) {
    bits.push(i);
    permute(str, bits);
    bits.pop();
  }
} */

// http://www.geeksforgeeks.org/backtracking-set-1-the-knights-tour-problem/
function knightsTour() {
  var board = [],
      n = 8;      // dimensions of chess board

  // initialize solution boardmatrix
  for (var i = 0; i < n; i++) {
    board[i] = [];
    for (var j = 0; j < n; j++) {
      board[i][j] = -1;
    }
  }

  /* xMove[] and yMove[] define next move of Knight.
     xMove[] is for next value of x coordinate
     yMove[] is for next value of y coordinate */
  var xMove = [2, 1, -1, -2, -2, -1,  1,  2],
      yMove = [1, 2,  2,  1, -1, -2, -2, -1];

  board[0][0] = 0;   // since knight is initially at the first block

  // start from [0,0] and explore all tours using knightsTourUtil
  if (knightsTourUtil(0, 0, 1, board, xMove, yMove) === false) {
    return false;
  } else {
    console.log(board);
  }

  return true;
}

function knightsTourUtil(x, y, successes, board, xMove, yMove) {
  var potentialMoves = 8;

  if (successes === 64) {
    return true;
  }

  // try all next moves from the current coordinate x,y
  for (var i = 0; i < potentialMoves; i++) {
    var nextX = x + xMove[i],
        nextY = y + yMove[i];
    if (isKnightSafe(board, nextX, nextY)) {
      board[nextX][nextY] = successes;
      if (knightsTourUtil(nextX, nextY, successes + 1, board, xMove, yMove) === true) {
        return true;
      } else {
        board[nextX][nextY] = -1;   // backtrack
      }
    }
  }

  return false;
}

// make sure i and j are valid indexes
function isKnightSafe(board, x, y) {
  var dimension = 8;
  return (x >= 0 && x < dimension && y >= 0 && y < dimension && board[x][y] === -1);
}

// http://www.geeksforgeeks.org/backttracking-set-2-rat-in-a-maze/
// assumes an N x N matrix
// start at upper left corner and goal is lower-right corner. In maze, 1 represents valid spot, 0 represents a dead end
function mazePuzzle(maze) {
  var n = maze.length,
      solution = [];
  for (var i = 0; i < n; i++) {
    solution[i] = [];
    for (var j = 0; j < n; j++) {
      solution[i][j] = -1;
    }
  }

  /* xMove[] and yMove[] define next move.
     xMove[] is for next value of x coordinate
     yMove[] is for next value of y coordinate */
  var xMove = [1, -1, 0, 0],
      yMove = [0, 0, 1, -1];

  solution[0][0] = 1;

  // start from [0,0] and explore all paths using mazePuzzleUtil
  if (mazePuzzleUtil(0, 0, solution, maze, xMove, yMove) === false) {
    return false;
  } else {
    console.log(solution);
  }

  return true;
}

function mazePuzzleUtil(x, y, solution, maze, xMove, yMove) {
  var goal = solution.length - 1,
      directions = xMove.length;

  if (x === goal && y === goal) {
    return true;
  }

  for (var i = 0; i < directions; i++) {
    var nextX = x + xMove[i],
        nextY = y + yMove[i];
    if (isPathSafe(nextX, nextY, solution, maze) === true) {
      solution[nextX][nextY] = 1;
      if (mazePuzzleUtil(nextX, nextY, solution, maze, xMove, yMove) === true) {
        return true;
      } else {
        solution[nextX][nextY] = -1;  //backtrack
      }
    }
  }

  return false;
}

function isPathSafe(x, y, solution, maze) {
  var dimension = solution.length;
  return (x >= 0 && x < dimension && y >= 0 && y < dimension && maze[x][y] !== 0 && solution[x][y] !== 1);
}

// Apress #30
function doesPathExist(matrix, str) {
  var rows = matrix.length,
      columns = matrix[0].length,
      visited = [],
      pathIndex = 0, i, j;

  // initialize visited matrix
  for (i = 0; i < rows; i++) {
    visited[i] = [];
    for (j = 0; j < columns; j++) {
      visited[i][j] = false;
    }
  }

  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      if (checkPath(matrix, str, visited, pathIndex, rows, columns, i, j)) {
        return true;
      }
    }
  }

  return false;
}

function checkPath(matrix, str, visited, pathIndex, rows, columns, row, column) {
  if (pathIndex === str.length) {
    return true;
  }

  var validPath = false;
  if (row >= 0 && column >= 0 && row < rows && column < columns && matrix[row][column] === str[pathIndex] && !visited[row][column]) {
    visited[row][column] = true;

    validPath = checkPath(matrix, str, visited, pathIndex + 1, rows, columns, row - 1, column) || // check on top
                checkPath(matrix, str, visited, pathIndex + 1, rows, columns, row, column + 1) || // check right
                checkPath(matrix, str, visited, pathIndex + 1, rows, columns, row + 1, column) || // check bottom
                checkPath(matrix, str, visited, pathIndex + 1, rows, columns, row, column - 1);   // check left

    if (!validPath) {
      visited[row][column] = false;
    }
  }

  return validPath;
}

/* Apress #31:  A robot starts at cell (0, 0) of a grid with mrows and ncolumns. It can move to the left, right, 
up, and down, and moves one cell for a step. It cannot enter cells where the digit sum of the row index and 
column index are greater than a given k. 
For example, when kis 18, the robot can reach cell (35, 37) because 3+5+3+7=18. However, it cannot reach cell 
(35, 38) because 3+5+3+8=19 and that is greater than k. How many cells can the robot reach? */
function robotMove(rows, columns, k) {
  var visited = [],
      i, j;

  // initialize visited matrix
  for (i = 0; i < rows; i++) {
    visited[i] = [];
    for (j = 0; j < columns; j++) {
      visited[i][j] = 0;
    }
  }

  return robotMoveUtil(visited, rows, columns, k, 0, 0);
  //console.log(visited);
}

function robotMoveUtil(visited, rows, columns, k, row, column) {
  if (row < 0 || column < 0 || row === rows || column === columns || (getDigitSum(row) + getDigitSum(column)) > k || visited[row][column] === 1) {
    return 0;
  }

  var count = 0;
  visited[row][column] = 1;

  count = 1 + robotMoveUtil(visited, rows, columns, k, row - 1, column)
            + robotMoveUtil(visited, rows, columns, k, row, column + 1)
            + robotMoveUtil(visited, rows, columns, k, row + 1, column)
            + robotMoveUtil(visited, rows, columns, k, row, column - 1);
  return count;
}

// helper fxn for robotMove()
function getDigitSum(number) {
  var sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }

  return sum;
}

// http://www.geeksforgeeks.org/backtracking-set-3-n-queen-problem/
// high-level algorithm: place queens from left to right (or right to left or top to bottom or bottom to top)
function nQueen(board, column) {
  var N = board.length;

  // base case: if all queens are placed then return true
  if (column >= N) {
    return true;
  }

  // consider this column and try placing this queen in all rows one by one
  for (var row = 0; row < N; row++) {
    if (isQueenSafe(board, row, column) === true) {
      board[row][column] = 1;
      if (this.nQueen(board, column + 1) === true) {
        return true;
      } else {
        board[row][column] = 0; // backtrack
      }
    }
  }

  return false;
}

// for this version of the algorithm we're placing queens from left to right. Because of this, we don't have to check above, below and to our right
function isQueenSafe(board, row, column) {
  var N = board.length;

  // check left on row
  for (var i = 0; i < column; i++) {
    if (board[row][i] === 1) {
      return false;
    }
  }

  // check upper-left diagonal
  for (var i = row, j = column; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 1) {
      return false;
    }
  }

  // check lower-left diagonal
  for (i = row, j = column; i < N && j >= 0; i++, j--) {
    if (board[i][j] === 1) {
      return false;
    }
  }

  return true;
}

/* Apress #66: How many distinct ways are available to place eight queens on a chessboard, where there are no two queens that can attack each other?
 NOTE: uses permutations and uses a single array of length 8 where each index represents a column in a matrix and it is assumed that each column contains a 
       queen so no need to check for a queen vertically. A number in the array represents a row a queen is in and since we are permuting different arrangements
       we don't have to do horizontal checks either. All we have to do is check diagonals */
function eightQueens() {
  var columns = [1,2,3,4,5,6,7,8],
      count = { count: 0 },
      index = 0;

      eightQueensPermutations(columns, index, count);

  return count.count;
}

function eightQueensPermutations(columns, index, count) {
  var length = columns.length, i, temp;

  if (index === length) {
    if (isQueenSafe2(columns)) {
      count.count += 1;
      return;
    }
  }

  for (i = index; i < length; i++) {
    temp = columns[i];
    columns[i] = columns[index];
    columns[index] = temp;

    eightQueensPermutations(columns, index + 1, count);

    temp = columns[index];
    columns[index] = columns[i];
    columns[i] = temp;
  }
}

function isQueenSafe2(permutation) {
  var length = permutation.length, i, j;
  for (i = 0; i < length; i++) {
    for (j = i + 1; j < length; j++) {
      if ((i - j === permutation[i] - permutation[j]) || (j - i === permutation[i] - permutation[j])) {
        return false;
      }
    }
  }

  return true;
}

// Apress #24
function stairs(n, count) {
  if (n < 0) {
    return;
  } else if (n === 0) {
    count.count += 1;
  }

  stairs(n - 2, count);
  stairs(n - 1, count);
}

// http://www.geeksforgeeks.org/backttracking-set-4-subset-sum/
function subsetSum(weights, targetSum) {
  var set = [],
      currentSum = 0;

  for (var i = 0; i < weights.length; i++) {
    set.push(weights[i]);
    currentSum = weights[i];
    if (subsetSumUtil(weights, set, currentSum, targetSum) === true) {
      return true;
    } else {
      set.pop();  // backtrack
    }
  }
}

function subsetSumUtil(weights, set, currentSum, targetSum) {
  
}

function wordsFromPhoneDigits(num) {
  var table = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
}

// http://www.geeksforgeeks.org/tug-of-war/
function tugOfWar() {

}

// http://www.geeksforgeeks.org/backtracking-set-7-suduku/
function sudoku() {

}

function balancedParentheses(pos, n, open, close, str) {
  if (close === n) {
    console.log(str.join(''));
    return;
  } else {
    if (open > close) {
      str[pos] = ')';
      balancedParentheses(pos + 1, n, open, close + 1, str);
    }

    if (open < n) {
      str[pos] = '(';
        balancedParentheses(pos + 1, n, open + 1, close, str);
    }
  }
}
//balancedParentheses(0, 4, 0, 0, []);

// http://www.geeksforgeeks.org/count-number-ways-reach-given-score-game/
// using backtracking
function waysToScore(goal, score, path) {
  // base cases: score === goal and score > goal
  if (score === goal) {
    console.log(path);
    return;
  }

  if (score > goal) {
    return;
  }

  path.push(3);
  waysToScore(goal, score + 3, path);
  path.pop();

  path.push(5);
  waysToScore(goal, score + 5, path);
  path.pop();

  path.push(10);
  waysToScore(goal, score + 10, path);
  path.pop();
}
//waysToScore(13, 0, []);

module.exports = BackTracking;

/* NOTES
-Graph problems that use backtracking: m Coloring Problem, Hamiltonian Cycles
*/