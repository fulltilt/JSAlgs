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

  it("tests shellSort", function() { 
    console.log('Before shellSort()...'); 
    arr.print();
    arr.shellSort();
    console.log('After shellSort()...'); 
    arr.print();  
  });

/*
  it("tests mergeSort", function() { 
    console.log('Before mergeSort()...'); 
    arr.print();
    arr.mergeSort();
    console.log('After mergeSort()...'); 
    arr.print();  
  });
*/

  it('tests partition', function() {
    console.log('before partition...');
    arr.dataStore = [3,8,2,5,1,4,7,6];
    console.log(arr.dataStore);

    arr.partition(arr.dataStore, 0, 7);
    
    console.log('after partition...');
    console.log(arr.dataStore);
  });

  it("tests quickSort", function() { 
    console.log('Before quickSort()...'); 
    arr.print();
    arr.quickSort();
    console.log('After quickSort()...'); 
    arr.print();  
  });

  it("tests non-inplace version quickSort", function() { 
    console.log('Before non-inplace quickSort()...'); 
    arr.print();
    arr.qSort();
    console.log('After non-inplace quickSort()...'); 
    arr.print();  
  });
});