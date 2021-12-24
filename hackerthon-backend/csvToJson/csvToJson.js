
//csv -> json  

function csvToJSON(csv_string){
  const rows = csv_string.split("\r\n");
  const jsonArray = [];
  const header = rows[0].split(",");
  for(let i = 1; i < rows.length; i++){
    let obj = {};
    let row = rows[i].split(",");
    for(let j=0; j < header.length; j++){ 
      obj[header[j]] = row[j]; 
    }
      jsonArray.push(obj);   
  }
 return jsonArray;
}


const fs = require('fs');
const auCsvFile = fs.readFileSync(__dirname+ '/../au-500.csv');
const caCsvFile = fs.readFileSync(__dirname+ '/../ca-500.csv');
const ukCsvFile = fs.readFileSync(__dirname+ '/../uk-500.csv');
const usCsvFile = fs.readFileSync(__dirname+ '/../us-500.csv');

const auJsonFile = csvToJSON(auCsvFile.toString()); 
const caJsonFile = csvToJSON(caCsvFile.toString()); 
const ukJsonFile = csvToJSON(ukCsvFile.toString()); 
const usJsonFile = csvToJSON(usCsvFile.toString()); 



module.exports = { auJsonFile, caJsonFile, ukJsonFile, usJsonFile }




