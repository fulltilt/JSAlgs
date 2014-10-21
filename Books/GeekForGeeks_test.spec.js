var GeekForGeeks = require('./GeekForGeeks.js');
var BST = require('../BinarySearchTree.js');

describe("GeekForGeeks", function() {
  var gfg = new GeekForGeeks();

  it('it tests getting the median number', function() {
    expect(gfg.getMedianValue([0,5,13,19,22,41,55,68,72,81,98])).toEqual(5);  // odd (picks the exact middle element)
    expect(gfg.getMedianValue([0,5,13,19,22,41,55,68,72,81])).toEqual(4);     // even (picks the lower of the two median elements)
  });

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
      expect(gfg.findPivotInRotatedArray([3,4,5,1,2], 0, 4)).toEqual(2);
      expect(gfg.findPivotInRotatedArray([5, 6, 7, 8, 9, 10, 1, 2, 3], 0, 8)).toEqual(5);
    });

    it('tests findMedianInTwoSortedArrays', function() {
      expect(gfg.findMedianOfTwoSortedArrays([1, 12, 15, 26, 38], [2, 13, 17, 30, 45])).toEqual(16);
      expect(gfg.findMedianOfTwoSortedArrays([1, 12, 15, 26, 38], [2, 13, 17, 30])).toEqual(15);
      expect(gfg.findMedianOfTwoSortedArrays([900], [5, 8, 10, 20])).toEqual(10);
    });

    it('tests reverseArray', function() {
      expect(gfg.reverseArray([1, 12, 15, 26, 38, 2, 13, 17, 30, 45], 0, 9)).toEqual([45,30,17,13,2,38,26,15,12,1]);  // even
      expect(gfg.reverseArray([1, 12, 15, 26, 38, 13, 17, 30, 4], 0, 8)).toEqual([4,30,17,13,38,26,15,12,1]);         // odd
    });

    it('tests rotateArray', function() {
      expect(gfg.rotateArray([1,2,3,4,5,6,7], 2)).toEqual([3,4,5,6,7,1,2]);
    });

    it('tests leadersInAnArray', function() {
      expect(gfg.leadersInAnArray([16, 17, 4, 3, 5, 2])).toEqual([2,5,17]);
    });

    it('tests replace with next greatest', function() {
      expect(gfg.replaceWithNextGreatest([16, 17, 4, 3, 5, 2])).toEqual([17, 5, 5, 5, 2, -1]);
    });

    it('tests sortElementsByFrequency', function() {
      expect(gfg.sortElementsByFrequency([2, 5, 2, 8, 5, 6, 8, 8])).toEqual([8, 8, 8, 2, 2, 5, 5, 6]);
    });

    it('tests findTwoElementsWhoseSumIsClosestToZero', function() {
      expect(gfg.findTwoElementsWhoseSumIsClosestToZero([1, 60, -10, 70, -80, 85])).toEqual([-80, 85]); // keep in mind that JavaScript doesn't natively support Sets
      expect(gfg.findTwoElementsWhoseSumIsClosestToZero([-100, -30, 1, 2, 7])).toEqual([1, 2]);
    });

    it('tests segregateOnesAndZeroes', function() {
      expect(gfg.segregateOnesAndZeroes([0, 1, 0, 1, 0, 0, 1, 1, 1, 0])).toEqual([0, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
      expect(gfg.segregateOnesAndZeroes([0,0,0,0])).toEqual([0,0,0,0]);
      expect(gfg.segregateOnesAndZeroes([1,1,1,1])).toEqual([1,1,1,1]);
    });

    it('tests findTwoRepeatingElements', function() {
      expect(gfg.findTwoRepeatingElements([4, 2, 4, 5, 2, 3, 1])).toEqual([4, 2]);
      expect(gfg.findTwoRepeatingElements([1,2,3,4])).toEqual(false);
    });

    it('tests dutchNationalFlag', function() {
      expect(gfg.dutchNationalFlag([0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1])).toEqual([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2]);
      expect(gfg.dutchNationalFlag([2, 0, 2, 2, 2, 0, 1, 0, 2, 1])).toEqual([0, 0, 0, 1, 1, 2, 2, 2, 2, 2]);
    });

    it('tests binarySearchTreeToArray', function() {
      var arr = [1, 12, 15, 26, 38, 2, 13, 17, 30, 45];
      var bst = new BST.BinarySearchTree();
      for (var i = 0; i < arr.length; i++) {
        bst.insert(arr[i]);
      }
//bst.inOrder(bst.root);
      expect(gfg.binarySearchTreeToArray(bst.root)).toEqual([1, 2, 12, 13, 15, 17, 26, 30, 38, 45]);
    });

    it('tests union of 2 arrays', function() {
      expect(gfg.unionOfTwoArrays([1, 3, 4, 5, 7], [2, 3, 5, 6])).toEqual([1,2,3,4,5,6,7]);
    });

    it('tests intersection of 2 arrays', function() {
      expect(gfg.intersectionOfTwoArrays([1, 3, 4, 5, 7], [2, 3, 5, 6])).toEqual([3,5]);
    });

    xit('tests findMinUnsortedSubArray', function() {
      expect(gfg.findMinUnsortedSubArray([10, 12, 20, 30, 25, 40, 32, 31, 35, 50, 60])).toEqual([30,25,40,32,31,35]);
    });

    xit('tests findDuplicates', function() {
      expect(gfg.findDuplicates([1, 2, 3, 1, 3, 6, 6])).toEqual([1,3,6]); // keep in mind that JavaScript doesn't natively support Sets
    });

    xit('tests areAllElementsConsecutive', function() {
      expect(gfg.areAllElementsConsecutive([5, 2, 3, 1, 4])).toEqual(true);
      expect(gfg.areAllElementsConsecutive([83, 78, 80, 81, 79, 82])).toEqual(true);
      expect(gfg.areAllElementsConsecutive([34, 23, 52, 12, 3])).toEqual(false);
      expect(gfg.areAllElementsConsecutive([7, 6, 5, 5, 3, 4])).toEqual(false);
    });

    xit('tests findSmallestMissingNumber', function() {
      expect(gfg.findSmallestMissingNumber([0, 1, 2, 6, 9])).toEqual(3);
      expect(gfg.findSmallestMissingNumber([4, 5, 10, 11])).toEqual(0);
      expect(gfg.findSmallestMissingNumber([0, 1, 2, 3])).toEqual(4);
      expect(gfg.findSmallestMissingNumber([0, 1, 2, 3, 4, 5, 6, 7, 10])).toEqual(8);
    });
  });

  describe('Matrix', function() {
    xit('tests maxSquareSubMatrix', function() {

    });
  });
});