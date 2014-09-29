function Sorting(numElements) {
  this.dataStore = [];
  this.pos = 0;
  this.numElements = numElements;
  this.insert = insert;
  this.toString = toString;
  this.clear = clear;
  this.setData = setData;
  this.swap = swap;
  
  for (var i = 0; i < numElements; ++i) {
    this.dataStore[i] = i;
  }
}

module.exports = Sorting;