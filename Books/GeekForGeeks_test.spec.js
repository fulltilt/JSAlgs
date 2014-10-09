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

  it('tests word break', function() {
    expect(gfg.wordBreak(['i', 'like', 'sam', 'sung', 'samsung', 'mobile', 'ice', 'cream', 'icecream', 'man', 'go', 'mango'], 'ilikesamsung')).toEqual(true);
    //expect(gfg.wordBreak(['i', 'like', 'sam', 'sung', 'samsung', 'mobile', 'ice', 'cream', 'icecream', 'man', 'go', 'mango'], 'creamilikesamicesung')).toEqual(true);
    //expect(gfg.wordBreak(['i', 'like', 'sam', 'sung', 'samsung', 'mobile', 'ice', 'cream', 'icecream', 'man', 'go', 'mango'], 'creamilikesamicecat')).toEqual(false);
  });
});