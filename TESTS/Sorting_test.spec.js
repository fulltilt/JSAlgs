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

  it("tests mergeSort", function() { 
    console.log('Before mergeSort()...');
    arr.print();
    arr.mergeSort();
    console.log('After mergeSort()...');
    arr.print();
  });

  it('tests merge', function() {
    console.log('testing merge...');
    expect(arr.merge([8], [3])).toEqual([3,8]);
    expect(arr.merge([3,8], [2,5])).toEqual([2,3,5,8]);
    expect(arr.merge([2,3,5,8], [1,4,6,7])).toEqual([1,2,3,4,5,6,7,8]);
  });

  it("tests quickSort", function() { 
    console.log('Before quickSort()...'); 
    arr.print();
    arr.quickSort();
    console.log('After quickSort()...'); 
    arr.print();  
  });

  it('tests partition', function() {
    console.log('before partition...');
    arr.dataStore = [3,8,2,5,1,4,7,6];
    console.log(arr.dataStore);

    arr.partition(arr.dataStore, 0, 7);
    
    console.log('after partition...');
    console.log(arr.dataStore);
  });

  it("tests non-inplace version quickSort", function() { 
    console.log('Before non-inplace quickSort()...'); 
    arr.print();
    arr.qSort();
    console.log('After non-inplace quickSort()...'); 
    arr.print();  
  });

  it('tests countInversions', function() {
    arr.dataStore = [1,3,5,2,4,6];
    expect(arr.countInversions()).toEqual(3);
    arr.dataStore = [1,5,3,2,4];
    expect(arr.countInversions()).toEqual(4);
    arr.dataStore = [5,4,3,2,1];
    expect(arr.countInversions()).toEqual(10);
  });
});