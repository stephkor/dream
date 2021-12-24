const { jsonFile} = require('../csvToJson/csvToJson');
const {input, map} = require('../app')

const getResultAutomationData = (storage) => {
  try {
    const datas = [];
    const result = storage
    result.forEach(ele => {
      let perChunk = 11;
      let data = ele.reduce((resultArray, item, index) => {
        let chunkIndex = Math.floor(index / perChunk);

        if(!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);

        return resultArray;
      }, [])
      datas.push(data);
      return datas;
    })
    return datas;
  } catch(e) {
    throw e;
  }
}

class Hashmap {
  constructor() {
    this._storage = [];
  }

  hashStr(str) {
    let finalHash = 0;
    for (let i = 0; i < str.length; i++) {
      finalHash += finalHash + str.charCodeAt(i)*Math.floor(new Date().getTime());
    }
    return finalHash;
  }

  set(key, val) {
    let idx = this.hashStr(key);
    if (this._storage[idx]=== undefined) {
      this._storage[idx] = [key, val]  
    } else {
      let storageFlag = false;
      for(let i = 0; i < this._storage.length; i++){
        if(this._storage[idx][i][0] === key){
          this._storage[idx][i][1] = val;
          storageFlag = true;
        }
      }
       if(!storageFlag){
         this._storage[idx].push([key,val]);
       }
    } 

  }

  get(val) {
    let idx = this.hashStr(val);

    if (!this._storage[idx]) {
      return undefined;
    }
    for (let keyVal of this._storage[idx]) {
      console.log('디스스토리지',this._storage)
      if (keyVal[0] === 'first_name') {
        return keyVal[1];
      }
    }
  }
}

const m = new Hashmap();

let arr = jsonFile

for(let i = 0; i < arr.length; i++){
  for(let key in arr[i]){//arr[i]
    m.set(key,arr[i][key])
  }
}

const { jsonFile} = require('../csvToJson/csvToJson');
const {input, map} = require('../app')


class Hashmap {
  constructor() {
    this._storage = [];
  }

  hashStr(str) {
    let finalHash = 0;
    for (let i = 0; i < str.length; i++) {
      finalHash += finalHash + str.charCodeAt(i)*Math.floor(new Date().getTime());
    }
    return finalHash;
  }

  set(key, val) {
    let idx = this.hashStr(val);
    if (this._storage[idx]=== undefined) {
      this._storage[idx] = [key, val]  
    } else {
      let storageFlag = false;
      console.log('this.storage length', this._storage.length)
      for(let i = 0; i < this._storage.length; i++){
        if(this._storage[idx][i][0] === key){
          this._storage[idx][i][1] = val;
          storageFlag = true;
        }
      }
       if(!storageFlag){
         this._storage[idx].push([key,val]);
       }
    } 

  }

  get(val) {
    let idx = this.hashStr(val);

    if (!this._storage[idx]) {
      return undefined;
    }

    for (let keyVal of this._storage[idx]) {
      if (keyVal[0] === 'first_name') {
        return keyVal[1];
      }
    }
  }
}

const m = new Hashmap();

let arr = jsonFile

for(let i = 0; i < arr.length; i++){
  for(let key in arr[i]){
    m.set(key,arr[i][key])
  }
}
