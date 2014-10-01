function Dynamic() {
  this.lcs = lcs;

  this.max = max;
  this.recursiveKnapsack = recursiveKnapsack;
  this.dynamicKnapsack = dynamicKnapsack;
}

function lcs(word1, word2) {
  var max = 0;
  var index = 0;
  var lcsarr = new Array(word1.length+1); 
  
  for (var i = 0; i <= word1.length+1; ++i) {
    lcsarr[i] = new Array(word2.length+1);
    for (var j = 0; j <= word2.length+1; ++j) {
      lcsarr[i][j] = 0;
    }
  }

  for (var i = 0; i <= word1.length; ++i) {
    for (var j = 0; j <= word2.length; ++j) { 
      if (i == 0 || j == 0) {
        lcsarr[i][j] = 0;
      } else {
        if (word1[i - 1] == word2[j - 1]) {
          lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
        } else {
          lcsarr[i][j] = 0;
        } 
      }
    
      if (max < lcsarr[i][j]) { 
        max = lcsarr[i][j]; 
        index = i;
      } 
    }
  }
  
  var str = ''; 
  if (max == 0) {
    return ''; 
  } else {
    for (var i = index - max; i <= max; ++i) {
      str += word2[i];
    }

    return str;
  }
}

function max(a, b) {
  return (a > b) ? a : b;
}

// inefficient as many subproblems are revisited
function recursiveKnapsack(capacity, size, value, n) {
  if (n == 0 || capacity == 0) {
    return 0; 
  }
  
  if (size[n-1] > capacity) {
    return this.recursiveKnapsack(capacity, size, value, n - 1);
  } else {
    return max(value[n - 1] + this.recursiveKnapsack(capacity - size[n - 1], size, value, n - 1), 
               this.recursiveKnapsack(capacity, size, value, n - 1));
  }
}


function dynamicKnapsack(capacity, size, value, n) {
  var K=[];
  for (var i = 0; i <= capacity + 1; i++) { 
    K[i] = [];
  } 

  for (var i = 0; i <= n; i++) {
var output = '';    
    for (var w = 0; w <= capacity; w++) { 
      if (i == 0 || w == 0) {
        K[i][w] = 0; 
      } else if (size[i - 1] <= w) {
        K[i][w] = max(value[i - 1] + K[i - 1][w - size[i - 1]], K[i - 1][w]);
      } else {
        K[i][w] = K[i - 1][w];
      }
           
output += K[i][w] + ' ';
    }
console.log(output);
  }
console.log(K[n][capacity]);
  return K[n][capacity];
}

module.exports = Dynamic;