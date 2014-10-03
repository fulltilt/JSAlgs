 /*
  * Write an efficient function to find the first non-repeated character in a String.
  */
var findFirstNonRepeatedChar = function(str) {
  	var hashTable = {};
  	for (var i = 0; i < str.length; i++) {
  	    if (!hashTable[str[i]]) {
  	  	    hashTable[str[i]] = 1;
  	  	} else {
  	  		++hashTable[str[i]];
  	  	}
  	}

  	for (var i = 0; i < str.length; i++) {
  	    if (hashTable[str[i]] === 1)
  	    	return str[i];
  	}
}

console.log('Testing findFirstNonRepeatedChar()...');
console.log( findFirstNonRepeatedChar('lorem ipsum dolar pit ahmets') ); // expected: u

/* 
 * Find duplicate number in an array. No extra buffer allowed.
 * Assumes the array is of size n and the range of values are from 0 through n-1
 * Tricky part: use a for loop and have inner while loop that stays at a particular index until the correct value is in that index 
 */
var getDuplicateWithoutBuffer = function(arr) {
  var length = arr.length;
  for (var i = 0; i < length; i++) {
    if (arr[i] < 0 || arr[i] >= arr.length ) {
      throw 'Invalid Argument Exception';
    }
  }

  var currentIndex = 0;
  for (i = 0; i < length; i++) {
    while (arr[i] !== i) {
      if (arr[i] === arr[arr[i]]) {
        return arr[i];
      } else {
        var temp = arr[i];
        arr[i] = arr[temp];
        arr[temp] = temp;
      }
    }
  }

  return -1;
}

console.log('Testing getDuplicateWithoutBuffer()...');
console.log(getDuplicateWithoutBuffer([2, 3, 1, 0, 2, 5, 3])); // expects: 2
console.log(getDuplicateWithoutBuffer([2, 3, 1, 0, 6, 5, 4])); // expects: -1

/*
 * Design an algorithm to remove duplicate characters in an Array of characters
 * without using any additional buffer.
 NOTE: NOT FINISHED
 */
var removeDuplicatesWithoutBuffer = function(str) {
	if (str === null || str.length === 0)
		return undefined;

	//str = str.split('');
	
/*	for (var trailing = 0; trailing < str.length; trailing++) {
		for (var leading = trailing + 1; leading < str.length; leading++) {
			//if (str[trailing] === str[leading])
			while (str[trailing] === str[leading]) {
				++leading;
				/*console.log(str.slice(0, j));
 				console.log(str.slice(j + 1));
				str = str.slice(0, j).concat(str.slice(j + 1));
				console.log(str);
				console.log();
				
			}
		}
	}
*/
/*
	var slow = 0;
	var fast = 1;
	while (fast < str.length) {
		if (str[slow] === str[fast] || str[fast] === ' ') {
			while (str[fast] === str[slow] || str[fast] === ' ') {
				str[fast] = ' ';
				++fast;
			}
			str[slow++] = str[fast++];
		}
		++slow;
		fast = slow + 1;
	}

	str = str.join('');
	return str.slice(0, slow);
*/
}

console.log('\nTesting removeDuplicatesWithoutBuffer()...');
console.log( removeDuplicatesWithoutBuffer( 'abcdefghij'          ) );
console.log( removeDuplicatesWithoutBuffer( 'aaaaaaaaaaaaaa'      ) );
console.log( removeDuplicatesWithoutBuffer( ''                    ) );
console.log( removeDuplicatesWithoutBuffer( null                            ) );
console.log( removeDuplicatesWithoutBuffer( 'aaabbbcccddeeffgg'   ) );
console.log( removeDuplicatesWithoutBuffer( 'ababcdefdecdefababac') ); 

/*
 * Removes duplicate characters in an Array of characters.
 * You can use an additional buffer to obtain algorithmic efficiency.
    -algorithm: put values in a hash table that increments by one for each letter. Use two pointers: trailing and leading. The trick
                to this is to mix the the trailing and leading operations with the hash table operations so it would be O(n) instead
                of O(n + m)
 */
var removeDuplicates = function(str) {
	if (str === null || str.length < 2)
		return undefined;

	str = str.split('');

	var hashTable = {};
	var trailingIndex = 0;
	for (var i = 0; i < str.length; i++) {
		if (!hashTable[str[i]]) {
			hashTable[str[i]] = true;
			str[trailingIndex++] = str[i];
		} else {
			++i;
		}
	}

	str = str.join('');
	return str.slice(0, trailingIndex);
}

console.log('\nTesting removeDuplicates()...');
console.log( removeDuplicates( 'abcdefghij'          ) );
console.log( removeDuplicates( 'aaaaaaaaaaaaaa'      ) );
console.log( removeDuplicates( ''                    ) );
console.log( removeDuplicates( null                            ) );
console.log( removeDuplicates( 'aaabbbcccddeeffgg'   ) );
console.log( removeDuplicates( 'ababcdefdecdefababac') ); 

/*
 * Write a JavaScript function that deletes characters from a string.
 * Do not use Regular Expressions.
 * Use this prototype:
 *
 * funtion removeChars(str, remove);
 *
 * For instance
 *
 *      removeChars('The Elder Scrolls of Morrowind', 'eEoi');
 *
 * should give:
 *
 *      'Th ldr Scrlls f Mrrwnd'
 */
var removeChars = function(str, remove) {
	var hashTable = {};
    for (var i = 0; i < remove.length; i++) {
    	hashTable[remove[i]] = true;
    }

    var slow = 0;
    var fast = 0;
    while (fast < str.length) {
    	while (hashTable[str[fast]]) {
    		++fast;
    	}
    	//str[slow++] = str[fast++]; // this doesn't work because strings are read only and cannot be modified at all. Only replaced with new strings.
    	str = str.split("");
    	str[slow++] = str[fast++];
    	str = str.join("");
    }

    return str.substring(0, slow);
}

console.log('\nTesting removeChars()...');
console.log(removeChars('The Elder Scrolls of Morrowind', 'eEoi'));

    /* Write a method that when given a list, ensures that all consecutive repeated elements of the list are removed. The order of the elements should remain the same.

       simplify(['a','a','a','a','b','c','c','a','a','d','e','e','e','e'])
       returns ['a','b','c','a','d','e']
       The tricky part is if you look at the 2 sets of a's 
       Note: with JavaScripts splice() fxns, this fxn would probably be easier to write 
       -algorithm: have 2 pointers. One that is ahead by the other by at least 1. Have a loop that runs as long as fast is less
                   than the length of the array. If slow and fast are equal or fast == ' ', set fast to ' ' and advance fast. Else
                   advance slow and set slow to fast and set fast to be one greater than slow. By default, this will blank out the
                   array all the way to the end if need be 
    */
    function simplify(array) {
        var slow = 0;
        var fast = 1;
        while (fast < array.length) {
            if (array[slow] === array[fast]) {
                var temparr1 = array.slice(0, fast);
                var temparr2 = array.slice(fast + 1);
                array = temparr1.concat(temparr2); // when I used '+', I got weird results
            } else {
                ++slow;
                fast = slow + 1;
            }
        }

        return array;
    } 

console.log('\nTesting simplify()...');
console.log(simplify(['a','a','a','a','b','c','c','a','a','d','e','e','e','e']));
 /*
  * Write a function to reverse words of a String.
  * Assume that words are delimeted by a space.
  * Assume punctuations are also parts of a word.
  *
  * Example:
  *
  * Reversing
  *
  *     'Powerful you have become, Dooku. The dark side I sense in you.'
  *
  * should give:
  *
  *     'you. in sense I side dark The Dooku. become, have you Powerful'
  */
/* Easy Way
var reverseWords = function(str) {
	return str.split(" ").reverse().join(" ");
}
*/

var reverseWords = function(str) {
	if (!str) {
		return;
	}

	var start = 0;
	var end = 0;
	var stack = [];

	// split the String
	while (end < str.length) {
		while (str[end] !== ' ' && end < str.length) {
			++end;
		}
		stack.push(str.substring(start, end));
		start = end + 1;
		end = start + 1;
	}

	// reverse the String
	var reverseStack = [];
	while (stack.length > 0) {
		reverseStack.push(stack.pop());
	}

	// recreate the String with spaces
	var reversedString = new String();
	for (var i = 0; i < reverseStack.length; i++) {
		reversedString += reverseStack[i] + ' ';
	}

	return reversedString;
}

console.log('\nTesting reverseWords()...');
console.log(reverseWords('Powerful you have become, Dooku. The dark side I sense in you.'));
console.log(reverseWords(''));

/*
 * Write a code to reverse a String.
 */
var reverseString = function(str) {
	str = str.split("");
	for (var i = 0; i < str.length / 2; i++) {
		var temp = str[i];
		str[i] = str[str.length - 1 - i];
		str[str.length - 1 - i] = temp;
	}
	return str.join("");
}

console.log('\nTesting reverseString()...');
console.log(reverseString('abcde'));
console.log(reverseString('abcdef'));

/*
 * Write a method to detect whether two Strings are anagrams or not.
 */
var isAnagram = function(str1, str2) {
	if (str1 === null || str2 === null) {
		return false;
	}

	str1 = str1.toLowerCase().replace(/\s+/g, '');
	str2 = str2.toLowerCase().replace(/\s+/g, '');
	if (str1.length !== str2.length) {
		return false;
	}

	var hashTable = {};
	for (var i = 0; i < str1.length; i++) {
		if (!hashTable[str1[i]]) {
			hashTable[str1[i]] = 1;
		} else {
			++hashTable[str1[i]];
		}
	}

	for (var i = 0; i < str2.length; i++) {
		if (!hashTable[str2[i]] || hashTable[str2[i]] == 0) {
			return false;
		} else {
			--hashTable[str2[i]];
		}
	}

	return true;
} 

console.log('\nTesting isAnagram()...');
console.log( isAnagram('Tom Marvolo Riddle', 'I am Lord Voldemort') );
console.log( isAnagram('Tom Marvolo Riddle', 'I sdf') );

/*
 * Write a method to replace all spaces in a String with %20.
 */
/* using substring and concat 
var replaceSpaces = function(str) {
	for (var i = 0; i < str.length; i++) {
		if (str[i] === ' ') {
			str = str.substring(0, i).concat('%20').concat(str.substring(i + 1));
		}
	}
	return str;
}
*/

/* Using splice 
var replaceSpaces = function(str) {
	var strArray = str.split('');
	for (var i = 0; i < strArray.length; i++) {
		if (strArray[i] === ' ') {
			strArray.splice(i, 1, '%20');
		}
	}

	return strArray.join('');
}
*/

var replaceSpaces = function(str) {
	var newArray = [];	
	var newArrayIndex = 0;
	for (var i = 0; i < str.length; i++) {
		if (str[i] === ' ') {
			newArray[newArrayIndex++] = '%';
			newArray[newArrayIndex++] = '2';
			newArray[newArrayIndex++] = '0';
		} else {
			newArray[newArrayIndex++] = str[i];
		}
	}

	return newArray.join('');
}


console.log('\nTesting replaceSpaces()...');
console.log( replaceSpaces('recursion is to know what recursion is.'));