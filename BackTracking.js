function BackTracking() {
  this.printAllPermutations = printAllPermutations;
  this.printAllPermutationsWithRepetitions = printAllPermutationsWithRepetitions;
  this.knightsTour = knightsTour;
  this.mazePuzzle = mazePuzzle;
  this.nQueen = nQueen;
  this.subsetSum = subsetSum;
  this.sudoku = sudoku;
  this.tugOfWar = tugOfWar;
}

// http://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/
// http://stackoverflow.com/questions/9960908/permutations-in-javascript or http://www.geeksforgeeks.org/print-all-permutations-with-repetition-of-characters/
// assumptions: input is in array form
// NOTE: to print lexicographically (http://www.geeksforgeeks.org/lexicographic-permutations-of-string/) I think all we need to do is to sort the string in order before running the algorithm
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
    this.printAllPermutations(arr, permArr, usedChars);
    
    // put array back to its original state and remove the char from usedChars. This is so every index becomes the starting index before the first recursion
    arr.splice(i, 0, ch);
    usedChars.pop();
  }
}

// http://www.geeksforgeeks.org/print-all-permutations-with-repetition-of-characters/
function printAllPermutationsWithRepetitions() {

}

function swap(str, x, y) {
  var temp = str[x];
  str[x] = str[y];
  str[y] = temp;
}

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

  /* xMove[] and yMove[] define next move of Knight.
     xMove[] is for next value of x coordinate
     yMove[] is for next value of y coordinate */
  var xMove = [1, -1, 0, 0],
      yMove = [0, 0, 1, -1];

  solution[0][0] = 1;

  // start from [0,0] and explore all tours using knightsTourUtil
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
  if ()
}

// http://www.geeksforgeeks.org/tug-of-war/
function tugOfWar() {

}

// http://www.geeksforgeeks.org/backtracking-set-7-suduku/
function sudoku() {

}

module.exports = BackTracking;

/* NOTES
-Graph problems that use backtracking: m Coloring Problem, Hamiltonian Cycles
*/