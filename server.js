let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  config = require('./config/config'),
  expressSession = require('express-session'),
  morgan = require('morgan'),
  jwt = require('jsonwebtoken'),
  braintree = require("braintree"),
  db;

let app = express();

//Import Routes
let auth = require('./routes/auth'),
  chimerListing = require('./routes/chimer-listing'),
  brandListing = require('./routes/brand-listing'),
  payment = require('./routes/payment');

//Specifies the port number
let port = process.env.PORT || 3000;

//BrainTree Config
let gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "pkvh8jgm74gj35xq",
  publicKey: "37svr9pvrrmkwvv4",
  privateKey: "bd1a7e81d44e005846911f36e271042a"
});


//CORS Middleware
app.use(cors());

// use morgan to log requests to the console
// app.use(morgan('dev'));

//Set Static Folder
// app.use(express.static(path.join(__dirname, 'dist')));
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//Body Parser Middleware
app.use(bodyParser.json());

//MongoDB
let MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.database, (err, database) => {
  if (err) return console.log(err)
  db = database;

  //Start the server only the connection to database is successful
  app.listen(port, () => {
    console.log('Server started on port' + port);
  });
});

//Make db accessbile to routers;
app.use(function (req, res, next) {
  req.db = db;
  req.jwt = jwt;
  req.gateway = gateway;
  next();
});

//Routes
app.use('/auth', auth);
app.use('/chimer-listing', chimerListing);
app.use('/brand-listing', brandListing);
app.use('/payment', payment);

//Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});
