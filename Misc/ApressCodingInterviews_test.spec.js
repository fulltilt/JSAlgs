var Apress = require('./ApressCodingInterviews.js');

describe("ApressCodingInterviews", function() {
  var apress = new Apress();

  it("tests replacing blanks in a string", function() {
    expect(apress.replaceBlanks('We are happy.')).toEqual('We%20are%20happy.');
    expect(apress.replaceBlanks(' We are  happy.')).toEqual('%20We%20are%20%20happy.');
    expect(apress.replaceBlanks('We are happy. ')).toEqual('We%20are%20happy.%20');
    expect(apress.replaceBlanks(' We are happy.')).toEqual('%20We%20are%20happy.');
  });

  it('merges 2 sorted arrays', function() {
    expect(apress.mergeSortedArrays([10,20,30,80,90], [22,31,40,70,120])).toEqual([10,20,22,30,31,40,70,80,90,120]);      //arr1 and arr2 are of equal length
    expect(apress.mergeSortedArrays([9,10,20,30,80,90], [22,31,40,70,120])).toEqual([9,10,20,22,30,31,40,70,80,90,120]);  //arr1 has leftovers
    expect(apress.mergeSortedArrays([10,20,30,80,90], [9,22,31,40,70,120])).toEqual([9,10,20,22,30,31,40,70,80,90,120]);  //arr2 has leftovers
  });

  it('tests regexMatch', function() {
    expect(apress.regexMatch('aaa', 'a.a')).toEqual(true);
    expect(apress.regexMatch('aaa', 'ab*ac*a')).toEqual(true);
    expect(apress.regexMatch('aaa', 'aa.a')).toEqual(false);
    expect(apress.regexMatch('aaa', 'ab*a')).toEqual(false);
  });
});