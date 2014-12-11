var Matrix = require('../Matrix.js');

describe('Matrix', function() {
  var m = new Matrix();

  it("tests search increasingly sorted multidimensional array", function() {
    var arr = [];
    arr[0] = [10,20,30,80,90];
    arr[1] = [20,31,40,70,120];
    arr[2] = [40,60,70,100,130];
    arr[3] = [60,70,80,110,150];
    
    expect(m.searchIncreasinglySorted(arr, 70)).toEqual(true);
    expect(m.searchIncreasinglySorted(arr, 55)).toEqual(false);
    expect(m.searchIncreasinglySorted(arr, 60)).toEqual(true);
    expect(m.searchIncreasinglySorted(arr, 10)).toEqual(true);
    expect(m.searchIncreasinglySorted(arr, 150)).toEqual(true);
    expect(m.searchIncreasinglySorted(arr, -1)).toEqual(false);
    expect(m.searchIncreasinglySorted(arr, 160)).toEqual(false);
    expect(m.searchIncreasinglySorted([[3]], 3)).toEqual(true);
  });

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
    var matrix = [[1,2,3,4,5,6], 
                  [7,8,9,10,11,12], 
                  [13,14,15,16,17,18]]
    //m.printSpiral(matrix);

    matrix = [[1,2,3,4],
              [5,6,7,8],
              [9,10,11,12],
              [13,14,15,16]];
    //m.printSpiral(matrix);
  });

  it('tests maxNumberOnes', function() {
    var matrix = [[0,0,0,1],
                  [0,1,1,1],
                  [1,1,1,1],
                  [0,0,0,0]];
    expect(m.maxNumberOnes(matrix)).toEqual(1);
  });

  it('tests printUniqueRows', function() {
    var matrix = [[0,1,0,0,1],
                  [1,0,1,1,0],
                  [0,1,0,0,1],
                  [1,1,1,0,0]];
    //m.printUniqueRows(matrix);
  });

  it('tests naiveMatrixMultiplication', function() {
    var m1 = [[1,2],
              [3,4]],
        m2 = [[5,6],
              [7,8]];

    console.log(m.naiveMatrixMultiplication(m1, m2));
  });

  it('tests kthSmallestElement', function() {
    var matrix = [[10, 20, 30, 40],
                  [15, 25, 35, 45],
                  [25, 29, 37, 48],
                  [32, 33, 39, 50],
                 ];
    expect(m.kthSmallestElement(matrix, 7)).toEqual(30);
  });

  it('tests searchSortedMatrix1', function() {
    var matrix = [[1,3,5],
                  [7,9,11],
                  [13,15,17]];
    expect(m.searchSortedMatrix1(matrix, 5)).toEqual(true);
    expect(m.searchSortedMatrix1(matrix, 7)).toEqual(true);
    expect(m.searchSortedMatrix1(matrix, 12)).toEqual(false);
  });

  it('tests searchSortedMatrix2', function() {
    var matrix = [[1,2,8,9],
                  [2,4,9,12],
                  [4,7,10,13],
                  [6,8,11,15]];
    expect(m.searchSortedMatrix2(matrix, 7)).toEqual(true);
    expect(m.searchSortedMatrix2(matrix, 5)).toEqual(false);
  });  

  it('tests findSubSquares', function() {
    var matrix = [[1, 1, 1, 1, 1],
                  [2, 2, 2, 2, 2],
                  [3, 3, 3, 3, 3],
                  [4, 4, 4, 4, 4],
                  [5, 5, 5, 5, 5],
                 ];
    m.findSubSquares(matrix, 3);
  });

  it('tests inPlaceTranspose', function() {

  });

  it('tests printMatrixDiagonally', function() {
    var matrix = [[1, 2, 3, 4],
                  [5, 6, 7, 8],
                  [9, 10, 11, 12],
                  [13, 14, 15, 16],
                  [17, 18, 19, 20],
                 ];
    //m.printMatrixDiagonally(matrix);
  });
});