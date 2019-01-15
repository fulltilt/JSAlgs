var Dictionary = require('../Dictionary.js');

describe("Dictionary", function() {
  var dict = new Dictionary();

  beforeEach(function() {
    dict.clear();
  });

  it("adding and retrieving", function() {
  	dict.add("Derrick", "345");
    var result = dict.find("Derrick");
    expect(result).toEqual("345");
  });

  it("getting size before and after removing", function() {
    dict.add("Mike","123");
  	dict.add("David", "345");
  	dict.add("Cynthia", "456");
  	var result = dict.size();
  	expect(result).toEqual(3);
  	dict.remove("David");
  	result = dict.size();
  	expect(result).toEqual(2);
  });

  it("count occurrences of each word in a sentence", function() {
    var words = 'the brown fox jumped over the blue fox'.split(' ');
    
    words.forEach(function(word) {
      if (dict.find(word) === undefined) {
        dict.add(word, 1);
      } else {
        var count = dict.find(word);
        dict.remove(word);
        dict.add(word, ++count);
      }
    });
    
    expect(dict.find('fox')).toEqual(2);
    expect(dict.find('the')).toEqual(2);
    expect(dict.find('blue')).toEqual(1);
    expect(dict.find('brown')).toEqual(1);
    expect(dict.find('jumped')).toEqual(1);
    expect(dict.find('over')).toEqual(1);
  });
});