let express = require('express'),
    router = express.Router(),
    db;

//Login Router for chimer
router.post('/chimer', (req, res, next) => {
    db = req.db;
    let client = req.client;
    db.collection('chimeUser').find({
        Username: req.body.username,
        Password: req.body.password
    }).toArray().then(function(docs) {
        //If there is such user
        if (docs.length >= 1) {
            // req.session[chimerId] = docs[0]._id;
            req.session.id = req.sessionID;
            req.session.save(function(err) {
                if (err)
                    console.log("error")
                else
                    console.log("success");
            });
            console.log(req.session.id)
            console.log(req);
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
        req.session.save();
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



router.get('/test', (req, res, next) => {
    let client = req.client;
    client.keys("sess:*", function(error, keys) {
        res.json({
            activeSession: keys.length,
            results: keys
        })
    });

});

router.get('/test1', (req, res, next) => {
    res.json({
        results: req
    })
});

router.get('/logout', (req, res, next) => {
    let client = req.client;
    console.log(req)
    client.del("lkD1723L-Emydt8dqqircJsYBFU_bU49", function() {
        req.session.destroy(function(err) {
            if (err) return next(err)
            console.log("done");
            res.json({
                result: true
            });
        });
    })
});

module.exports = router;