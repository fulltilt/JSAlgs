 /*
  * Write an efficient function to find the first non-repeated character
  * in a String.
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
 * Design an algorithm to remove duplicate characters in an Array of characters
 * without using any additional buffer.
 */
var removeDuplicatesWithoutBuffer = function(str) {
	if (str === null || str.length === 0)
		return undefined;

	str = str.split('');
	for (var i = 0; i < str.length; i++) {
		for (var j = i + 1; j < str.length; j++) {
			if (str[i] === str[j]) {
				str[i++] = str[j];
				/*console.log(str.slice(0, j));
 				console.log(str.slice(j + 1));
				str = str.slice(0, j).concat(str.slice(j + 1));
				console.log(str);
				console.log();
				*/
			}
		}
	}
/*
	var slow = 0;
	var fast = 1;
	while (fast < str.length) {
		while (str[slow] === str[fast]) {
			++fast;
		}
		str[slow++] = str[fast++];
	}
*/
	str = str.join('');
	return str.substring(0, i);
}

console.log('\nTesting removeDuplicatesWithoutBuffer()...');
console.log( removeDuplicatesWithoutBuffer( 'abcdefghij'          ) );
console.log( removeDuplicatesWithoutBuffer( 'aaaaaaaaaaaaaa'      ) );
//console.log( removeDuplicatesWithoutBuffer( ''                    ) );
//console.log( removeDuplicatesWithoutBuffer( null                            ) );
//console.log( removeDuplicatesWithoutBuffer( 'aaabbbcccddeeffgg'   ) );
//console.log( removeDuplicatesWithoutBuffer( 'ababcdefdecdefababac') ); 

/*
 * RRemoves duplicate characters in an Array of characters.
 * You can use an additional buffer to obtain algorithmic efficiency.
 * Assume you are dealing with ASCII characters only.
 */
var removeDuplicates = function(str) {
	var hashTable = {};
	for (var i = 0; i < str.length; i++) {
		if (!hashTable[str[i]]) {
			hashTable[str[i]] = 1;
		} else {
			++hashTable[str[i]];
		}
	}

	var trailingIndex = 0;
	for (var i = 0; i < str.length; i++) {
		if (hashTable[str[i]] > 1) {
			str[trailingIndex++] = str[i];
		}
	}

	//str = str.join("");
	//console.log(trailingIndex);
	//return str.substring(0, trailingIndex);
	return str.slice(0, trailingIndex + 1);
}

console.log('\nTesting removeDuplicates()...');
console.log( removeDuplicates( 'abcdefghij'          ) );
console.log( removeDuplicates( 'aaaaaaaaaaaaaa'      ) );
//console.log( removeDuplicates( ''                    ) );
//console.log( removeDuplicates( null                            ) );
//console.log( removeDuplicates( 'aaabbbcccddeeffgg'   ) );
//console.log( removeDuplicates( 'ababcdefdecdefababac') ); 

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