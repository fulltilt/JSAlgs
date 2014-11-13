var BackTracking = require('../BackTracking.js');

describe("BackTracking", function() {
  var bt = new BackTracking(); 

  it('tests printAllPermutations', function() {
    var permArr = [],   // used only to hold the results
        usedChars = []; // used to hold the temporary permutations
    bt.printAllPermutations('ABC'.split(''), permArr, usedChars);  // have to convert string to array for algorithm to work

    // join the results back into a string
    for (var i = 0; i < permArr.length; i++) {
      permArr[i] = permArr[i].join('');
    }

    expect(permArr).toEqual([ 'ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA' ]);
  });

  it('tests knightsTour', function() {
    bt.knightsTour();
  });

  it('tests mazePuzzle', function() {

  });

  it('tests nQueenProblem', function() {

  });

  it('tests subsetSum', function() {

  });

  it('tests tugOfWar', function() {

  });

  it('tests sudoku', function() {

  });
});