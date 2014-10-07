function Apress() {
  this.searchIncreasinglySorted = searchIncreasinglySorted;
  this.replaceBlanks = replaceBlanks;
  this.mergeSortedArrays = mergeSortedArrays;
}

/* Question 8: In a 2-D matrix, every row is increasingly sorted from left to right, and every column is 
increasingly sorted from top to bottom. Please implement a function to check whether a number is in such a 
matrix or not. For example, all rows and columns are increasingly sorted in the following matrix. It returns trueif it 
tries to find number 7, but it returns falseif it tries to find number 5. 
1 2 8 9 
2 4 9 12 
4 7 10 13 
6 8 11 15 

-algorithm: removing columns and rows. Starting from the upper-right, keep going left until you find the first column whose first value is less than the target.
            Then once you eliminated the columns, to eliminate rows, keep going down the current row until you either find the value in question or find a value
            that is greater than the target. From here, you have eliminated all the parts of the array where the answer can't be
*/
function searchIncreasinglySorted(matrix, n) {
  var row = 0,
      column = matrix[0].length - 1; // start and the upper-right corner

  while (row < matrix.length && column >= 0) {
    if (matrix[row][column] === n) {
      return true;
    }

    // when I originally wrote this, I had two separate while statements to individually find the column and row respectively. Lastly, I needed a 3rd clause to search for the value
    if (matrix[row][column] > n) {
      --column;
    } else {
      ++row;
    }
  }

  return false;
}

/*  Question 9: Please implement a function to replace each blank in a string with “%20”. For instance, it outputs “We%20are%20happy.” if the input is “We are happy.”. 
-note: we can't use replace and we'e assuming C style arrays so we can't use split on spaces and then create a new array and iterate through a loop append '%20' at each iteration until the very last one
-algorithm: if we go from left to right, we have to constantly shift all indices to the right 1 and this can result in O(n^2). An O(n) solution is count the # of spaces and then create a new array
 and add elements from right to left which eliminates the need to constantly shift right
*/
function replaceBlanks(str) {
  // get the # of spaces which will be used to determine the size of the new array
  var spaces = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      ++spaces;
    }
  }

  var arr = [];
  arr.length = str.length + (2 * spaces); // artificially set the length of the array. '* 2' as the it's replacing a space which is 1 character
  var newPtr = arr.length - 1;

  for (i = str.length - 1; i >= 0; --i) {
    if (str[i] !== ' ') {
      arr[newPtr--] = str[i];
    } else {
      arr[newPtr--] = '0';
      arr[newPtr--] = '2';
      arr[newPtr--] = '%';
    }
  }

  return arr.join('');
}

/* Question 10: Given two sorted arrays, denoted as array1and array2, please merge them into array1 and 
keep the merged array sorted. Suppose there is sufficient vacant memory at the end of array1to accommodate 
elements of array2
*/
function mergeSortedArrays(arr1, arr2) {
  // create pointers to the last indices of each array
  var arr1Ptr = arr1.length - 1,
      arr2Ptr = arr2.length - 1;

  arr1.length = arr1.length + arr2.length;
  var arr3Ptr = arr1.length - 1;
  
  while (arr1Ptr >= 0 && arr2Ptr >= 0) {
    console.log(arr1[arr1Ptr] + ' ' + arr2[arr2Ptr] + ' ' + arr1Ptr + ' ' + arr2Ptr);
    if (arr1[arr1Ptr] > arr2[arr2Ptr]) {
      arr1[arr3Ptr--] = arr1[arr1Ptr--];
    } else {
      arr1[arr3Ptr--] = arr2[arr2Ptr--];
    }
  }

  // since arr1 is already sorted, if there's leftovers, it will already be sorted. We only have to worry about the 2nd arrays leftovers
  while (arr2Ptr >= 0) {
    arr1[arr3Ptr--] = arr2[arr2Ptr--];
  }

  return arr1;
}


module.exports = Apress;

// SKIPPED: 12,13
