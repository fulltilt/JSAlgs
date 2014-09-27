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
});