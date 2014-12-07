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

  it('tests printAllPermutationsWithRepetitions', function() {
    bt.printAllPermutationsWithRepetitions('ABC');
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

  it('tests doesPathExist', function() {
    var matrix = [['a','b','c','e'],
                  ['s','f','c','s'],
                  ['a','d','e','e']];

    expect(bt.doesPathExist(matrix, 'abcb')).toEqual(false);
    expect(bt.doesPathExist(matrix, 'bcced')).toEqual(true);
  });

  it('tests robotMove', function() {
    expect(bt.robotMove(40, 40, 18)).toEqual(1484); // don't know if this is correct
    expect(bt.robotMove(10, 10, 5)).toEqual(21);
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

  it('tests stairs', function() {
    var count = { count: 0 };
    bt.stairs(1, count);
    expect(count.count).toEqual(1);
    count.count = 0;
    bt.stairs(2, count);
    expect(count.count).toEqual(2);
    count.count = 0;
    bt.stairs(3, count);
    expect(count.count).toEqual(3);
    count.count = 0;
    bt.stairs(4, count);
    expect(count.count).toEqual(5);
  });

  it('tests subsetSum', function() {
    var weights = [10,7,5,18,12,20,15];
    //bt.subsetSum(weights, 35);
  });

  it('tests tugOfWar', function() {

  });

  it('tests sudoku', function() {

  });
});