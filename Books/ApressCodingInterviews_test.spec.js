var Apress = require('./ApressCodingInterviews.js');

describe("ApressCodingInterviews", function() {
  var apress = new Apress();

  it("tests search increasingly sorted multidimensional array", function() {
    var arr = [];
    arr[0] = [10,20,30,80,90];
    arr[1] = [20,31,40,70,120];
    arr[2] = [40,60,70,100,130];
    arr[3] = [60,70,80,110,150];
    
    expect(apress.searchIncreasinglySorted(arr, 70)).toEqual(true);
    expect(apress.searchIncreasinglySorted(arr, 55)).toEqual(false);
    expect(apress.searchIncreasinglySorted(arr, 60)).toEqual(true);
    expect(apress.searchIncreasinglySorted(arr, 10)).toEqual(true);
    expect(apress.searchIncreasinglySorted(arr, 150)).toEqual(true);
    expect(apress.searchIncreasinglySorted(arr, -1)).toEqual(false);
    expect(apress.searchIncreasinglySorted(arr, 160)).toEqual(false);
    expect(apress.searchIncreasinglySorted([[3]], 3)).toEqual(true);
  });

  it("tests replacing blanks in a string", function() {
    expect(apress.replaceBlanks('We are happy.')).toEqual('We%20are%20happy.');
    expect(apress.replaceBlanks(' We are  happy.')).toEqual('%20We%20are%20%20happy.');
    expect(apress.replaceBlanks('We are happy. ')).toEqual('We%20are%20happy.%20');
    expect(apress.replaceBlanks(' We are happy.')).toEqual('%20We%20are%20happy.');
  });

  it('merges 2 sorted array', function() {
    expect(apress.mergeSortedArrays([10,20,30,80,90], [22,31,40,70,120])).toEqual([10,20,22,30,31,40,70,80,90,120]);      //arr1 and arr2 are of equal length
    expect(apress.mergeSortedArrays([9,10,20,30,80,90], [22,31,40,70,120])).toEqual([9,10,20,22,30,31,40,70,80,90,120]);  //arr1 is longer
    expect(apress.mergeSortedArrays([10,20,30,80,90], [9,22,31,40,70,120])).toEqual([9,10,20,22,30,31,40,70,80,90,120]);  //arr2 is longer
  });
});