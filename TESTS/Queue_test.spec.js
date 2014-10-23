var Queue = require('../Queue.js');

describe("Queue", function() {
  var queue = new Queue();

  beforeEach(function() {
    queue.clear();
    queue.enqueue(4);
    queue.enqueue(2);
    queue.enqueue(5);
    queue.enqueue(1);
  });

  it('tests enqueue', function() {
    expect(queue.toString()).toEqual([[4,4], [2,2], [5,2], [1,1]]);
  });

  it('tests dequeue', function() {
    expect(queue.dequeue()).toEqual([4,1]);
  });

  it('tests getMin', function() {
    expect(queue.getMin()).toEqual(1);
    queue.clear();
    queue.enqueue(1);
    queue.enqueue(5);
    queue.enqueue(2);
    queue.enqueue(4);
    queue.dequeue();
    console.log(queue.popStack);
    expect(queue.getMin()).toEqual(2);
  });
});