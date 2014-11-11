function PatternSearch() {
  
}

PatternSearch.prototype = {
  // http://www.geeksforgeeks.org/searching-for-patterns-set-1-naive-pattern-searching/
  naivePatternSearch: function(pattern, source) {
    var patternLength = pattern.length,
        sourceLength = source.length,
        result = [];

    for (var i = 0; i <= (sourceLength - patternLength); i++) { // tricky: i must be <=
      for (var j = 0; j < patternLength; j++) {
        if (source[i + j] !== pattern[j]) {
          break;
        }
      }
      if (j === patternLength) {
        result.push(i);
      }
    }

    return result;
  },

  // http://www.geeksforgeeks.org/searching-for-patterns-set-2-kmp-algorithm/
  // http://jakeboxer.com/blog/2009/12/13/the-knuth-morris-pratt-algorithm-in-my-own-words/
  KMP: function(pattern, source) {
    var patternLength = pattern.length,
        sourceLength = source.length,
        lps = [],
        i = 0,    // index for source
        j = 0,    // index for pattern
        result = [];

    // preprocess pattern
    this.computeLPSArray(pattern, lps);

    while (i < sourceLength) {
      if (pattern[j] === source[i]) {
        j += 1;
        i += 1;
      }

      if (j === patternLength) {
        result.push(i - j);
        j = lps[j - 1];
      } else if (i < sourceLength && pattern[j] !== source[i]) {  // mismatch after j matches
        // do not match lps[0...lps[j - 1]] characters
        if (j !== 0) {
          j = lps[j - 1];
        } else {
          i += 1;
        }
      }
    }

    return result;
  },

  // helper fxn for KMP algorithm. lps stands for Longest Proper Prefix (which is also a suffix)
  computeLPSArray: function(pattern, lps) {
    var len = 0,  // length of the previous longest prefix/suffix
        i = 1,
        patternLength = pattern.length;
    lps[0] = 0;   // lps[0] is always 0

    while (i < patternLength) {
      if (pattern[i] === pattern[len]) {
        len += 1;
        lps[i] = len;
        i += 1;
      } else {
        if (len !== 0) {
          len = lps[len - 1]; // tricky. Consider example AAACAAAA and i = 7
          // also note that we do not increment i here
        } else {
          lps[i] = 0;
          i += 1;
        }
      }
    }
  },

  // http://www.geeksforgeeks.org/searching-for-patterns-set-3-rabin-karp-algorithm/
  RabinKarp: function(pattern, source) {
    var patternLength = pattern.length,
        sourceLength = source.length,
        lps = [],
        p = 0,        // hash value for pattern
        s = 0,        // hash value for source
        radix = 256,  // # of characters in alphabet
        h = 1,        // ????
        prime = 101,
        result = [];

    // the value of h would be 'pow(d, patternLength - 1) % q' where q is a prime number
    for (var i = 0; i < patternLength - 1; i++) {
      h = (h * radix) % prime;
    }

    // calculate the hash value of pattern and first window of text
    for (i = 0; i < patternLength; i++) {
      p = (radix * p + pattern.charCodeAt(i)) % prime;
      s = (radix * s + source.charCodeAt(i)) % prime;
    }

    // slide the pattern over text one by one
    for (i = 0; i <= (sourceLength - patternLength); i++) {
      // check the hash values of current window of text and pattern. If hash values match, then only check for characters one by one
      if (p === s) {
        // check characters one by one (must do this check as it's possible for two different strings to hash to the same value)
        for (var j = 0; j < patternLength; j++) {
          if (source[i + j] !== pattern[j]) {
            break;
          }
        }

        if (j === patternLength) {
          result.push(i);
        }
      }

      // calculate high value for next window of text: remove leading digit and add trailing digit
      if (i < (sourceLength - patternLength)) {
        s = (radix * (s - source.charCodeAt(i) * h) + source.charCodeAt(i + patternLength)) % prime;

        // we might get a negative value of t, convert it to positive
        if (s < 0) {
          s = s + prime;
        }
      }
    }

    return result;
  },

  // http://www.gzeeksforgeeks.org/searching-for-patterns-set-5-finite-automata/
  // not finished. Having issues with the compute TF fxn
  finiteAutomata: function (pattern, source) {
    var patternLength = pattern.length,
        sourceLength = source.length,
        radix = 256;
        TF = [],
        j = 0,
        result = [];

    // initialize 2-D array
    for (var i = 0; i < sourceLength; i++) {
      TF[i] = [];
    }

    computeTrans(pattern, TF);

    // process text over finite automata
    for (var i = 0; i < sourceLength; i++) {
      j = TF[j][source[i]];
      if (j === sourceLength) {
        result.push(i - sourceLength + 1);
      }
    }

    return result;
  },

  // http://www.geeksforgeeks.org/pattern-searching-set-5-efficient-constructtion-of-finite-automata/
  // this function builds the TF table which represents finite automata for a given pattern
  computeTrans: function(pattern, TF) {
    var patternLength = pattern.length,
        lps = 0,
        radix = 256;

    // fill entries in the first row
    for (var i = 0; i < radix; i++) {
      TF[0][i] = 0;
    }
    TF[0][pattern[0]] = 1;

    // fill entries in other rows
    for (i = 1; i <= patternLength; i++) {
      // copy values from row at index lps
      for (var j = 0; j < radix; j++) {
        TF[i][j] = TF[lps][j];
      }

      // update the entry corresponding to this character
      TF[i][pattern[i]] = i + 1;

      // update lps for next row to be filled
      if (i < patternLength) {
        lps = TF[lps][pattern[i]];
      }
    }
  },

  // http://www.geeksforgeeks.org/pattern-searching-set-7-boyer-moore-algorithm-bad-character-heuristic/
  BoyerMoore: function(pattern, source) {

  }
}

module.exports = PatternSearch;