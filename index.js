var bodyParser = require('body-parser')
var express = require('express')
var path = require('path')

var index = require('./routes/index')

var PORT = 3000

var app = express()
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json())

app.get('/', index.get)
app.get('/:id', index.getUser)
app.delete('/:id', index.deleteUser)
app.put ('/:id', index.updateUser)
app.post ('/', index.newUser)


app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
