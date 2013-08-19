/*
 * Implement a function to perform binary search on a sorted array of integers
 * to return the index of a given target integer.
 * Use the following method prototype:
 *
 *      function binarySearch(array, lower, upper, target);
 */
var binarySearch = function(array, target) {
	var start = 0;
	var end = array.length - 1;

	while (start <= end) {
		middle = (start + end) / 2;
		if (array[middle] === target) {
			return middle;
		} else if (array[middle] > target) {
			end = middle - 1;
		} else {
			start = middle + 1;
		}
	}

	return -1;
} 

console.log('Testing binarySearch()...');
var arr = [1,2,3,4,6,7,8];
console.log(binarySearch(arr, 2));
console.log(binarySearch(arr, 5));
console.log(binarySearch(arr, 6));