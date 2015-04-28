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
}
*/