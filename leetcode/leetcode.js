
/*

-[1,0,-1].sort((prev, next) => prev > next)	// sort ascending
-[1,0,-1].sort((prev, next) => next > prev)	// sort descending
-Object.assign(target,....sources) // shallow object copy
-slice isn't mutable but splice is
-input.replace(/\W/g, '');	//remove nonalphanumeric
-overflow optimization: instead of (lo + hi) / 2, do start + (end - start) / 2
-https://discuss.leetcode.com/topic/50315/a-summary-how-to-use-bit-manipulation-to-solve-problems-easily-and-efficiently/32
-sort descending: nums.slice(0).sort((a, b) => b - a);  // make sure you use b - a and not a < b as a < b returns a boolean and 
 for sort to work correctly, you have to pass an integer value


TIPS
-an optimization could be to preprocess the data
-sometimes you have to go through more than 2-3 examples to see a pattern (see Nim game)
-it's super important to have one or a couple of examples

*/

let TreeNode = function(val) {
	this.val = val;
	this.left = null;
	this.right = null;
}

let LinkedListNode = function(val) {
	this.val = val;
	this.next = null;
}

let printLinkedList = function(head) {
	let current = head;
	while(current) {
		console.log(current.val);
		current = current.next;
	}
}

/* 1. 2Sum (unsorted)
var twoSum = function(nums, target) {
	let table = {};
	for (let i = 0; i < nums.length; ++i) {
		table[nums[i]] = i;	// tricky part is to set the value to be the index in the original array
	}

	for (let i = 0; i < nums.length; ++i) {
		if (table[target - nums[i]]) {
			return [i, table[target - nums[i]]];
		}
	}

	return null;
}

// console.log(twoSum([2,7,11,15], 9))
*/

/* 2Sum (sorted)
var twoSumSorted = function(nums, target) {
	let lo = 0;
			hi = nums.length - 1;

	while (hi > lo) {
		if (nums[lo] + nums[hi] > target) {
			hi--;
		} else if (nums[lo] + nums[hi] < target) {
			lo++;
		} else {
			return [lo, hi];
		}
	}

	return null;
}

console.log(twoSumSorted([2,7,11,15], 9))


/* 3Sum
*/
var threeSum = function(nums) {
	let lo = 0,
			hi = 2,
			results = [];

	for (let i = 0; i < nums.length; ++i) {
		let firstVal = nums[i],
				table = {};

		// note: since we don't worry about indices, this map handles duplicates by overwriting repeated key/value pairs
		for (let j = 0; j < nums.length; j++) {
			if (j === i) {
				continue;
			}

			table[nums[j]] = true;
		}
		
		for (let j = 0; j < nums.length; j++) {
			if (j === i) {
				continue;
			}

			let tempTable = {};
			Object.assign(tempTable, table);
			delete tempTable[nums[j]];

			if (tempTable[-firstVal - nums[j]]) {
				results.push([firstVal, nums[j], -firstVal - nums[j]]);
			}
		}
	}

	return results;
}


// console.log(threeSum([-1, 0, 1, 2, -1, -4]))


/* 543 - diameter of binary tree (note: has redundant calculations and extra space for diameters array)
let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

// given a node, return the length of the longest path to a leaf between the left and right children
let getLongestPathToLeaf = function(root) {
	if (root === null) {
		return 0;
	}

	return 1 + Math.max(getLongestPathToLeaf(root.left), getLongestPathToLeaf(root.right));
}

let traverseTreeToGetDiameters = function(root, diameters) {
	if (root === null) {
		return 0;
	}

	traverseTreeToGetDiameters(root.left, diameters);
	traverseTreeToGetDiameters(root.right, diameters);
	diameters.push(getLongestPathToLeaf(root.left) + getLongestPathToLeaf(root.right));
	
}

var diameters = [];
traverseTreeToGetDiameters(root, diameters);
console.log(diameters.reduce((prev, next) => Math.max(prev, next)));
*/


/* 28. Implement strStr()
var strStr = function(haystack, needle) {
	for (let i = 0; ; ++i) {
		for (let j = 0; ; ++j) {
			if (j === needle.length) {	// if this condition holds, we found needle
				return i;
			}

			if ((i + j) === haystack.length) {	// if this condition holds, that means we made it to the end of haystack before the end of needle
				return -1;
			}

			if (needle[j] !== haystack[i + j]) {
				break;
			}
		}
	}    
};

console.log(strStr('jafejawopenis', 'penis'));
console.log(strStr('penisasdfasdfas', 'penis'));
console.log(strStr('jafejanunilwopenisasdfasf', 'penis'));
console.log(strStr('jafejawopjenis', 'penis'));
console.log(strStr('peniasdfasdfas', 'penis'));
console.log(strStr('jafejawoenisasdfasf', 'penis'));
*/


/* 26. Remove Duplicates from Sorted Array
var removeDuplicates = function(nums) {
	if (nums.length === 0 || nums.length === 1) {
		return nums.length;
	}

  let newLength = 1;	// this only gets incremented when a new element is encountered (this also doubles as the new length)
  for (let i = 1; i < nums.length; ++i) { // start at 1 as the initial check covers the first element
    if (nums[i] !== nums[i - 1]) {	// if current element !== previous element
    	nums[newLength++] = nums[i];			// nums[length] = current element
    }
  }

  return newLength;
}

console.log(removeDuplicates([1,1,2,2,2,2,3,4,5,6,6,6,7]));
*/


/* 283. Move Zeroes
var moveZeroes = function(nums) {
	let lo = 0,	// searches for zeroes
			hi = 0;

	while (true) {
		while (nums[lo] !== 0 && lo !== nums.length) {
			lo++;
		}

		if (lo === nums.length) {
			break;
		}

		hi = lo + 1;
		while (nums[hi] === 0 && hi !== nums.length) {
			hi++;
		}

		if (hi === nums.length) {
			break;
		} else {
			let temp = nums[lo];
			nums[lo] = nums[hi];
			nums[hi] = temp;
		}
	}
};

// better way (logic similar to 26. Remove duplicates from sorted array)
var moveZeroes = function(nums) {
	let j = 0;
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] != 0) {
      let temp = nums[j];
      nums[j] = nums[i];
      nums[i] = temp;
      j++;
    }
  }	
}

let nums = [0,1,0,3,12];
moveZeroes(nums);
console.log(nums);
*/


/* 38. Count and say (apparently the question wording is misleading so the bottom is not correct)
var countAndSay = function(n) {
  let res = '',
      str = String(n),
      current, count;
      
  while (str) {
  	current = str[0];
  	count = 1;

		while (current === str[count] && count !== str.length) {
			count++;
		}
		res = res + count + current;

		str = str.slice(count);
	}

	return res;
};

console.log(countAndSay(111221))
*/

/* 125. Valid Palindrome
var isPalindrome = function(s) {
	s = s.toUpperCase().replace(/\W/g, '');

	for (let i = 0; i < Math.floor(s.length / 2); i++) {
		if (s[i] !== s[s.length - i - 1]) {	// tricky part is to remember the - 1
			return false;
		}
  }

  return true;
};

console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("race a car"));
*/

/* 121. Best Time to Buy and Sell Stock
var maxProfit = function(prices) {
	if (prices.length === 0 || prices.length === 1) {
    return 0;
  }

  let profit = 0,
   		smallest = prices[0];

  for (let i = 1; i < prices.length; i++) {
  	if (prices[i] < smallest) {
  		smallest = prices[i];
  	} else if ((prices[i] - smallest) > profit) {
  		profit = prices[i] - smallest;
  	}
  }

  return profit;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));
*/


/* 102. Binary Tree Level Order Traversal
var levelOrder = function(root) {
	if (root === null) {
		return [];
	}

	let res = [],
			children = [];
	children.push(root);

	while (children.length > 0) {
		let currentLevel = children
				level = [];
		children = [];

		for (let i = 0; i < currentLevel.length; ++i) {
			let current = currentLevel[i];
			level.push(current.val);
			if (current.left) {
				children.push(current.left);
			}
			if (current.right) {
				children.push(current.right);
			}			
		}

		res.push(level);
	}

	return res;
};

let root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);
levelOrder(root)
*/

/* 168. Excel Sheet Column Title
    1 -> A
    2 -> B
    3 -> C
    ...
    26 -> Z
    27 -> AA
    28 -> AB 

-Conversion from 10-ary numbers to 26-ary numbers. The tricky part is the lack of the equivalent number '0' in the 26-ary system.
-Instead of 1 -> A, 26 -> Z, we can assume that 0 -> A, 25 -> Z, and then here comes the base 26 representation, it's similar when you convert a number from base 10 to base 2
-(on why you do the n - 1)
The idea is this: suppose you have excel title 52 = AZ = A * 26 + Z * 1, where A = 1, Z = 26.
Now you shift each digit down i.e. A' = 0, and Z' = 25.
Then 52 = AZ = (A' + 1) * 26 + (Z' + 1) * 1.

So now you need to find A' and Z'. Z' = (52 - 1) % 26 = 25, which is (n-1)%26 in the code above.
Now you need to get A' + 1 from 26 * (A' + 1) + (Z' + 1)
If you simply do n/=26, Z' + 1 will give additional 1. So you will get n = 2 instead of n = 1.
To avoid this you do n = (n-1)/26


var convertToTitle = function(n) {
    var title = '';
    while (n > 0) {
        // if (n % 26 === 0) {
        //     title = 'Z' + title;
        //     n = Math.floor(n / 26) - 1;
        // } else {
        //     title = String.fromCharCode(n % 26 + 64) + title;
        //     n = Math.floor(n / 26);
        // }
        
        n -= 1;	// not clear on why we have to do n--;
        title = String.fromCharCode(n % 26 + 65) + title;	// 'A' is 65 in ascii
        n = Math.floor(n / 26);
    }

    return title;
};

Example: n = 52
title = '';

1:
 52-- = 51
 title = String.fromCharCode(51 % 26 + 65) + title  => String.fromCharCode(90) + title => 'Z' + '';
 n = Math.floor(51 / 26) => 1

2:
 1-- = 0
 title = String.fromCharCode(0 % 26 + 65) + 'Z' => String.fromCharCode(65) + 'Z' => 'A' + 'Z' => 'AZ'
 n = 0
*/


/* 13. Roman to Integer
*/
// public int romanToInt(String s) {
//      int sum=0;
//     if(s.indexOf("IV")!=-1){sum-=2;}
//     if(s.indexOf("IX")!=-1){sum-=2;}
//     if(s.indexOf("XL")!=-1){sum-=20;}
//     if(s.indexOf("XC")!=-1){sum-=20;}
//     if(s.indexOf("CD")!=-1){sum-=200;}
//     if(s.indexOf("CM")!=-1){sum-=200;}
    
//     char c[]=s.toCharArray();
//     int count=0;
    
//    for(;count<=s.length()-1;count++){
//        if(c[count]=='M') sum+=1000;
//        if(c[count]=='D') sum+=500;
//        if(c[count]=='C') sum+=100;
//        if(c[count]=='L') sum+=50;
//        if(c[count]=='X') sum+=10;
//        if(c[count]=='V') sum+=5;
//        if(c[count]=='I') sum+=1;
       
//    }
   
//    return sum;
    
// }

// console.log(romanToInt('MMMCMXCIX')); // 3999

/* 206. Reverse Linked List (a big help is having the previous pointer that is initally set to null)
var reverseList = function(head) {
  if (head === null) {
   	return null;
  }

  let previous = null,
  		current = head;

  while (current) {
  	let next = current.next;
  	current.next = previous;
  	previous = current;
  	current = next;
  }

  return previous;
};

let head = new LinkedListNode(1);
head.next = new LinkedListNode(2);
head.next.next = new LinkedListNode(3);
let reversed = reverseList(head);
printLinkedList(reversed);
*/

/* 235. Lowest Common Ancestor of a Binary Search Tree
var lowestCommonAncestor = function(root, p, q) {
	if (root === null) {
		return root;
	}
    
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q)
  } else if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q)
  } else {
    return root;
  }
};

let root = new TreeNode(6);
root.left = new TreeNode(2);
root.right = new TreeNode(8);
root.right.left = new TreeNode(7);
root.right.right = new TreeNode(9);
root.left.left = new TreeNode(0);
root.left.right = new TreeNode(4);
root.left.right.left = new TreeNode(3);
root.left.right.right = new TreeNode(5);

console.log(lowestCommonAncestor(root, root.left, root.right));
console.log(lowestCommonAncestor(root, root.left, root.left.right));
*/


/* 257. Binary Tree Paths
var binaryTreePaths = function(root) {
  if (root === null) {
  	return [];
  }

  let res = [],
  		path = '';
  binaryTreePathsHelper(root, path, res);

  return res;
};

let binaryTreePathsHelper = function(root, path, res) {
	if (root === null) {
		return;
	}

	if (!root.left && !root.right) {
		res.push(path + root.val);
		return;
	} else {
		if (root.left) {
			binaryTreePathsHelper(root.left, path + root.val + '->', res);
		}
		
		if (root.right) {
			binaryTreePathsHelper(root.right, path + root.val + '->', res);
		}
	}
}

let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.right = new TreeNode(5);
console.log(binaryTreePaths(root));
*/


/* 278. First Bad Version
You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which will return whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

(this is basically asking you to do a binary search)

var solution = function(isBadVersion) {

    return function(n) {
        let lo = 1,
            hi = n;
            
        while (lo < hi) {
            let mid = Math.floor(lo + (hi - lo) / 2);
            if (!isBadVersion(mid)) {
                lo = mid + 1
            } else {
                hi = mid;	// note: normally I'd think to do 'hi = mid - 1'. Does having n non-zero indexed have something to do with it?
            }
        }
        return lo;	// Because there will alway be a bad version, return lower here
    };
};
*/


var NumArray = function(nums) {
    this.table = {};
    this.table[0] = nums[0]
    for (let i = 1; i < nums.length; ++i) {
        this.table[i] = nums[i] + this.table[i - 1];
    }
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
    return i === 0 ? this.table[j] : this.table[j] - this.table[i - 1];
};

var obj = new NumArray([-2, 0, 3, -5, 2, -1])
// console.log(obj.sumRange(0, 2));
// console.log(obj.sumRange(2, 5));
// console.log(obj.sumRange(0, 5));

var swap = function(nums, x, y) {
	let temp = nums[x];
	nums[x] = nums[y];
	nums[y] = temp;
}

var findDisappearedNumbers = function(nums) {
  for (let i = 0; i < nums.length; ++i) {
  	while ((nums[i] !== i + 1) && (nums[i] !== (nums[nums[i] - 1]))) {	// *tricky part (namely the 2nd condition)
  		swap(nums, i, nums[i] - 1);
  	}
  }

  let results = [];
  for (let i = 0; i < nums.length; ++i) {
  	if (nums[i] !== i + 1) {
  		results.push(i + 1);
  	}
  }

  return results;
};
// console.log(findDisappearedNumbers([4,3,2,7,8,2,3,1]));

// https://leetcode.com/problems/move-zeroes/#/description
// example of having a placeholder and a leading index where you swap on a condition
var moveZeroes = function(nums) {
  if (nums === null || nums.length < 2) {
  	return nums;
  }

  let insertPos = 0;
  for (let i = 0; i < nums.length; ++i) {
  	if (nums[i] !== 0) {
  		nums[insertPos++] = nums[i];
  	}
  }

  for( ; insertPos < nums.length; insertPos++) {
  	nums[insertPos] = 0;
  }

  console.log(nums)
};

// moveZeroes([0, 1, 0, 3, 12]);


var findRelativeRanks = function(nums) {
	let sortedNums = nums.slice(0).sort((a, b) => b - a);	// sort descending
	
	let sortedNumsMapping = {};
  sortedNums.forEach((num, index) => sortedNumsMapping[num] = String(index + 1));

	return nums.map(x => {
		if (sortedNumsMapping[String(x)] === '1') {
			return 'Gold Medal';
		} else if (sortedNumsMapping[String(x)] === '2') {
			return 'Silver Medal';
		} else if (sortedNumsMapping[String(x)] === '3') {
			return 'Bronze Medal';
		} else {
			return sortedNumsMapping[String(x)];
		}
	}); 
}

console.log(findRelativeRanks([5,4,3,2,1]));
// console.log(findRelativeRanks([10,3,8,9,4]));
//[10,3,8,9,4]	// ["Gold Medal","5","Bronze Medal","Silver Medal","4"]

// https://leetcode.com/problems/base-7/#/description
// convert a decimal to any base number using repeated multiplication algorithm
var convertFromDecimalToAnyBase = function(num, base) {
	if (num === 0) return '0';

	let negative = false;
	if (num < 0) {
		negative = true;
		num = Math.abs(num);
	}

	let res = '';
	while (num / base > 0) {
		res = num % base + res;	// add the modulo before res
		num = Math.floor(num / base);
	}
	
	return negative ? '-' + res : res;
}

console.log(convertFromDecimalToAnyBase(100, 7));
console.log(convertFromDecimalToAnyBase(-7, 7))


var constructRectangle = function(area) {
  let a = Math.floor(Math.sqrt(area));
  while (area % a !== 0) {
  	a--;
  }

  return [Math.floor(area / a), a];
};
console.log(constructRectangle(4))