function Set() {
  this.dataStore = [];
  this.add = add;
  this.remove = remove;
  this.size = size;
  this.union = union;
  this.intersect = intersect;
  this.subset = subset;
  this.difference = difference;
  this.show = show;
  this.clear = clear;
}

function add(item) {
  if (this.dataStore.indexOf(item) === -1) {
    this.dataStore.push(item);
    return true;
  } else {
    return false;
  }
}

function remove(item) {
  var index = this.dataStore.indexOf(item);
  if (index !== -1) {
    this.dataStore.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

function show() {
  return this.dataStore;
}

function size() {
  return this.dataStore.length;
}

function clear() {
  this.dataStore = [];
}

function union(set) {
  for (var i = 0; i < set.size(); i++) {
    if (this.dataStore.indexOf(set.dataStore[i]) === -1) {
      this.add(set.dataStore[i]);
    }
  }
}

function intersect(set) {
  var intersection = new Set();
  for (var i = 0; i < set.size(); i++) {
    if (this.dataStore.indexOf(set.dataStore[i]) !== -1) {
      intersection.add(set.dataStore[i]);
    }
  }

  return intersection;
}

function subset(set) {
  if (set.length > this.size()) {
    return false;
  }

  for (var i = 0; i < set.size(); i++) {
    if (this.dataStore.indexOf(set.dataStore[i]) === -1) {
      return false;
    }
  }
  return true;
}

function difference(set) {
  var set2 = new Set();
  for (var i = 0; i < this.size(); i++) {
    if (set.dataStore.indexOf(this.dataStore[i]) === -1) {
      set2.add(this.dataStore[i]);
    }
  }
  return set2;
}

module.exports = Set;