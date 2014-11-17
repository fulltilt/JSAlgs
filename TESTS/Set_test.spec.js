var Set = require('../Set.js');

describe("Set", function() {
  var set1 = new Set();
  var set2 = new Set();
  var set3 = new Set();
  var set4 = new Set();

  beforeEach(function() {
    set1.clear();
    set1.add('David');
    set1.add('Peter');
    set1.add('Paul');

    set2.clear();
    set2.add('Peter');
    set2.add('Paul');
    set2.add('Mary');

    set3.clear();
    set4.clear();
  });

  it("attempts to add duplicates", function() {
    expect(set1.add('David')).toEqual(false);
    expect(set1.size()).toEqual(3);
  });


  it("tests union", function() {
    set1.union(set2);
    
    expect(set1.size()).toEqual(4);
    expect(set1.dataStore.indexOf('Peter')).toNotEqual(-1);
    expect(set1.dataStore.indexOf('David')).toNotEqual(-1);
    expect(set1.dataStore.indexOf('Mary')).toNotEqual(-1);
  });

  it("tests intersect", function() {
    var set3 = set1.intersect(set2);
    
    expect(set3.size()).toEqual(2);
    expect(set3.dataStore.indexOf('Peter')).toNotEqual(-1);
    expect(set3.dataStore.indexOf('David')).toEqual(-1);
  });

  it("tests subset", function() {
    set1.union(set2);

    set3.add('Peter');
    set3.add('Paul');

    set4.add('John');
    
    expect(set1.subset(set3)).toEqual(true);
    expect(set1.subset(set4)).toEqual(false);
  });

  it("tests difference", function() {
    set3 = set1.difference(set2);
    console.log(set3.show());
    
    expect(set3.size()).toEqual(1);
    expect(set3.dataStore.indexOf('Peter')).toEqual(-1);
    expect(set3.dataStore.indexOf('David')).toNotEqual(-1);
  });

  it('tests union of 2 arrays', function() {
    expect(set1.unionOfTwoArrays([1, 3, 4, 5, 7], [2, 3, 5, 6])).toEqual([1,2,3,4,5,6,7]);
  });

  it('tests intersection of 2 arrays', function() {
    expect(set1.intersectionOfTwoArrays([1, 3, 4, 5, 7], [2, 3, 5, 6])).toEqual([3,5]);
  });

  xit('tests printSubsetsOfKElements', function() {
    var result = [];
    set1.printSubsetsOfKElements([1, 2, 3, 4, 5], result, [], 3);
    console.log(result);
  });

  it('tests kLengthStringsFromNChars', function() {
    var prefix = '';
    set1.kLengthStringsFromNChars(['a','b'], '', 3);
  });

  it('tests printFirstKIncSequenceFromNNumbers', function() {
    set1.printFirstKIncSequenceFromNNumbers(7, 3, 0, []);
  });
});