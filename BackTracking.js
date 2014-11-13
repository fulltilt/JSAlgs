function BackTracking() {
  this.printAllPermutations = printAllPermutations;
  this.knightsTour = knightsTour;
  this.mazePuzzle = mazePuzzle;
  this.nQueenProblem = nQueenProblem;
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

  // try all next moves from the current coordinat x,y
  for (var i = 0; i < potentialMoves; i++) {
    var nextX = x + xMove[i],
        nextY = y + yMove[i];
    if (isSafe(board, nextX, nextY)) {
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
function isSafe(board, x, y) {
  var dimension = 8;
  return (x >= 0 && x < dimension && y >= 0 && y < dimension && board[x][y] === -1);
}

// http://www.geeksforgeeks.org/backttracking-set-2-rat-in-a-maze/
function mazePuzzle() {

}

// http://www.geeksforgeeks.org/backtracking-set-3-n-queen-problem/
function nQueenProblem() {

}

// http://www.geeksforgeeks.org/backttracking-set-4-subset-sum/
function subsetSum() {

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