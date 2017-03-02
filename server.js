const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();

const users = require('./routes/users');

//Specifies the port number
const port = 3000;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Body Parser Middleware
app.use(bodyParser.json());

app.use('/users',users);

//Index Route
app.get('/',(req, res) => {
  res.send('Invalid Endpoint');
})


//Start the server
app.listen(port , () => {
  console.log('Server started on port' + port);
})
