function TreeNode(val) {
      this.val = val;
      this.left = this.right = null;
  }

var sumNumbers = function(root) {
    if (root === null) {
        return null;
    }
    _sumNumbers(root.left, root.val + '')
    _sumNumbers(root.right, root.val + '')
    //return _sumNumbers(root.left, root.val + '') + _sumNumbers(root.right, root.val + '');
};

var _sumNumbers = function(node, temp) {
    if (noede === null) {
        //console.log(temp);
        return;
        //return parseInt(temp);
    }

    temp = temp + node.val;
    var left = _sumNumbers(node.left, temp),
        right = _sumNumbers(node.right, temp);
//console.log(left, right)
    if (left === null && right === null) {
        console.log(temp)
        return;
        //return parseInt(temp);   
    }

    temp = temp.substring(0, temp.length - 1);
}

var x = new TreeNode(1),
    y = new TreeNode(2),
    z = new TreeNode(3);
x.left = y;
x.right = z;

console.log(sumNumbers(x));    
/* IS VALID SUDOKU ... */

/* Add Binary Strings
    var addBinary = function(a, b) {
        var result = '',
            m = a.length,
            n = b.length,
            tmp = 0;

        while (m + n > 0){
            // start from last char of a and b
            // notice that left side is int and right side is char
            // so we need to  minus the decimal value of '0'
            tmp += m > 0 ? a[--m] - '0': 0;
            tmp += n > 0 ? b[--n] - '0': 0;

            result = tmp % 2 + result;
            tmp = Math.floor(tmp / 2);
        }
        // the final length of the result depends on the bigger length between a and b, 
        // (also the value of carry, if carry = 1, add "1" at the head of result, otherwise)
        return (tmp == 0) ? result: '1' + result;
    }
*/

/* Climbing Stairs
https://leetcode.com/discuss/16866/basically-its-a-fibonacci
var climbStairs = function(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    if (n === 2) return 2;

    var oneStepBefore = 1,
        twoStepsBefore = 2,
        allWays = 0;

    for (var i = 2; i < n; ++i) {
        allWays = oneStepBefore + twoStepsBefore;
        oneStepBefore = twoStepsBefore;
        twoStepsBefore = allWays;
    }

    return allWays;
};

/*
 * Ideas:
 * Use Dynamic Programming,
 * for each step, the stair could ether combine with the previous one or as a single step.
 * Ways to climb to ith stair is W(i) = W(i-1) + W(i-2)
 * where W(i-1) is when the ith stair is as a single step
 * and W(i-2) is when the ith stair is paired with the previous one.
 *
var climbStairs = function(n) {
    var table = [];

    if (n < 2) {
        return 1;
    }

    table[0] = 1;
    table[1] = 2;
    for (var i = 2; i < n; i++) {
        table[i] = table[i - 1] + table[i - 2];
    }
    return table[n - 1];
}
*/

function sumTo100() {
    var arr = [2,3,4,5,6,7,8,9];
    _sumTo100(arr, 0, ['1'], 100)
}

function _sumTo100(arr, i, res, sum) {
    var len = 2;
    if (i === len) {
console.log('final:',res, sum)        
        return;
    } if ((i === len - 1) && sum === 0) {
        console.log('solution:', res, sum);
        return;
    }

    var resCopy = res.slice(),
        resLen = res.length, tsum;

    // add
    if (typeof(res[resLen - 1]) === 'string')
        sum = sum - parseInt(res[resLen - 1]);

    resCopy.push('+');
    resCopy.push(arr[i]); 
    _sumTo100(arr, i + 1, resCopy.slice(), sum - arr[i]);

    // subtract
    resCopy = res.slice();
    resCopy.push('-');
    resCopy.push(arr[i]);
    _sumTo100(arr, i + 1, resCopy.slice(), sum + arr[i]);

    // combine
    if (i === 0) {
        sum = sum + parseInt(res[resLen - 1]);
    }

    resCopy = res.slice();
    resCopy[resLen - 1] = res[resLen - 1] + '' + arr[i];
    _sumTo100(arr, i + 1, resCopy.slice(), sum);
}


var wordBreak = function(s, wordDict) {
    var len = s.length, i = 1;

    if (wordDict.size === 0) {
        return false;
    }
    
    if (s.length === 1) {
        return wordDict.has(s) === true;
    }
    
    while (i < len) {
        if (wordDict.has(s.substring(0, i)) === true && wordDict.has(s.substring(i)) === true) {
            return true;
        }
        i += 1;
    }

    return false; 
};
//
//console.log(wordBreak('aaaaaaa', new Set()))

/* Letter Combinations of a Phone Number 
var letterCombinations = function(digits) {
    if (digits === '') {
        return [];
    }
    
    var results = [];
    _letterCombinations(digits, 0, '', results);
    return results;
};

var _letterCombinations = function(digits, index, perm, results) {
    if (index === digits.length) {
        results.push(perm);
        return;
    }
    var table = {
        0:'',
        1:'',
        2:'abc',
        3:'def',
        4:'ghi',
        5:'jkl',
        6:'mno',
        7:'pqrs',
        8:'tuv',
        9:'wxyz'
    }

    var set = table[digits[index]];
    for (var i = 0; i < set.length; ++i) {
        _letterCombinations(digits, index + 1, perm + set[i], results)
    }
};
*/

/* REORDER LIST 
(ex. Given {1,2,3,4}, reorder it to {1,4,2,3}) 
 {1,2,3,4,5} -> {1,5,2,4,3} 
var reorderList = function(head) {
    if (head === null) {
        return;
    }
    var current = head,
        length = 0,
        nodes = [];

    // get length
    while (current !== null) {
        length += 1;
        nodes.unshift(current)
        current = current.next;
    }

    if (length === 1) {
        return;
    }

    current = head;
    var reverseIndex = 0,
        halfLen = Math.floor(length / 2),
        i = 0;
    while (i < halfLen) {
        var tNext = current.next;
        current.next = nodes[reverseIndex];
        nodes[reverseIndex].next = tNext;
        current = tNext;
        reverseIndex += 1;
        
        i += 1;
    }
    current.next = null;
}
*/

/* Implement strStr()
var strStr = function(haystack, needle) {
    if ((haystack === '' && needle === '') || needle === '') {
        return 0;
    }
    
    var hLen = haystack.length,
        nLen = needle.length, 
        result = -1, 
        i = 0;
        
    while ((i + nLen) <= hLen) {
        if (needle[0] === haystack[i]) {
            var found = true;
            for (var j = 1; j < nLen; ++j) {
                if (needle[j] !== haystack[i + j]) {
                    found = false;
                    break;
                }
            }
            if (found) {
                return i;
            }
        }
        i += 1;
    }    
    return -1;
};
*/

/* Merge Sorted Array in place
var merge = function(nums1, m, nums2, n) {
    var gIndex = m + n - 1,
        i = m - 1,
        j = n - 1;
    
    while (i > -1 && j > -1) {
        if (nums1[i] > nums2[j]) {
            nums1[gIndex] = nums1[i];
            i -= 1;
        } else {
            nums1[gIndex] = nums2[j];
            j -= 1;
        }
        gIndex -= 1;
    }
    
    while (i >= 0) {
        nums1[gIndex--] = nums1[i--];
    }
    
    while (j >= 0) {
        nums1[gIndex--] = nums2[j--];
    }
    console.log(nums1)
};

merge([1,3,4,5,7], 5, [2,6,10,20], 4)
*/

/* REMOVE ELEMENT in place
var removeElement = function(nums, val) {
    var len = nums.length,
        hi = len - 1, lo = 0, newLength = 0;

    // make sure hi doesn't point to a value to be deleted so we don't swap an invalid value
    while (nums[hi] === val && hi >= 0) {
        hi -= 1;        
    }    
    
    while (hi >= lo) {
        

        if (nums[lo] === val) {
            var temp = nums[lo];
            nums[lo] = nums[hi];
            nums[hi] = temp;
            hi -= 1;
        } 
        newLength += 1;
        lo += 1;
        
        while (nums[hi] === val && hi >= 0) {
            hi -= 1;        
        }
    }

    return newLength;
};
*/

/* INTEGER TO ROMAN (other solutions are prettier yet still ugly)
var intToRoman = function(num) {
    var result = '', i;

    var temp = Math.floor(num / 1000);
    num %= 1000;
    if (temp > 0) {
        for (i = 0; i < temp; ++i) {
            result += 'M'
        }
    }

    temp = Math.floor(num / 100);
    num %= 100;
    if (temp > 0) {
        if (temp === 4) {
            result += 'CD';
        } else if (temp === 9) {
            result += 'CM';
        } else {
            if ((temp - 5) >= 0) {
                result += 'D';
                temp -= 5;
            }

            for (i = 0; i < temp; ++i) {
                result += 'C'
            }
        }
    }

    temp = Math.floor(num / 10);
    num %= 10;
    if (temp > 0) {
        if (temp === 4) {
            result += 'XL';
        } else if (temp === 9) {
            result += 'XC';
        } else {
            if ((temp - 5) >= 0) {
                result += 'L';
                temp -= 5;
            }

            for (i = 0; i < temp; ++i) {
                result += 'X'
            }
        }
    }

    if (num > 0) {
        if (num === 4) {
            result += 'IV';
        } else if (num === 9) {
            result += 'IX';
        } else {
            if ((num - 5) >= 0) {
                result += 'V';
                num -= 5;
            }

            for (i = 0; i < num; ++i) {
                result += 'I'
            }
        }
    }

    return result;
};
*/

/* ROMAN TO INTEGER
var romanToInt = function(s) {
    var table = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }, 
    len = s.length, 
    sum = table[s[0]], i;
    for (i = 1; i < len; ++i) {
        if (table[s[i]] > table[s[i - 1]]) {
            sum -= table[s[i - 1]];
            sum += table[s[i]] - table[s[i - 1]];
        } else {
            sum += table[s[i]];
        }
    }

    return sum;
};
*/

/* COUNT AND SAY
var countAndSay = function(n) {
    if (n === 0) {
        return ''
    }

    var sequence = '1', i;

    for (i = 0; i < n - 1; ++i) {
        var len = sequence.length,
            start = 0,
            temp = '';

        while (start < len) {
            count = 1;
            lead = start + 1;
            current = sequence[start];

            while (lead < len && (sequence[lead] === current)) {
                count += 1;
                lead += 1;
            }
            temp = temp + '' + count + '' + current;
            start = lead;
            lead += 1;
        }
        sequence = temp;
    }

    return sequence;
};
console.log(countAndSay(2));
console.log(countAndSay(3));
console.log(countAndSay(4));
*/

/* REMOVE DUPLICATES IN SORTED ARRAY 
var removeDuplicates = function(nums) {
    var count = 0,
        len = nums.length;
    for(var i = 1; i < len; i++){
        if (nums[i] === nums[i - 1]) {
            count += 1;
        } else {
            nums[i - count] = nums[i];
        }
    }
    return len - count;
};
removeDuplicates([1,1,2,3,3])
removeDuplicates([1,1,2,4,4,4,5,5,5,6,7,8,8,8,8])
*/

/* MIN DEPTH
var minDepth = function(root) {
    if (root === null) {
        return 0;
    }
    
    if (root.left === null || root.right === null) {
        return 1 + (root.left === null ? minDepth(root.right) : minDepth(root.left));
    }
    
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
};
*/

/* IS VALID PALINDROME
var isPalindrome = function(s) {
    if (s === '') {
        return true;
    }

    // remove nonalphanumeric characters
    s = s.replace(/\W/g, '').toLowerCase();

    var len = s.length, 
        halfLen = Math.floor(len / 2), i;
    for (i = 0; i < halfLen; ++i) {
        if (s[i] !== s[len - 1 - i]) {
            return false;
        }
    }

    return true;
};
*/

/* IS # PALINDROME W/O EXTRA SPACE
var isPalindrome = function(x) {
    if (x < 0) {
        return false;
    }

    var first, last, 
        length = getLength(x) - 1,
        index = 0;

    while (true) {
        first = getDigitAt(x, index);
        last = getDigitAt(x, length - index);
        if (first !== last) {
            return false;
        }

        x = x % Math.pow(10, length - index);   // truncate first digit
        x = Math.floor(x / 10);                 // truncate last digit
        length -= 2;

        if (x === 0 || length ===1) {
            break;
        }
    }

    return true;
};

function getLength(num) {
    var count = 0;
    while (num) {
        num = Math.floor(num / 10);
        count += 1;
    }
    return count;
}

function getDigitAt(num, index) {
    while (index > 0) {
        num = Math.floor(num / 10);
        index -= 1;
    }

    return num % 10;
}
*/

/* COMPARE VERSIONS
var compareVersion = function(version1, version2) {
    var split1 = version1.split('.').map(function(x) { return parseInt(x); }),
        split2 = version2.split('.').map(function(x) { return parseInt(x); });
        
    // remove trailing zeros
    while (split1[split1.length - 1] === 0) {
        split1.pop();
    }
    while (split2[split2.length - 1] === 0) {
        split2.pop();
    }
    
    var len1 = split1.length,
        len2 = split2.length,
        i;

    for (i = 0; i < len1 && i < len2; ++i) {
        if (split1[i] > split2[i]) {
            return 1;
        } else if (split1[i] < split2[i]) {
            return -1;
        }
    }    
    
    if (len1 !== len2) {
        return len1 < len2 ? -1 : 1;
    }
    return 0;
};

console.log(compareVersion('1', '1.1'))
*/

/* HOUSE ROBBER
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

var rob = function(nums) {
    var len = nums.length; 

    if (len === 0) {
        return 0;
    } 
    
    var i, table = [];
    table[0] = nums[0];
    table[1] = Math.max(nums[0], nums[1]);

    for (i = 2; i < len; ++i) {
        table[i] = Math.max(table[i - 2] + nums[i], table[i - 1]);
    }

    return table[len - 1];
};
*/

/* ISOMORPHIC STRINGS 
Given two strings s and t, determine if they are isomorphic.

Two strings are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while 
preserving the order of characters. No two characters may map to the same character (this clause makes the algo tricky)
but a character may map to itself.

console.log(isIsomorphic('egg','add')) // true
console.log(isIsomorphic('foo','bar')) // false
console.log(isIsomorphic('paper','title')) // true
console.log(isIsomorphic('ab','aa')) // false
console.log(isIsomorphic('aa','bb')) // true

var isIsomorphic = function(s, t) {
    var i = 0,
        len1 = s.length,
        len2 = t.length,
        map = {}
        mapped = [];

    if (len1 !== len2) {
        return false;
    }

    for (i = 0; i < len1; ++i) {
        if (!map[s[i]]) {
            if (mapped.indexOf(t[i]) === -1) {
                map[s[i]] = t[i];
                mapped.push(t[i]);
            } else {
                return false;
            }

        } else if (map[s[i]] !== t[i]) {
            return false;
        }
    }

    return true;
};
*/

/* Sieve of Eratosthenes - ugly
var countPrimes = function(n) {
    var count = 0,
        sieve = [];
    sieve.length = n;
    var len = sieve.length;
    sieve[0] = false;
    sieve[1] = false;

    for (var i = 2; i < len; i++) {
        sieve[i] = true;
    }

    var limit = Math.ceil(Math.sqrt(n));
    for (i = 2; i < limit; ++i) {
        if (sieve[i] === true) {
            for (var j = 2; j * i < len; ++j) {
                sieve[i * j] = false;
            }
        }
    }

    for (i = 2; i < len; ++i) {
        if (sieve[i] === true) {
            count += 1;
        }
    }

    return count;
};
*/

/* Majority element
var majorityElement = function(nums) {
    var half = Math.ceil(nums.length / 2),
        hash = {};
        
    for (var i = 0; i < nums.length; ++i) {
        if (hash[nums[i]]) {
            hash[nums[i]] += 1;
        } else {
            hash[nums[i]] = 1;
        }
        
        if (hash[nums[i]] === half) {
            return nums[i];
        }
    }    
};
*/

/* Excel Sheet Column Number 
var titleToNumber = function(s) {
    var arr = s.split(''),
        colNum = 0,
        exponent = 0;
 
    while (arr.length > 0) {
        var lastIndex = arr.length - 1;
        var temp = arr.pop();
        colNum += Math.pow(26, exponent) * (temp.charCodeAt() - 64);
        exponent += 1;
    }

    return colNum;
};
*/

/* Excel Sheet Column Title 
var convertToTitle = function(n) {
    var title = '';
    while (n > 0) {
        if (n % 26 === 0) {
            title = 'Z' + title;
            n = Math.floor(n / 26) - 1;
        } else {
            title = String.fromCharCode(n % 26 + 64) + title;
            n = Math.floor(n / 26);
        }
    }
    
    return title;
};

console.log(convertToTitle(703)) // AAA
console.log(convertToTitle(26))  // Z
console.log(convertToTitle(52))  // AZ
    // nifty C++ version
    // while (n) {
    //     n -= 1;
    //     var tmp = 'A' + n % 26;
    //     title = tmp + title;
    //     n = Math.floor(n / 26);
    // }
*/

/* FACTORIAL TRAILING ZEROES 
var trailingZeroes = function(n) {
    var zeroes = 0;
    while (n > 1) {
        n = Math.floor(n / 5);
        zeroes += n;
    }
    return zeroes;
};
*/

/* REMOVE LINKED LIST ELEMENTS
  var removeElements = function(head, val) {
    // case when we have to remove head
    while (head !== null && head.val === val) {
        head = head.next;
    }
    
    var current = head;
    while (current !== null) {
        var temp = current.next;
        while (temp !== null && temp.val === val) {
            temp = temp.next;
        }
        current.next = temp;
        current = current.next;
    }
    
    return head;
};
*/

/* PASCAL'S TRIANGLE I
var generate = function(numRows) {
  var rows = [];

  for (var i = 0; i < numRows; ++i) {
    if (i === 0) {
        rows.push([1]);
    } else if (i === 1) {
        rows.push([1,1]);
    } else {
        var temp = [1];
        for (var j = 0; j < rows[i - 1].length - 1; ++j) {
            temp.push(rows[i - 1][j] + rows[i - 1][j + 1]);
        }
        temp.push(1);
        rows.push(temp);
    }
  }

  return rows;
};
*/

/*
// Valid Parentheses
var isValid = function(s) {
    var stack = [],
        map = {
            ')': '(',
            ']': '[',
            '}': '{'
        };

    for (var i = 0; i < s.length; i++) {
        if (map[s[i]] === undefined) {
            stack.unshift(s[i])
        } else {
            if (stack[0] !== map[s[i]]) {
                return false;
            } else {
                stack.shift();
            }
        }
    }

    return stack.length === 0 ? true : false;
};
*/

/*
// IsHappy
var isHappy = function(n) {
    var sums = [];
    while (true) {
        n = sumSquaresOfDigits(n);

        if (n === 1) {
            return true;
        }

        if (sums.indexOf(n) !== -1) {
            return false;
        } else {
            sums.push(n);
        }
    }
}

function sumSquaresOfDigits(n) {
    var str = n.toString(),
        sum = 0;
    for (var i = 0; i < str.length; i++) {
        sum += Math.pow(parseInt(str[i]), 2);
    }

    return sum;
}
*/

/*
var hammingWeight = function(n) {
    var weight = 0;

    while (n !== 0) {
        weight += n & 1;
        n = n >>> 1;
    }
    
    return weight;
};
*/

/*
var reverseBits = function(n) {
    var tmp = [];
    for (var i = 0; i < 32; i++) {
        tmp.push(n & 1);
        n = n >>> 1;
    }
    
    return parseInt(tmp.join(''), 2);
};

public int reverseBits(int n) {
  int result = 0;
  for (int i = 0; i < 32; ++i) {
    result = result<<1  | (n & 1);
    n >>>= 1;
  }
return result;  }
*/

/*
var rotate = function(nums, k) {
    if (nums.length < k) {   // [1,2,3], 4   should return [3,1,2]
        k = k % nums.length;
    }
    
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
    console.log(nums)
};

function reverse(nums, start, end) {
    while (start < end) {
        var temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start += 1;
        end -= 1;
    }
}*/

/* EPICCODE
You are given a function f(x), where f(x) is 1 if the first and last characters of string x are equal; else it is 0. 
You are given a string S and you have to find the sum of f(x) for all substrings x of given string S.

Note: A substring is a contiguous slice of string S[i:j] such that i≤j. It is a contiguous slice of the original string.

Input Format 
The first line contains an integer N, length of S. 
The second line contains a string S. S will contain only lower case characters (a−z).

Sample input:
7
ababaca

Output:
14

Explanation 
f("a")=1 , f("aba")=1 , f(“abaca”)=1 but f(“ab”)=0 , (“bac”)=0. Hence counting all substrings we get 14 
The 14 substring are 
a - 4(times) 
b - 2 
c - 1 
aba - 2 
bab - 1 
aca - 1 
ababa - 1 
abaca - 1 
ababaca - 1


function processData(input) {
    input = input.split('\n');
    var len = parseInt(input[0]),
        str = input[1],
        score = 0;

    for (var i = 0; i < len; ++i) {
        for (var j = i + 1; j < len + 1; ++j) {
            var sub = str.substring(i, j);

            if (sub[0] === sub[sub.length - 1]) {

                score += 1;
            }
        }
    }
    
    console.log(score);
} 

N boys and N girls
2nd line = height of boys
3rd lien = height of girls


*/
