const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(express.static('views/dist'))
app.use('/static', express.static('files'))

const port = 8080

app.listen(port, () => {
  console.log(`listen ${port}`)
})



