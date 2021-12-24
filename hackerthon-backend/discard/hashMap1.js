const { jsonFile} = require('../csvToJson/csvToJson');
const {input} = require('../app')

class Hashmap {
  constructor() {
    this._storage = [];
  }

  hashStr(str) {
    let finalHash = 0;
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      finalHash += charCode;
    }
    return finalHash;
  }

  set(key, val) {
    let idx = this.hashStr(key);
    if (!this._storage[idx]) {
      this._storage[idx] = [];
    }
    
    this._storage[idx].push([key, val])
    console.log('this.storage', this._storage)
  }

  get(key) {
    let idx = this.hashStr(key);

    if (!this._storage[idx]) {
      return undefined;
    }

    for (let keyVal of this._storage[idx]) {
      if (keyVal[0] === key) {
        return keyVal[1];
      }
    }
  }
}

const m = new Hashmap();

