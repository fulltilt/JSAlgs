var Strings = require('../Strings/Strings.js');

describe("Strings", function() {
  var s = new Strings();

  it('tests areStringRotations', function() {
    expect(s.areStringRotations('ABCD', 'CDAB')).toEqual(true);
    expect(s.areStringRotations('ABCD', 'ACBD')).toEqual(false);
  });

  it('tests isFirstStringSubsequenceOfSecond', function() {
    expect(s.isFirstStringSubsequenceOfSecond('AXY', 'ADXCPY')).toEqual(true);
    expect(s.isFirstStringSubsequenceOfSecond('AXY', 'YADXCP')).toEqual(false);
    expect(s.isFirstStringSubsequenceOfSecond('gksrek', 'geeksforgeeks')).toEqual(true);
  });

  it('tests runLengthEncoding', function() {
    expect(s.runLengthEncoding('wwwwaaadexxxxxx')).toEqual('w4a3d1e1x6');
  });

  it('tests printListItemsContainingWord', function() {
    expect(s.printListItemsContainingWord(['sunday','geeksforgeeks','utensils','just','sss'], 'sun')).toEqual(['sunday','utensils']);
  });

  it('tests reverseWord', function() {
    expect(s.reverseWord('hello'.split(''), 0, 4)).toEqual('olleh');
    expect(s.reverseWord('hair'.split(''), 0, 3)).toEqual('riah');
  });

  it('tests reverseWords', function() {
    expect(s.reverseWords('i like this program very much')).toEqual('much very program this like i');
  });

  it('tests smallestWindowContainingString', function() {
    expect(s.smallestWindowContainingString('this is a test string', 'tist')).toEqual('t stri');
    expect(s.smallestWindowContainingString('adobecodebanc', 'abc')).toEqual('banc');
  });

  it('tests printInterleavings', function() {
    expect(s.printInterleavings('AB', 'CD')).toEqual(['ABCD','ACBD','ACDB','CABD','CADB','CDAB']);
    expect(s.printInterleavings('AB', 'C')).toEqual(['ABC','ACB','CAB']);
  });

  it('tests removeFromString', function() {
    expect(s.removeFromString('acbac')).toEqual('');
    expect(s.removeFromString('aaac')).toEqual('aa');
    expect(s.removeFromString('ababac')).toEqual('aa');
    expect(s.removeFromString('bbbbd')).toEqual('d');
    expect(s.removeFromString('aacacc')).toEqual('ac');
  });

  it('tests findExcelColumnName', function() {
    expect(s.findExcelColumnName(26)).toEqual('Z');
    expect(s.findExcelColumnName(51)).toEqual('AY');
    expect(s.findExcelColumnName(52)).toEqual('AZ');
    expect(s.findExcelColumnName(80)).toEqual('CB');
    expect(s.findExcelColumnName(676)).toEqual('YZ');
    expect(s.findExcelColumnName(702)).toEqual('ZZ');
    expect(s.findExcelColumnName(705)).toEqual('AAC');
  });

  it('findAllPossibleWordsFromPhoneDigits', function() {
    var result = [];
    //s.findAllPossibleWordsFromPhoneDigits([2,0,4], 0, result);
  });

  it('tests printAnagramsTogether', function() {
    //s.printAnagramsTogether(["cat", "dog", "tac", "god", "act"]);
  });

  it('tests sameCharsNDistanceAway', function() {
    // note: there are more than one possible correct answer
    expect(s.sameCharsNDistanceAway('abb', 2)).toEqual('bab');
    expect(s.sameCharsNDistanceAway('aacbbc', 3)).toEqual('acbacb');
    expect(s.sameCharsNDistanceAway('geeksforgeeks', 3)).toEqual('egkegkesfesor');
    expect(s.sameCharsNDistanceAway('aaa', 2)).toEqual(false);
  });

  it('tests inPlaceStringTransform', function() {
    expect(s.inPlaceStringTransform('a1b2c3d4e5f6g7h8i9j1k2l3m4')).toEqual('abcdefghijklm1234567891234');
  });

  it('tests removeAdjacentDuplicates', function() {
    expect(s.removeAdjacentDuplicates('azxxzy'.split(''), 0, null)).toEqual('ay');
    expect(s.removeAdjacentDuplicates('geeksforgeeg'.split(''), 0, null)).toEqual('gksfor');
    expect(s.removeAdjacentDuplicates('caaabbbaacdddd'.split(''), 0, null)).toEqual('');
    expect(s.removeAdjacentDuplicates('acaaabbbacdddd'.split(''), 0, null)).toEqual('acac');
    expect(s.removeAdjacentDuplicates('caaabbbaac'.split(''), 0, null)).toEqual('');
    expect(s.removeAdjacentDuplicates('aaaaaaaaaa'.split(''), 0, null)).toEqual('');
    expect(s.removeAdjacentDuplicates('acbbcddc'.split(''), 0, null)).toEqual('ac');
    
    //expect(s.removeAdjacentDuplicates('gghhg'.split(''), 0, null)).toEqual('g');
    //expect(s.removeAdjacentDuplicates('aaaacddddcappp'.split(''), 0, null)).toEqual('a');
    //expect(s.removeAdjacentDuplicates('qpaaaaadaaaaadprq'.split(''), 0, null)).toEqual('qrq');
  });
});