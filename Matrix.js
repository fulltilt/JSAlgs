var Trie = require('./Strings/Trie.js'),
    Heap = require('./Heap.js');

function Matrix() {
  this.maxSquareSubMatrix = maxSquareSubMatrix;
  this.rotateImage = rotateImage;
  this.booleanMatrix = booleanMatrix;
  this.printSpiral = printSpiral;
  this.maxNumberOnes = maxNumberOnes;
  this.printUniqueRows = printUniqueRows;
  this.printMatrixDiagonally = printMatrixDiagonally;
  this.naiveMatrixMultiplication = naiveMatrixMultiplication;
  this.kthSmallestElement = kthSmallestElement;
  this.searchSortedMatrix1 = searchSortedMatrix1;
  this.searchSortedMatrix2 = searchSortedMatrix2;
  this.findSubSquares = findSubSquares;
  this.inPlaceTranspose = inPlaceTranspose;
  this.maxSumRectangle = maxSumRectangle;
}

// http://www.geeksforgeeks.org/maximum-size-sub-matrix-with-all-1s-in-a-binary-matrix/
// uses dynamic programming methodology
// doesn't print out the square but returns the dimension of the max square submatrix
function maxSquareSubMatrix(matrix) {
  var rows = matrix.length,
      columns = matrix[0].length;

  // create and initialize auxiliary table. Copy first row and column from original matrix. Set rest to zero which we'll update later
  var aux = [];
  aux[0] = matrix[0].slice(0);
  for (var i = 1; i < rows; i++) {
    aux[i] = [matrix[i][0], 0, 0, 0, 0];
  }

  for (var j = 1; j < columns; j++) {
    for (i = 1; i < rows; i++) {
      if (matrix[i][j] === 1) {
        // set the current cell to be the minimum value of the values to this cell's left, top and upper-left plus 1
        aux[i][j] = Math.min(aux[i][j - 1], Math.min(aux[i - 1][j], aux[i - 1][j - 1])) + 1;
      }
    }
  }

  // get max value in matrix
  var min = aux[0][0];
  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      if (aux[i][j] > min) {
        min = aux[i][j];
      }
    }
  }

  return min;
}

// http://www.geeksforgeeks.org/turn-an-image-by-90-degree/
function rotateImage(image) {
  var rows = image.length,
      columns = image[0].length,
      rotatedImage = [];
  // initialize each element of rotatedImage to be an array (note: notice that the length is columns not rows)    
  for (var i = 0; i < columns; i++) {
    rotatedImage[i] = [];
  }

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      //0,0 -> 0,3 
      //1,0 -> 0,2 (column affected by row)
      //0,1 -> 1,3 (row affected by column)
      rotatedImage[j][rows - i - 1] = image[i][j];
    }
  }
  return rotatedImage;
}

// http://www.geeksforgeeks.org/a-boolean-matrix-question/
function booleanMatrix(matrix) {
  var rows = matrix.length,
      columns = matrix[0].length,
      rowFlags = [],
      columnFlags = [];

  for (var i = 0; i < rows; i++) {
    rowFlags[i] = 0;
  }

  for (var j = 0; j < columns; j++) {
    columnFlags[j] = 0;
  }

  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      if (matrix[i][j] === 1) {
        rowFlags[i] = 1;
        columnFlags[j] = 1;
      }
    }
  }

  // set flagged rows to 1
  for (i = 0; i < rowFlags.length; i++) {
    for (j = 0; j < columnFlags.length; j++) {
      if (rowFlags[i] === 1 || columnFlags[j] === 1) {
        matrix[i][j] = 1;
      }
    }
  }

  console.log(matrix);
}

// http://www.geeksforgeeks.org/print-a-given-matrix-in-spiral-form/
// note: marking right and bottom with the ' - 1' makes the code easier as without 
//  it you'll have to put that logic in specific places in the code which is easy to mess up
function printSpiral(matrix) {
  var left = 0;
      right = matrix[0].length - 1,
      top = 0,
      bottom = matrix.length - 1,
      i = 0;

  while (true) {
    if (left > right || top > bottom) {
      break;
    }

    for (i = left; i <= right; i++) {
      console.log(matrix[top][i]);
    }
    top += 1;

    if (left > right || top > bottom) {
      break;
    }

    for (i = top; i <= bottom; i++) {
      console.log(matrix[i][right]);
    }
    right -= 1;

    if (left > right || top > bottom) {
      break;
    }

    for (i = right; i >= left; i--) {
      console.log(matrix[bottom][i]);
    }
    bottom -= 1;

    if (left > right || top > bottom) {
      break;
    }

    for (i = bottom; i >= top; i--) {
      console.log(matrix[i][left]);
    }
    left += 1;
  }
}

// http://www.geeksforgeeks.org/find-the-row-with-maximum-number-1s/
// assumption: rows are ordered
function maxNumberOnes(matrix) {
  var rows = matrix.length,
      columns = matrix[0].length,
      max = -Infinity,
      maxRow = 0;

  for (var i = 0; i < rows; i++) {
    var firstOneIndex = findFirstOneIndex(matrix[i]);
    if (firstOneIndex !== -1 && (columns - firstOneIndex) > max) {
      max = columns - firstOneIndex;
      maxRow = i;
    }
  }

  return maxRow;
}

function findFirstOneIndex(arr) {
  var lo = 0,
      hi = arr.length - 1;

  while (hi > lo) {
    var mid = lo + Math.floor((hi - lo) / 2);

    if (mid === 0 || (arr[mid - 1]) === 0 && arr[mid] === 1) {
      return mid;
    } else if (arr[mid] === 0) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return -1;
}

// http://www.geeksforgeeks.org/print-unique-rows/
function printUniqueRows(matrix) {
  var rows = matrix.length,
      columns = matrix[0].length,
      trie = new Trie();

  // insert first row into trie
  trie.addWord(matrix[0].join(''));
  console.log(matrix[0]);

  for (var i = 1; i < rows; i++) {
    if (!trie.isWord(matrix[i].join(''))) {
      console.log(matrix[i]);
    }
  }
}


// see http://www.geeksforgeeks.org/dynamic-programming-set-8-matrix-chain-multiplication/
// also see http://www.geeksforgeeks.org/strassens-matrix-multiplication/
// assumes a square matrix
function naiveMatrixMultiplication(m1, m2) {
  var n = m1.length,  // since it's a square matrix, rows and columns are the same
      result = [];
  for (var i = 0; i < n; i++) {
    result[i] = [];
  }

  for (i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      result[i][j] = 0;
      for (var k = 0; k < n; k++) {
        result[i][j] += m1[i][k] * m2[k][j];
      }
    }
  }

  return result;
}

// http://www.geeksforgeeks.org/kth-smallest-element-in-a-row-wise-and-column-wise-sorted-2d-array-set-1/
// algorithm: add all elements into a min-heap and pop elements k times. Return kth pop. (there is probably a better solution)
function kthSmallestElement(matrix, k) {
  var rows = matrix.length,
      columns = matrix[0].length,
      heap = new Heap(function(x) { return x; });

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      heap.push(matrix[i][j]);
    }
  }

  for (i = 0; i < k - 1; i++) {
    heap.pop();
  }
  return heap.pop();
}

// http://www.geeksforgeeks.org/divide-conquer-set-6-search-row-wise-column-wise-sorted-2d-array/
// assumption: every row is sorted from left to right last # in each row is less than the first # in the next row
// algorithm: you can treat the matrix as a 1-D sorted array
function searchSortedMatrix1(matrix, value) {
  var rows = matrix.length,
      columns = matrix[0].length,
      lo = 0,
      hi = rows * columns - 1;

  while (hi >= lo) {
    var mid = Math.floor((hi + lo) / 2),

        /** this is the tricky part **/
        row = Math.floor(mid / columns);
        column = mid % columns,
        
        v = matrix[row][column];

    if (v === value) {
      return true;
    }

    if (v > value) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return false;
}

// every row is increasingly sorted from left to right, and every column is increasingly sorted from top to bottom
// http://www.geeksforgeeks.org/divide-conquer-set-6-search-row-wise-column-wise-sorted-2d-array/ (Apress book solution below)
function searchSortedMatrix2(matrix, value) {
  var rows = matrix.length,
      columns = matrix[0].length,
      row = 0,
      column = columns - 1;

  while (row < rows && column >= 0) {
    if (matrix[row][column] === value) {
      return true;
    }

    if (matrix[row][column] > value) {
      column -= 1;
    } else {
      row += 1;
    }
  }

  return false;
}

// http://www.geeksforgeeks.org/given-n-x-n-square-matrix-find-sum-sub-squares-size-k-x-k/
function findSubSquares(matrix, k) {
  var n = matrix.length,
      stripSum = [];
      result = [];

  if (k > n) {
    return;
  }

  for (var i = 0; i < (n - k + 1); i++) { // columns - k + 1 equals the max # of k-dimension subsquares plus 1
    stripSum[i] = [];
    result[i] = [];
  }

  // Step 1: Preprocessing - store sums of all strips of dimensions k x 1
  for (var j = 0; j < n; j++) {
    // calculate sum f the first k x 1 rectangle in this column
    var sum = 0;
    for (i = 0; i < k; i++) {
      sum += matrix[i][j];
    }
    stripSum[0][j] = sum;

    // calculate remaining rectangles (we do the very first strip separately as the sum is used going forward down the rows)
    for (i = 1; i < (n - k + 1); i++) {   // columns - k + 1 equals the max # of k-dimension subsquares plus 1
      sum += matrix[i + k - 1][j] - matrix[i - 1][j]; // add the next row value and subtract the value of the top row of the subsquare
      stripSum[i][j] = sum;
    }
  }
/* stripSum so far from test case matrix:
[ [ 6, 6, 6, 6, 6 ], 
  [ 9, 9, 9, 9, 9 ], 
  [ 12, 12, 12, 12, 12 ] ]
*/

  // Step 2: Calculate sum of subsquares using stripSum
  for (i = 0; i < (n - k + 1); i++) {
    // calculate and print sum of first subsquare in this row
    var sum = 0;
    for (j = 0; j < k; j++) {
      sum += stripSum[i][j];
    }
    var output = '';
    output += sum + ' ';

    // calculate sum of remaining squares in current row by removing the leftmost strip of previous subsquare and adding a new strip
    for (j = 1; j < (n - k + 1); j++) {
      sum += stripSum[i][j + k - 1] - stripSum[i][j - 1];
      output += sum + ' ';
    }
    console.log(output);

  }
}

// http://www.geeksforgeeks.org/dynamic-programming-set-27-max-sum-rectangle-in-a-2d-matrix/
function maxSumRectangle(matrix) {
  var rows = matrix.length,
      columns = matrix[0].length;
}

// http://www.geeksforgeeks.org/inplace-m-x-n-size-matrix-transpose/
function inPlaceTranspose(matrix) {
  var rows = matrix.length,
      columns = matrix[0].length;
}

// http://www.geeksforgeeks.org/print-matrix-diagonally/
function printMatrixDiagonally(matrix) {
  var rows = matrix.length,
      columns = matrix[0].length,
      totalLines = rows + columns - 1;  // there will be rows + columns - 1 lines in the output

  for (var line = 1; line <= totalLines; line++) {
    // get column index of the first element in this line. Index is 0 for first rows lines and line - row for remaining lines
    var startColumn = Math.max(0, line - rows);

    // get count of elements in this line. Count is equal to minimum of line number, column - startColumn and row
    var count = Math.min(line, Math.min(columns - startColumn, rows));

    // print elements of this line
    var output = '';
    for (var j = 0; j < count; j++) {
      output += matrix[Math.min(rows, line) - j - 1][startColumn + j] + ' ';
    }
    console.log(output);
  }
}

module.exports = Matrix;

/* NOTES
REVIEW: matrix multiplication
*/