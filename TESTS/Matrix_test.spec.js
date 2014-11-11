var Matrix = require('../Matrix.js');

describe('Matrix', function() {
  var m = new Matrix();

  it('tests maxSquareSubMatrix', function() {
    var matrix = [[0, 1, 1, 0, 1], 
                  [1, 1, 0, 1, 0], 
                  [0, 1, 1, 1, 0],
                  [1, 1, 1, 1, 0],
                  [1, 1, 1, 1, 1],
                  [0, 0, 0, 0, 0]];
                
    expect(m.maxSquareSubMatrix(matrix)).toEqual(3);
  });

  it('tests rotateImage', function() {
    var image = [[1,2,3,4],
                 [5,6,7,8],
                 [9,10,11,12]];

    //console.log(m.rotateImage(image));             
  });

  it('tests booleanMatrix', function() {
    var matrix = [[1, 0, 0, 1],
                  [0, 0, 1, 0],
                  [0, 0, 0, 0],
                 ];
    //m.booleanMatrix(matrix);
  });

  it('tests printSpiral', function() {
    var matrix = [[1,2,3,4,5,6], [7,8,9,10,11,12], [13,14,15,16,17,18]]
    m.printSpiral(matrix);
  });

  it('tests maxNumberOnes', function() {

  });

  it('tests printUniqueRows', function() {

  });

  it('tests inPlaceTranspose', function() {

  });

  it('tests printMatrixDiagonally', function() {

  });

  it('tests strassensMatrixMultiplication', function() {

  });

  it('tests kthSmallestElement', function() {

  });

  it('tests searchSortedMatrix', function() {

  });

  it('tests findSubSquares', function() {

  });

  it('tests findIslands', function() {

  });
});