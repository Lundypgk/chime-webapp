let express = require('express'),
    router = express.Router(),
    config = require('../config/config'),
    db, jwt;

//Login Router for chimer
router.post('/chimer', (req, res, next) => {
    db = req.db;
    jwt = req.jwt;
    // let client = req.client;
    db.collection('chimeUser').find({
        Username: req.body.username,
        Password: req.body.password
    }).toArray().then(function(docs) {
        //If there is such user
        if (docs.length >= 1) {
            console.log(req.jwt);
            jwt.sign({
                data: 'foobar',
                chimerId: docs[0]._id
            }, config.secret, { expiresIn: '1h' }, function(err, token) {
                if (err)
                    console.log(err)
                res.json({
                    success: true,
                    chimerId: docs[0]._id,
                    jwt: token
                        //objects: docs
                });
            });
            // req.session.chimerId = docs[0]._id;
            // req.session.save(function(err) {
            //         if (err)
            //             console.log(err)
            //             // session saved
            //         res.json({
            //             success: true,
            //             chimerId: docs[0]._id
            //                 //objects: docs
            //         });
            //     })
            // console.log(req.session)

            // client.set("chimerId", docs[0]._id.toString());
            // console.log(req.session);

        } else {
            res.json({
                success: false,
                //objects: docs
            })
        }
        //db.close()
    });
});
// router.post('/chimer', (req, res, next) => {
//     db = req.db;
//     db.collection('chimeUser').find({
//         Username: req.body.username,
//         Password: req.body.password
//     }).toArray().then(function(docs) {
//         req.session.chimer = docs;
//         // res.session.chimer = docs;
//         console.log(req.session);
//         //If there is such user
//         if (docs.length >= 1) {
//             res.json({
//                 success: true,
//                 //objects: docs
//             })
//         } else {
//             res.json({
//                 success: false,
//                 //objects: docs
//             })
//         }
//         //db.close()
//     });
// });

//Login Router brand
router.post('/brand', (req, res, next) => {
    db = req.db;
    db.collection('brand').find({
        Username: req.body.username,
        Password: req.body.password
    }).toArray().then(function(docs) {
        req.session.brand = docs;

        console.log(req.session.brand);
        //If there is such user
        if (docs.length >= 1) {
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



router.post('/test', (req, res, next) => {
    jwt = req.jwt;
    jwt.verify(req.body.token, config.secret, function(err, decoded) {
        res.json({
            result: decoded
        })
    });

});

router.get('/logout', (req, res, next) => {
    // let client = req.client;
    // console.log(req.session)

    // client.del("lkD1723L-Emydt8dqqircJsYBFU_bU49", function() {
    //     req.session.destroy(function(err) {
    //         if (err) return next(err)
    //         console.log("done");
    //         res.json({
    //             result: true
    //         });
    //     });
    // })

    // client.del('VkvI6rLaCRbpSkKPbHAYx2hX91t2ccz8', function(err, response) {
    //     if (response == 1) {
    //         console.log("Deleted Successfully!")
    //     } else {
    //         console.log("Cannot delete")
    //         console.log(err);
    //         console.log(response);
    //     }
    // })
});

module.exports = router;