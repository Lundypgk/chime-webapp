let express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    config = require('./config/database'),
    expressSession = require('express-session'),
    db;

let app = express();

//Import Routes
let login = require('./routes/login'),
    chimerListing = require('./routes/chimer-listing'),
    brandListing = require('./routes/brand-listing');

//Specifies the port number
let port = 3000;

//Passport Authentication
app.use(passport.initialize());
app.use(passport.session());

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

    //Start the server only the connection to database is successful
    app.listen(port, () => {
        console.log('Server started on port' + port);
    });
});
// mongoose.connect(config.database, (err, database) => {
//     if (err) return console.log(err)
//     db = database;
//     console.log(db);
// });

//Make db accessbile to routers;
app.use(function(req, res, next) {
    req.db = db;
    next();
});

//Routes
app.use('/login', login);
app.use('/chimer-listing', chimerListing);
app.use('/brand-listing', brandListing);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});