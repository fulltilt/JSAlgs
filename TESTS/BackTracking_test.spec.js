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
    //bt.knightsTour();
  });

  it('tests mazePuzzle', function() {
    var maze = [[1, 0, 0, 0],
                [1, 1, 0, 1],
                [0, 1, 0, 0],
                [1, 1, 1, 1]];
    //bt.mazePuzzle(maze);
  });

  it('tests nQueen', function() {
    var board = [[0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0]];
    bt.nQueen(board, 0);
    //console.log(board);
  });

  it('tests subsetSum', function() {
    var weights = [10,7,5,18,12,20,15];
    bt.subsetSum(weights, 35);
  });

  it('tests tugOfWar', function() {

  });

  it('tests sudoku', function() {

  });
});