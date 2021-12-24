const { jsonFile} = require('../csvToJson/csvToJson');
var HashMap = require('hashmap');

var map = new HashMap();
let result  = []; 


const getJsonArray = () => {
  jsonFile.forEach((person) => {
     result.push(Object.entries(person))
  })
  return result;
}
//Object.entries(jsonFile)
let jsonArray = getJsonArray();
//console.log(jsonArray)

jsonArray.map((person) => {
  map.set(person)
})
console.log('map', map)

let searchResult = map.search('a')
console.log('result',searchResult)
