var HashTable = require('../HashTable.js');

describe("HashTable", function() {
  var hTable = new HashTable();

  beforeEach(function() {
    hTable.clear();
  });

  it("adding and retrieving", function() {
    var someNames = ["David", "Jennifer", "Donnie", "Raymond", "Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];

  	for (var i = 0; i < someNames.length; ++i) {
      hTable.put1(someNames[i]);
    }
    expect(hTable.get('David')).toEqual('David');
  });


  it("adding and retrieving with separate chaining", function() {
    var someNames = ["David", "Jennifer", "Donnie", "Raymond", "Cynthia", "Mike", "Clayton", "Danny", "Jonathan", "Hilda"];

    for (var i = 0; i < someNames.length; ++i) {
      hTable.put2(someNames[i]);
    }

    // Hilda collides with Clayton. W/O separate chaining, Hilda would overwrite Clayton
    var chain = hTable.get('Clayton');
    expect(chain.indexOf('Hilda')).toNotEqual(-1);
  });

  it("adding and retrieving with linear probing", function() {
    var someNames = ["David", "Jennifer", "Donnie", "Raymond", "Cynthia", "Mike", "Clayton", "Danny", "Jonathan", "Hilda"];

    for (var i = 0; i < someNames.length; ++i) {
      hTable.put3(someNames[i]);
    }

    // Hilda collides with Clayton. First assert that the hash values are equal
    expect(hTable.betterHash('Clayton')).toEqual(hTable.betterHash('Hilda'));

    // Second, assert that the bucket numbers are different
    expect(hTable.getBucket('Clayton')).toNotEqual(hTable.getBucket('Hilda'));
  });

  it('tests getFirstCharThatAppearsOnce', function() {
    expect(hTable.getFirstCharThatAppearsOnce('google')).toEqual('l');
    expect(hTable.getFirstCharThatAppearsOnce('legoogle')).toEqual('');
  });

  it('tests firstNonRepeatingCharInStream', function() {
    //hTable.firstNonRepeatingCharInStream(['g','e','e','k','s','f','o','r','g','e','e','k','s','a','n','d','g','e','e','k','s','q','u','i','z','f','o','r',]);
  });

  it('tests getFirstCharThatAppearsOnceInStream', function() {
    //hTable.getFirstCharThatAppearsOnceInStream('google'.split(''));
    //hTable.getFirstCharThatAppearsOnceInStream(['g','e','e','k','s','f','o','r','g','e','e','k','s','a','n','d','g','e','e','k','s','q','u','i','z','f','o','r',]);
  });

  it('tests deleteSecondFromFirst', function() {
    expect(hTable.deleteSecondFromFirst('We are students.', 'aeiou')).toEqual('W r stdnts.')
  });

  it('tests deleteDuplicatesButKeepFirstOccurrence', function() {
    expect(hTable.deleteDuplicatesButKeepFirstOccurrence('google')).toEqual('gole');
  });

  it('tests isAnagrams', function() {
    expect(hTable.isAnagrams('silent', 'listen')).toEqual(true);
    expect(hTable.isAnagrams('silent', 'ahuewi')).toEqual(false);

  });
});