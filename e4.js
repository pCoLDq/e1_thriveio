Array.prototype.selectionSort = function () {
  for (let i = 0; i < this.length; i++) {
    let j = i;
    for (let k = i; k < this.length; k++) {
      if (this[j] > this[k]) {
        j = k;
      }
    }
    const tmp = this[i];
    this[i] = this[j];
    this[j] = tmp;
  }
  return this;
};
Array.prototype.bubbleSort = function () {
  while (true) {
    let castlings = 0;
    for (let i = 0; i < this.length; i++) {
      if (this[i] > this[i + 1]) {
        const tmp = this[i];
        this[i] = this[i + 1];
        this[i + 1] = tmp;
        castlings++;
      }
    }
    if (castlings == 0) {
      break;
    }
  }
};
Array.prototype.insertionSort = function () {
  for (let i = 1; i < this.length; i++) {
    for (let j = 0; j < i; j++) {
      if (this[i] < this[j]) {
        this.splice(j, 0, this[i]);
        this.splice(i + 1, 1);
      }
    }
  }
};
Array.prototype.mergeSort = function () {
  const merge = (arr = [], left = [], middle = 0, right = [], rem = 0) => {
    let i = 0;
    let j = 0;
    while (i < left.length || j < right.length) {
      if (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          this[i + j] = left[i];
          i++;
        } else {
          this[i + j] = right[j];
          j++;
        }
      } else if (i < left.length) {
        this[i + j] = left[i];
        i++;
      } else if (j < right.length) {
        this[i + j] = right[j];
        j++;
      }
    }
  };
  if (this.length > 1) {
    const middle = Math.floor(this.length / 2);
    const rem = this.length - middle;
    const left = [];
    const right = [];
    for (let i = 0; i < this.length; i++) {
      if (i < middle) {
        left[i] = this[i];
      } else {
        right[i - middle] = this[i];
      }
    }
    mergeSort(left, middle);
    mergeSort(right, rem);
    merge(this, left, middle, right, rem);
  }
  return this;
};
Array.prototype.quickSort = function () {
  if (this.length < 2) {
    return this;
  }

  let ipoint = Math.ceil(this.length / 2);
  let point = this[ipoint];
  let less = [];
  let greater = [];

  for (let i = 0; i < this.length; i++) {
    if (this[i] < this[ipoint]) {
      less.push(this[i]);
    } else {
      if (i == ipoint) {
        continue;
      }
      greater.push(this[i]);
    }
  }
  return quickSort(less).concat(point, quickSort(greater));
};
