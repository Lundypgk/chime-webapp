let express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    config = require('./config/database'),
    db;

let app = express();

//Import Routes
let login = require('./routes/login'),
    listing = require('./routes/brand-listing');

//Specifies the port number
let port = 3000;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Body Parser Middleware
app.use(bodyParser.json());

//MongoDB
let MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.database, (err, database) => {
    if (err) return console.log(err)
    db = database;
});

//Make db accessbile to routers;
app.use(function(req, res, next) {
    req.db = db;
    next();
});

//Routes
app.use('/login', login);
app.use('/listing', listing);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

//Start the server
app.listen(port, () => {
    console.log('Server started on port' + port);
});