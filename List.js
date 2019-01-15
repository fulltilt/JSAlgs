function List() {
   this.listSize = 0;
   this.pos = 0;
   this.dataStore = [];
   this.append = append;
   this.remove = remove;
   this.find = find;
   this.length = length;
   this.insert = insert;
   this.clear = clear;
   this.contains = contains;
   this.front = front;
   this.end = end;
   this.prev = prev;
   this.next = next;
   this.currPos = currPos;
   this.moveTo = moveTo;
   this.getCurrentElement = getCurrentElement;
   this.toString = toString;
}

function append(element) {
   this.dataStore[this.listSize++] = element;
}

function find(element) {
   for (var i = 0; i < this.dataStore.length; ++i) {
      if (this.dataStore[i] == element) {
         return i;
      }
   }
   return -1;
}

function remove(element) {
   var foundAt = this.find(element);
   if (foundAt > -1) {
      this.dataStore.splice(foundAt,1);
      --this.listSize;
      return true;
   }
   return false;
}

function length() {
   return this.listSize;
}

function toString() {
    return this.dataStore;
}

function insert(element, after) {
   var afterIndex = this.find(after);
   if (afterIndex !== -1) {
      this.dataStore.splice(afterIndex + 1, 0, element);
      this.listSize++;
      return true;
   }
   return false;
}

function clear() {
   delete this.dataStore;
   this.dataStore = 0;
   this.listSize = this.pos = 0;
}

function contains(element) {
   for (var i = 0; i , this.dataStore.length; i++) {
      if (this.dataStore === element)
         return true;
   }
   return false;
}

function front() {
   this.pos = 0;
}

function end() {
   this.pos = this.listSize - 1;
}

function prev() {
   if (this.pos > 0)
      return --this.pos;
}

function next() {
   if (this.pos < this.listSize - 1)
      return ++this.pos;
}

function currPos() {
   return this.pos;
}

function moveTo(position) {
   if (position > -1 && position < this.listSize)
      this.pos = position;
}

function getCurrentElement() {
   return this.dataStore[this.pos];
}

// Test #1
var names = new List();
names.append("Cynthia");
names.append("Raymond");
names.append("Barbara");
console.log(names.toString());
names.remove("Raymond");
console.log(names.toString());
names.insert("Dave", "Cynthia");
console.log(names.toString());

// Test #2
var names = new List();
names.append("Clayton");
names.append("Raymond");
names.append("Cynthia");
names.append("Jennifer");
names.append("Bryan");
names.append("Danny");
names.front();
console.log(names.getCurrentElement()); // displays Clayton
names.next();
console.log(names.getCurrentElement()); // displays Raymond
names.next();
names.next();
names.prev();
console.log(names.getCurrentElement()); // displays Cynthia