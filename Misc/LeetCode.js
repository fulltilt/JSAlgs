/* REMOVE DUPLICATES */
var removeDuplicates = function(nums) {
    var len = nums.length,
        lo = 0,
        hi = len - 1;
        
    while (lo < hi) {
        var temp = nums.slice(lo + 1).indexOf(nums[lo]);
        if (temp !== -1) {
            var t = nums[hi];
            nums[hi] = nums[temp];
            nums[temp] = t;
            hi -= 1;
        }
        lo += 1;
    }
    nums.length = hi;
    console.log(nums, nums.length)
};
removeDuplicates([1,1,2])
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
