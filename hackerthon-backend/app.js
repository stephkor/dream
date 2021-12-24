const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {
  auJsonFile,
  caJsonFile,
  ukJsonFile,
  usJsonFile,
} = require('./csvToJson/csvToJson')
const app = express()
const port = 7000
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  cors({
    origin: ['localhost:3000'],
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.send('Hello World')
})

app.get('/au', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.send(auJsonFile) //현재는 au allinfos만 나옴
})

app.get('/ca', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.send(caJsonFile) //현재는 au allinfos만 나옴
})

app.get('/uk', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.send(ukJsonFile) //현재는 au allinfos만 나옴
})

app.get('/us', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.send(usJsonFile) //현재는 au allinfos만 나옴
})

function searchWithInput(input, jsonFile) {
  let result = []
  for (let i = 0; i < jsonFile.length; i++) {
    if (isNaN(input)) {
      if (
        jsonFile[i].first_name.includes(input) ||
        jsonFile[i].last_name.includes(input)
      ) {
        result.push(jsonFile[i].first_name)
        result.push(jsonFile[i].last_name)
      }
    } else {
      if (
        jsonFile[i].phone1.includes(input) ||
        jsonFile[i].phone2.includes(input)
      ) {
        result.push(jsonFile[i].phone1)
        result.push(jsonFile[i].phone2)
      }
    }
  }
  if (result.length > 20) {
    result = result.sort().slice(0, 20)
  }
  console.log(result)
  return result.sort()
}

app.get('/:input/au', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const input = req.params.input
  let result = searchWithInput(input, auJsonFile)
  console.log('length', auJsonFile.length)
  res.status(200).send(result) 
})

app.get('/:input/auca', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const input = req.params.input
  let result = searchWithInput(input, auJsonFile.concat(caJsonFile))
  console.log('length', auJsonFile.concat(caJsonFile).length)
  res.status(200).send(result) 
})

app.get('/:input/aucauk', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const input = req.params.input
  let result = searchWithInput(input, auJsonFile.concat(caJsonFile, ukJsonFile))
  console.log('length', auJsonFile.concat(caJsonFile, ukJsonFile).length)
  res.status(200).send(result) 
})

app.get('/:input/aucaukus', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const input = req.params.input
  let result = searchWithInput(
    input,
    auJsonFile.concat(caJsonFile, ukJsonFile, usJsonFile),
  )
  console.log(
    'length',
    auJsonFile.concat(caJsonFile, ukJsonFile, usJsonFile).length,
  )
  res.status(200).send(result) 
})

app.set('port', port)
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`)
})

module.exports = app
