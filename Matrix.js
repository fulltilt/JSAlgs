var Trie = require('./Strings/Trie.js');

function Matrix() {
  this.maxSquareSubMatrix = maxSquareSubMatrix;
  this.rotateImage = rotateImage;
  this.booleanMatrix = booleanMatrix;
  this.printSpiral = printSpiral;
  this.maxNumberOnes = maxNumberOnes;
  this.printUniqueRows = printUniqueRows;
  this.printMatrixDiagonally = printMatrixDiagonally;
  this.strassensMatrixMultiplication = strassensMatrixMultiplication;
  this.kthSmallestElement = kthSmallestElement;
  this.searchSortedMatrix = searchSortedMatrix;
  this.findSubSquares = findSubSquares;
  this.findIslands = findIslands;
  this.inPlaceTranspose = inPlaceTranspose;
  this.maxSumRectangle = maxSumRectangle;
  this.countAllPaths = countAllPaths;
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

// http://www.geeksforgeeks.org/print-matrix-diagonally/
function printMatrixDiagonally(matrix) {

}

// http://www.geeksforgeeks.org/strassens-matrix-multiplication/ (see http://www.geeksforgeeks.org/dynamic-programming-set-8-matrix-chain-multiplication/)
function strassensMatrixMultiplication(matrix) {

}

// http://www.geeksforgeeks.org/kth-smallest-element-in-a-row-wise-and-column-wise-sorted-2d-matrixay-set-1/
function kthSmallestElement(matrix) {

}

// http://www.geeksforgeeks.org/divide-conquer-set-6-search-row-wise-column-wise-sorted-2d-matrixay/
function searchSortedMatrix(matrix) {

}

// http://www.geeksforgeeks.org/given-n-x-n-square-matrix-find-sum-sub-squares-size-k-x-k/
function findSubSquares(matrix) {

}

// http://www.geeksforgeeks.org/find-number-of-islands/
function findIslands(matrix) {

}

// http://www.geeksforgeeks.org/dynamic-programming-set-27-max-sum-rectangle-in-a-2d-matrix/
function maxSumRectangle(matrix) {

}

// http://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/
function countAllPaths(matrix) {

}

// http://www.geeksforgeeks.org/inplace-m-x-n-size-matrix-transpose/
function inPlaceTranspose(matrix) {
//  var rows = matrix
}

module.exports = Matrix;