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
});