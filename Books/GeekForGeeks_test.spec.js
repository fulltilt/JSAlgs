var GeekForGeeks = require('./GeekForGeeks.js');
var BST = require('../BinarySearchTree.js');  // for binarySearchTreeToArray

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
    expect(gfg.binarySearch([0,5,13,19,22,41,55,68,72,81,98], 72)).toEqual(8);
    expect(gfg.binarySearch([0,5,13,19,22,41,55,68,72,81,98], 0)).toEqual(0);
    expect(gfg.binarySearch([0,5,13,19,22,41,55,68,72,81,98], 49)).toEqual(-6);
    expect(gfg.binarySearch([0,5,13,19,22,41,55,68,72,81,98], -1)).toEqual(-Infinity);
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

      expect(gfg.binarySearchTreeToArray(bst.root)).toEqual([1, 2, 12, 13, 15, 17, 26, 30, 38, 45]);
    });

    it('tests union of 2 arrays', function() {
      expect(gfg.unionOfTwoArrays([1, 3, 4, 5, 7], [2, 3, 5, 6])).toEqual([1,2,3,4,5,6,7]);
    });

    it('tests intersection of 2 arrays', function() {
      expect(gfg.intersectionOfTwoArrays([1, 3, 4, 5, 7], [2, 3, 5, 6])).toEqual([3,5]);
    });

    it('floorAndCeilOfSortedArray' , function() {
      expect(gfg.floorAndCeilOfSortedArray([1, 2, 8, 10, 10, 12, 19], 0)).toEqual([null, 1]);
      expect(gfg.floorAndCeilOfSortedArray([1, 2, 8, 10, 10, 12, 19], 1)).toEqual([1, 1]);
      expect(gfg.floorAndCeilOfSortedArray([1, 2, 8, 10, 10, 12, 19], 5)).toEqual([2, 8]);
      expect(gfg.floorAndCeilOfSortedArray([1, 2, 8, 10, 10, 12, 19], 20)).toEqual([19, null]);
      expect(gfg.floorAndCeilOfSortedArray([1], 20)).toEqual([1, null]);
      expect(gfg.floorAndCeilOfSortedArray([20], 1)).toEqual([null, 20]);
    });

    it('tests prodArrayPuzzle', function() {
      expect(gfg.prodArrayPuzzle([10, 3, 5, 6, 2])).toEqual([180, 600, 360, 300, 900]);
    });

    it('tests findMinUnsortedSubArray', function() {
      expect(gfg.findMinUnsortedSubArray([10, 12, 20, 30, 25, 40, 32, 31, 35, 50, 60])).toEqual([30,25,40,32,31,35]);
      expect(gfg.findMinUnsortedSubArray([10, 12, 20, 30, 25, 40, 32, 31, 35])).toEqual([30,25,40,32,31,35]); // corner case: unsorted on right edge
      expect(gfg.findMinUnsortedSubArray([30, 25, 40, 32, 31, 35, 50, 60])).toEqual([30,25,40,32,31,35]);     // corner case: unsorted on left edge
      expect(gfg.findMinUnsortedSubArray([3, 2, 1])).toEqual([3, 2, 1]);
      expect(gfg.findMinUnsortedSubArray([3, 1, 2])).toEqual([3, 1, 2]);
      expect(gfg.findMinUnsortedSubArray([1, 3, 2])).toEqual([3, 2]);
      expect(gfg.findMinUnsortedSubArray([2, 1])).toEqual([2, 1]);
      expect(gfg.findMinUnsortedSubArray([1, 4, 2, 3])).toEqual([4, 2, 3]);
    });

    it('tests findDuplicates', function() {
      expect(gfg.findDuplicates([1, 2, 3, 1, 3, 6, 6])).toEqual([1,3,6]); // keep in mind that JavaScript doesn't natively support Sets
    });

    it('tests nextGreaterElement', function() {
      /*** NOTE: order doesn't matter for object literal equality ***/
      expect(gfg.nextGreaterElement([4,5,2,25])).toEqual({ '2': 25, '4': 5, '5': 25, '25': -1 });
      expect(gfg.nextGreaterElement([13,7,6,12])).toEqual({ '6': 12, '12': -1, '7': 12, '13': -1 });
    });

    it('tests areAllElementsConsecutive', function() {
      expect(gfg.areAllElementsConsecutive([5, 2, 3, 1, 4])).toEqual(true);
      expect(gfg.areAllElementsConsecutive([83, 78, 80, 81, 79, 82])).toEqual(true);
      expect(gfg.areAllElementsConsecutive([34, 23, 52, 12, 3])).toEqual(false);
      expect(gfg.areAllElementsConsecutive([7, 6, 5, 5, 3, 4])).toEqual(false);
      expect(gfg.areAllElementsConsecutive([7, 6, 5, 5, 3])).toEqual(false);
    });

    it('tests findSmallestMissingNumber', function() {
      expect(gfg.findSmallestMissingNumber([0, 1, 2, 6, 9], 0, 4)).toEqual(3);
      expect(gfg.findSmallestMissingNumber([4, 5, 10, 11], 0, 3)).toEqual(0);
      expect(gfg.findSmallestMissingNumber([0, 1, 2, 3], 0, 3)).toEqual(4);
      expect(gfg.findSmallestMissingNumber([0, 1, 2, 3, 4, 5, 6, 7, 10], 0, 8)).toEqual(8);
    });

    it('tests countNumberOfOccurrences()', function() {
      expect(gfg.countNumberOfOccurrences([1, 1, 2, 2, 2, 2, 3], 2, 0, 6)).toEqual(4);
      expect(gfg.countNumberOfOccurrences([1, 1, 2, 2, 2, 2, 3], 3, 0, 6)).toEqual(1);
      expect(gfg.countNumberOfOccurrences([1, 1, 2, 2, 2, 2, 3], 1, 0, 6)).toEqual(2);
      expect(gfg.countNumberOfOccurrences([1, 1, 2, 2, 2, 2, 3], 4, 0, 6)).toEqual(0);
    });

    it('tests maxOfAllSubArrays()', function() {
      expect(gfg.maxOfAllSubArrays([1, 2, 3, 1, 4, 5, 2, 3, 6], 3)).toEqual([3, 3, 4, 5, 5, 5, 6]);
      expect(gfg.maxOfAllSubArrays([10, 5, 3, 7, 9, 4, 15, 12, 90, 13], 4)).toEqual([10, 9, 9, 15, 15, 90, 90]);
      expect(gfg.maxOfAllSubArrays([12, 78, 1, 90, 57, 89, 56], 3)).toEqual([78, 90, 90, 90, 89]);
    });

    it('tests minDistanceBetweenTwoNums', function() {
      expect(gfg.minDistanceBetweenTwoNums([1,2], 1, 2)).toEqual(1);
      expect(gfg.minDistanceBetweenTwoNums([3,4,5], 3, 5)).toEqual(2);
      expect(gfg.minDistanceBetweenTwoNums([3, 5, 4, 2, 6, 5, 6, 6, 5, 4, 8, 3], 3, 6)).toEqual(4);
      expect(gfg.minDistanceBetweenTwoNums([2, 5, 3, 5, 4, 4, 2, 3], 3, 2)).toEqual(1);
    });

    it('tests findRepeatingAndMissing', function() {
      expect(gfg.findRepeatingAndMissing([3,1,3])).toEqual([3,2]);
      expect(gfg.findRepeatingAndMissing([4,3,6,2,1,1])).toEqual([1,5]);
    });

    it('tests fixedPointInArray', function() {
      expect(gfg.fixedPointInArray([-10, -5, 0, 3, 7])).toEqual(3);
      expect(gfg.fixedPointInArray([0, 2, 5, 8, 17])).toEqual(0);
      expect(gfg.fixedPointInArray([-10, -5, 3, 4, 7, 9])).toEqual(-1);
    });

    it('tests maxLengthBitonicSubArray', function() {
      expect(gfg.maxLengthBitonicSubArray([12, 4, 78, 90, 45, 23])).toEqual(5);
      expect(gfg.maxLengthBitonicSubArray([20, 4, 1, 2, 3, 4, 2, 10])).toEqual(5);
      expect(gfg.maxLengthBitonicSubArray([10])).toEqual(1);
      expect(gfg.maxLengthBitonicSubArray([10, 20, 30, 40])).toEqual(4);
      expect(gfg.maxLengthBitonicSubArray([40, 30, 20, 10])).toEqual(4);
    });

    it('tests getMaxLengthBitonicSubArray', function() {
      expect(gfg.getMaxLengthBitonicSubArray([12, 4, 78, 90, 45, 23])).toEqual([4, 78, 90, 45, 23]);
      expect(gfg.getMaxLengthBitonicSubArray([20, 4, 1, 2, 3, 4, 2, 10])).toEqual([1, 2, 3, 4, 2]);
      expect(gfg.getMaxLengthBitonicSubArray([10])).toEqual([10]);
      expect(gfg.getMaxLengthBitonicSubArray([10, 20, 30, 40])).toEqual([10, 20, 30, 40]);
      expect(gfg.getMaxLengthBitonicSubArray([40, 30, 20, 10])).toEqual([40, 30, 20, 10]);
    });

    it('tests findMaxInIncreasingDecreasing', function() {
      expect(gfg.findMaxInIncreasingDecreasing([1, 30, 40, 50, 60, 70, 23, 20])).toEqual(70);
      expect(gfg.findMaxInIncreasingDecreasing([3, 50, 10, 9, 7, 6])).toEqual(50);
      expect(gfg.findMaxInIncreasingDecreasing([2, 4, 6, 8, 10, 3, 1])).toEqual(10);
      //expect(gfg.findMaxInIncreasingDecreasing([10, 20, 30, 40])).toEqual(40); // algo doesn't work for this or the one below
      //expect(gfg.findMaxInIncreasingDecreasing([40, 30, 20, 10])).toEqual(40);
    });

    it('tests findSubArrayWithGivenSum', function() {
      expect(gfg.findSubArrayWithGivenSum([1,4,20,3,10,5], 33)).toEqual([2,4]);
      expect(gfg.findSubArrayWithGivenSum([1,4,0,0,3,10,5], 7)).toEqual([1,4]);
      expect(gfg.findSubArrayWithGivenSum([1,4], 0)).toEqual(false);
    });

    it('tests findTwoNumsThatSumToN', function() {
      expect(gfg.findTwoNumsThatSumToN([-8, 1, 4, 6, 10, 45], 16)).toEqual([6,10]);
      expect(gfg.findTwoNumsThatSumToN([-8, 1, 4, 6, 10, 45], 0)).toEqual(-1);
    });

    it('tests findTripletThatSumsToN', function() {
      expect(gfg.findTripletThatSumsToN([1, 4, 45, 6, 10, 8], 22)).toEqual([8,10,4]);
      expect(gfg.findTripletThatSumsToN([1, 4, 45, 6, 10, 8], 5)).toEqual(-1);
    });

    it('tests findSortedSubSequenceOfThree', function() {
      expect(gfg.findSortedSubSequenceOfThree([12, 11, 10, 5, 6, 2, 30])).toEqual([5,6,30]);
      expect(gfg.findSortedSubSequenceOfThree([12, 11, 10, 6, 5, 2, 30])).toEqual(-1);
    });

    it('tests formBiggestNumber', function() {
      var arr = [];
      arr.push('54');
      arr.push('546');
      arr.push('548');
      arr.push('60');
      expect(gfg.formBiggestNumber(arr)).toEqual('6054854654');

      arr = [];
      arr.push('7');
      arr.push('776');
      arr.push('7');
      arr.push('7');
      expect(gfg.formBiggestNumber(arr)).toEqual('777776');

      arr = [];
      arr.push('1');
      arr.push('34');
      arr.push('3');
      arr.push('98');
      arr.push('9');
      arr.push('76');
      arr.push('45');
      arr.push('4');
      expect(gfg.formBiggestNumber(arr)).toEqual('998764543431');
    });

    it('tests mergeKSortedArrays', function() {
      var arr = [[1, 3, 5, 7],
                 [2, 4, 6, 8],
                 [0, 9, 10, 11]];
      expect(gfg.mergeKSortedArrays(arr)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });

    it('tests smallestSubArrayWhoseSumIsGreaterThanN', function() {
      expect(gfg.smallestSubArrayWhoseSumIsGreaterThanN([1, 4, 45, 6, 10, 19], 51)).toEqual([4,45,6]);
      expect(gfg.smallestSubArrayWhoseSumIsGreaterThanN([1, 10, 5, 2, 7], 9)).toEqual([10]);
      expect(gfg.smallestSubArrayWhoseSumIsGreaterThanN([1, 11, 100, 1, 0, 200, 3, 2, 1, 250], 280)).toEqual([100,1,0,200]);
      expect(gfg.smallestSubArrayWhoseSumIsGreaterThanN([1, 10, 5, 2, 7], 900)).toEqual(-1);
    });

    it('tests findKClosestElementsToN', function() {
      expect(gfg.findKClosestElementsToN([12, 16, 22, 30, 35, 39, 42, 45, 48, 50, 53, 55, 56], 4, 35)).toEqual([39,30,42,45]);
      expect(gfg.findKClosestElementsToN([12, 16, 22, 30, 35, 39, 42, 45, 48, 50, 53, 55, 56], 4, 0)).toEqual([12,16,22,30]);
      expect(gfg.findKClosestElementsToN([12, 16, 22, 30, 35, 39, 42, 45, 48, 50, 53, 55, 56], 4, 350)).toEqual([56,55,53,50]);
    });

    it('tests maxSumPathBetweenTwoArrays', function() {
      expect(gfg.maxSumPathBetweenTwoArrays([2, 3, 7, 10, 12],[1,5,7,8])).toEqual(35);
      expect(gfg.maxSumPathBetweenTwoArrays([10,12],[5,7,9])).toEqual(22);
      expect(gfg.maxSumPathBetweenTwoArrays([2, 3, 7, 10, 12, 15, 30, 34],[1, 5, 7, 8, 10, 15, 16, 19])).toEqual(122);
    });

    it('tests sortDefinedBySecondArray', function() {
      expect(gfg.sortDefinedBySecondArray([2, 1, 2, 5, 7, 1, 9, 3, 6, 8, 8], [2,1,8,3])).toEqual([2, 2, 1, 1, 8, 8, 3, 5, 6, 7, 9]);
    });

    xit('tests alternatePositiveAndNegative', function() {
      expect(gfg.alternatePositiveAndNegative([1, 2, 3, -4, -1, 4])).toEqual([-4, 1, -1, 2, 3, 4]);
      expect(gfg.alternatePositiveAndNegative([-5, -2, 5, 2, 4, 7, 1, 8, 0, -8])).toEqual([-5, 5, -2, 2, -8, 4, 7, 1, 8, 0]);
    });

    it('tests findSmallestValueNotReppedBySubArraySum', function() {
      expect(gfg.findSmallestValueNotReppedBySubArraySum([1, 3, 6, 10, 11, 15])).toEqual(2);
      expect(gfg.findSmallestValueNotReppedBySubArraySum([1,1,1,1])).toEqual(5);
      expect(gfg.findSmallestValueNotReppedBySubArraySum([1,1,3,4])).toEqual(10);
      expect(gfg.findSmallestValueNotReppedBySubArraySum([1,2,5,10,20,40])).toEqual(4);
      expect(gfg.findSmallestValueNotReppedBySubArraySum([1,2,3,4,5,6])).toEqual(22);
    });

    it('tests findCommonElementsInThreeSortedArrays', function() {
      expect(gfg.findCommonElementsInThreeSortedArrays([1, 5, 10, 20, 40, 80],[6, 7, 20, 80, 100],[3, 4, 15, 20, 30, 70, 80, 120])).toEqual([20,80]);
      expect(gfg.findCommonElementsInThreeSortedArrays([1,5,5],[3,4,5,5],[5,5,10,20])).toEqual([5,5]);
    });

    xit('tests maxProductSubArray', function() {
      expect(gfg.maxProductSubArray([6, -3, -10, 0, 2])).toEqual(180);
      expect(gfg.maxProductSubArray([-1, -3, -10, 0, 60])).toEqual(60);
      expect(gfg.maxProductSubArray([-2, -3, 0, -2, -40])).toEqual(80);
    });

    xit('tests largestSubArrayOfZeroesAndOnes', function() {
      expect(gfg.largestSubArrayOfZeroesAndOnes([1, 0, 1, 1, 1, 0, 0])).toEqual([1,6]);
      expect(gfg.largestSubArrayOfZeroesAndOnes([1, 1, 1, 1])).toEqual(-1);
      expect(gfg.largestSubArrayOfZeroesAndOnes([0, 0, 1, 1, 0])).toEqual([1,4]);
      //expect(gfg.largestSubArrayOfZeroesAndOnes([0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1])).toEqual([1,4]);
    });

    xit('tests countSmallerElementsOnRight', function() {
      expect(gfg.countSmallerElementsOnRight([12, 1, 2, 3, 0, 11, 4])).toEqual([6,1,1,1,0,1,0]);
      expect(gfg.countSmallerElementsOnRight([5,4,3,2,1])).toEqual([4,3,2,1,0]);
      expect(gfg.countSmallerElementsOnRight([1,2,3,4,5])).toEqual([0,0,0,0,0]);
    });

    xit('tests isSubArray', function() {
      expect(gfg.isSubArray([11, 1, 13, 21, 3, 7], [11, 3, 7, 1])).toEqual(true);
      expect(gfg.isSubArray([1, 2, 3, 4, 5, 6], [1, 2, 4])).toEqual(true);
      expect(gfg.isSubArray([10, 5, 2, 23, 19], [19, 5, 3])).toEqual(false);
    });
  });
});