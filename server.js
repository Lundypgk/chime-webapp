let express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    // passport = require('passport'),
    // mongoose = require('mongoose'),
    config = require('./config/database'),
    expressSession = require('express-session'),
    redis = require("redis"),
    redisStore = require('connect-redis')(expressSession),
    client = redis.createClient(),
    db;

let app = express();

//Import Routes
let login = require('./routes/login'),
    chimerListing = require('./routes/chimer-listing'),
    brandListing = require('./routes/brand-listing');

//Specifies the port number
let port = 3000;

// Passport Authentication
// app.use(passport.initialize());
// app.use(passport.session());

// Express session
app.use(expressSession({
    secret: "asdasd",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 36000000,
        secure: false
    },
    store: new redisStore({ host: 'localhost', port: 5000, client: client, ttl: 260 }),
}));
// let router = express.Router();
// app.use(router);

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

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

client.on('ready', function() {
    console.log("Redis is ready");
});

client.on("error", function(err) {
    console.log("Error " + err);
});
// mongoose.connect(config.database, (err, database) => {
//     if (err) return console.log(err)
//     db = database;
//     console.log(db);
// });

//Make db accessbile to routers;
app.use(function(req, res, next) {
    req.db = db;
    req.client = client;
    // req.session = expressSession;
    // res.locals.session = req.session;
    next();
});

//Routes
// app.use('/login', login);
app.post('/chimer', (req, res, next) => {
    db = req.db;
    db.collection('chimeUser').find({
        Username: req.body.username,
        Password: req.body.password
    }).toArray().then(function(docs) {
        //If there is such user
        if (docs.length >= 1) {
            // req.session[chimerId] = docs[0]._id;
            // req.session.save(function(err) {
            //     if (err)
            //         console.log("error")
            //     else
            //         console.log("success");
            // });
            client.set("chimerId", docs[0]._id.toString());
            // console.log(req.session);
            res.json({
                success: true,
                //objects: docs
            })
        } else {
            res.json({
                success: false,
                //objects: docs
            })
        }
        //db.close()
    });
});

app.use('/chimer-listing', chimerListing);
app.use('/brand-listing', brandListing);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
    console.log(req.session);
});