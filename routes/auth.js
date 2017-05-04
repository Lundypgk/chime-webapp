let express = require('express'),
    router = express.Router(),
    config = require('../config/config'),
    db, jwt;

//Login Router for chimer
router.post('/chimer', (req, res, next) => {
    //Retrieve database connection
    db = req.db;

    //Retrieve jwt
    jwt = req.jwt;

    //Check the database for such user based on username and password
    db.collection('chimeUser').find({
        Username: req.body.username,
        Password: req.body.password
    }).toArray().then(function(docs) {
        //If there is such user
        if (docs.length >= 1) {
            //Create jwt with chimerId inside
            jwt.sign({
                chimerId: docs[0]._id
            }, config.secret, { expiresIn: '1h' }, function(err, token) {

                if (err)
                    console.log(err)

                res.json({
                    success: true,
                    jwt: token
                });
            });
        }
        // No such user
        else {
            res.json({
                success: false,
            })
        }
    });
});


//Login Router brand
router.post('/brand', (req, res, next) => {
    //Retrieve database connection
    db = req.db;

    //Retrieve jwt
    jwt = req.jwt;
    db.collection('brand').find({
        Username: req.body.username,
        Password: req.body.password
    }).toArray().then(function(docs) {
        //If there is such user
        if (docs.length >= 1) {
            //Create jwt with chimerId inside
            jwt.sign({
                chimerId: docs[0]._id
            }, config.secret, { expiresIn: '1h' }, function(err, token) {

                if (err)
                    console.log(err)

                res.json({
                    success: true,
                    jwt: token
                });
            });
        }
        // No such user
        else {
            res.json({
                success: false,
            })
        }
    });
});

router.post('/test', (req, res, next) => {
    jwt = req.jwt;
    jwt.verify(req.body.token, config.secret, function(err, decoded) {
        if (err)
            console.log(err)
        else
            res.json({
                result: decoded
            })
    });

});

router.get('/logout', (req, res, next) => {});

module.exports = router;