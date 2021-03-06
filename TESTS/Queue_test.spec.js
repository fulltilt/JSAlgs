var Queue = require('../Queue.js');

describe("Queue", function() {
  var minQueue = new Queue.ConstantQueue(),
      maxQueue = new Queue.ConstantQueue(),
      maxQueueSimple = new Queue.ConstantQueueSimple();

  beforeEach(function() {
    minQueue.clear();
    minQueue.minEnqueue(4);
    minQueue.minEnqueue(2);
    minQueue.minEnqueue(5);
    minQueue.minEnqueue(1);

    maxQueue.clear();
    maxQueue.maxEnqueue(4);
    maxQueue.maxEnqueue(2);
    maxQueue.maxEnqueue(5);
    maxQueue.maxEnqueue(1);
  });

  it('tests minEnqueue', function() {
    expect(minQueue.toString()).toEqual([[4,4], [2,2], [5,2], [1,1]]);
  });

  it('tests maxEnqueue', function() {
    expect(maxQueue.toString()).toEqual([[4,4], [2,4], [5,5], [1,5]]);
  });

  it('tests minDequeue', function() {
    expect(minQueue.minDequeue()).toEqual([4,1]);
  });

  it('tests maxDequeue', function() {
    expect(maxQueue.maxDequeue()).toEqual([4,5]);
  });

  it('tests getMin', function() {
    expect(minQueue.getMin()).toEqual(1);
    minQueue.clear();
    minQueue.minEnqueue(1);
    minQueue.minEnqueue(5);
    minQueue.minEnqueue(2);
    minQueue.minEnqueue(4);
    minQueue.minDequeue();
    console.log(minQueue.popStack);
    expect(minQueue.getMin()).toEqual(2);
  });

  it('tests getMax', function() {
    expect(maxQueue.getMax()).toEqual(5);
    maxQueue.clear();
    maxQueue.maxEnqueue(1);
    maxQueue.maxEnqueue(5);
    maxQueue.maxEnqueue(2);
    maxQueue.maxEnqueue(4);
    maxQueue.maxDequeue();
    console.log(maxQueue.popStack);
    expect(maxQueue.getMax()).toEqual(5);
  });

  it('tests ConstantQueueSimple', function() {
    var arr = [12,5,10,7,11,19];
    maxQueueSimple.push(19);
    maxQueueSimple.push(16);
    expect(maxQueueSimple.getMax()).toEqual(19);
    maxQueueSimple.push(6);
    maxQueueSimple.pop();
    expect(maxQueueSimple.getMax()).toEqual(16);
    maxQueueSimple.push(15);
    expect(maxQueueSimple.getMax()).toEqual(16);
    maxQueueSimple.pop();
    maxQueueSimple.push(20);
    expect(maxQueueSimple.getMax()).toEqual(20);
  });
});