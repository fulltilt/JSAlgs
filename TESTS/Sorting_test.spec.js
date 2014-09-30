var CArray = require('../Sorting.js');

describe("Sorting", function() {
  var numElements = 100;
  var arr = new CArray(numElements);

  beforeEach(function() {
    arr.clear();
    arr.setData();
  });

  it("tests bubbleSort", function() {
    console.log('Before bubbleSort()...'); 
    arr.print();
    arr.bubbleSort();
    console.log('After bubbleSort()...'); 
    arr.print();
  });

  it("tests selectionSort", function() { 
    console.log('Before selectionSort()...'); 
    arr.print();
    arr.selectionSort();
    console.log('After selectionSort()...'); 
    arr.print();  
  });

  it("tests insertionSort", function() { 
    console.log('Before insertionSort()...'); 
    arr.print();
    arr.insertionSort();
    console.log('After insertionSort()...'); 
    arr.print();  
  });
});