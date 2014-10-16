var GeekForGeeks = require('./GeekForGeeks.js');

describe("GeekForGeeks", function() {
  var gfg = new GeekForGeeks();

  it("tests find equilibrium index", function() {
    expect(gfg.findEquilibriumIndex([-7,1,5,2,-4,3,0])).toEqual(3);
  });

  it('tests finding angle between hour hand and minute hand', function() {
    expect(gfg.findAngleBetweenClockHands(12, 30)).toEqual(165);
    expect(gfg.findAngleBetweenClockHands(3, 30)).toEqual(75);
  });

  it('tests binary search', function() {
    expect(gfg.binarySearch([0,5,13,19,22,41,55,68,72,81,98], 72)).toEqual(true);
    expect(gfg.binarySearch([0,5,13,19,22,41,55,68,72,81,98], 0)).toEqual(true);
    expect(gfg.binarySearch([0,5,13,19,22,41,55,68,72,81,98], -1)).toEqual(false);
    expect(gfg.recursiveBinarySearch([0,5,13,19,22,41,55,68,72,81,98], 72, 0, 10)).toEqual(true);
    expect(gfg.recursiveBinarySearch([0,5,13,19,22,41,55,68,72,81,98], 0, 0, 10)).toEqual(true);
    expect(gfg.recursiveBinarySearch([0,5,13,19,22,41,55,68,72,81,98], -1, 0, 10)).toEqual(false);
  });

  it('tests search sorted rotated array', function() {
    expect(gfg.searchSortedRotatedArray([5, 6, 7, 8, 9, 10, 1, 2, 3], 6)).toEqual(true);
    expect(gfg.searchSortedRotatedArray([1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], 0)).toEqual(true);
    expect(gfg.searchSortedRotatedArray([2, 3, 0, 2, 2, 2, 2, 2, 2, 2], 3)).toEqual(true);
    expect(gfg.searchSortedRotatedArray([2, 3, 0, 2, 2, 2, 2, 2, 2, 2], 4)).toEqual(false);
  });

  it('tests power()', function() {
    expect(gfg.power(3,4)).toEqual(81);
    //expect(gfg.power(2,-1)).toEqual(.5);
    expect(gfg.power(.5,2)).toEqual(.25);
  });

  it('tests findMedian', function() {
    expect(gfg.findMedian([3,8,2,5,1,4,7,6])).toEqual(5);
  });

  it('tests partition', function() {
    var arr = [3,8,2,5,1,4,7,6];
    expect(gfg.partition(arr, 0 , arr.length - 1, Math.floor(arr.length / 2))).toEqual(2);
  });

  describe('Arrays', function() {
    it('tests findMajority', function() {
      expect(gfg.findMajority([3, 3, 4, 2, 4, 4, 2, 4, 4])).toEqual(4);
      expect(gfg.findMajority([3, 3, 4, 2, 4, 4, 2, 4])).toEqual(null);
    });

    it('tests findMissingNumber', function() {
      expect(gfg.findMissingNumber([1, 2, 4, 6, 3, 7, 8])).toEqual(5);
    });

    it('tests findPivotInRotatedArray', function() {
      expect(gfg.findPivotInRotatedArray([3,4,5,1,2])).toEqual(2);
    });

    it('tests findMedianInTwoSortedArrays', function() {
      expect(gfg.findMedianOfTwoSortedArrays([1, 12, 15, 26, 38], [2, 13, 17, 30, 45])).toEqual(16);
    });

    it('tests reverseArray', function() {
      expect(gfg.reverseArray([1, 12, 15, 26, 38, 2, 13, 17, 30, 45])).toEqual([45,30,17,13,2,38,26,15,12,1]);  // even
      expect(gfg.reverseArray([1, 12, 15, 26, 38, 13, 17, 30, 4])).toEqual([4,30,17,13,38,26,15,12,1]);         // odd
    });

    it('tests rotateArray', function() {
      expect(gfg.rotateArray([1,2,3,4,5,6,7], 2)).toEqual([3,4,5,6,7,1,2]);
    });

    it('tests leadersInAnArray', function() {
      expect(gfg.leadersInAnArray([16, 17, 4, 3, 5, 2])).toEqual([2,5,17]);
    });

    it('tests sortElementsByFrequency', function() {
      expect(gfg.sortElementsByFrequency([2, 5, 2, 8, 5, 6, 8, 8])).toEqual([8, 8, 8, 2, 2, 5, 5, 6]);
    });

    it('tests findTwoElementsWhoseSumIsClosestToZero', function() {
      expect(gfg.findTwoElementsWhoseSumIsClosestToZero([1, 60, -10, 70, -80, 85])).toEqual([-80, 85]); // keep in mind that JavaScript doesn't natively support Sets
    });

    it('tests segregateOnesAndZeroes', function() {
      expect(gfg.segregateOnesAndZeroes([0, 1, 0, 1, 0, 0, 1, 1, 1, 0])).toEqual([0, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
    });

    it('tests findMinUnsortedSubArray', function() {
      expect(gfg.findMinUnsortedSubArray([10, 12, 20, 30, 25, 40, 32, 31, 35, 50, 60])).toEqual([30,25,40,32,31,35]);
    });

    it('tests findDuplicates', function() {
      expect(gfg.findDuplicates([1, 2, 3, 1, 3, 6, 6])).toEqual([1,3,6]); // keep in mind that JavaScript doesn't natively support Sets
    });
  });

  describe('Matrix', function() {
    it('tests maxSquareSubMatrix', function() {

    });
  });
});