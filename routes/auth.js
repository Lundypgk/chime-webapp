//Import
let express = require('express'),
  router = express.Router(),
  config = require('../config/config'),
  async = require('async'),
  collection = require('../config/constant');

//Variables  
let db, jwt;

//Login Router for chimer
router.post('/chimer', (req, res, next) => {
  //Retrieve database connection
  db = req.db;

  //Retrieve jwt
  jwt = req.jwt;

  async.waterfall([
    checkUserExist,
    assignToken,
  ], function (err, result) {
    res.statusCode = 200;
    if (err) {
      res.json({
        success: false
      })
    } else {
      res.json({
        success: true,
        jwt: result
      })
    }
  });

  function checkUserExist(callback) {
    db.collection(collection.chimerCollection).find({
      Username: req.body.username,
      Password: req.body.password
    }).toArray().then(function (docs) {
      //If there is such user
      if (docs.length >= 1) {
        callback(null, docs);
      } else {
        //No such user and return to main function
        callback(true);
      }
    })
  }

  function assignToken(result, callback) {
    jwt.sign({
      chimerId: result[0]._id
    }, config.secret, {
      expiresIn: '1h'
    }, function (err, token) {
      if (err) {
        callback(err);
      }
      callback(null, token);
    });
  }
});

//Login Router brand
router.post('/brand', (req, res, next) => {
  //Retrieve database connection
  db = req.db;

  //Retrieve jwt
  jwt = req.jwt;

  async.waterfall([
    checkUserExist,
    assignToken,
  ], function (err, result) {
    res.statusCode = 200;
    if (err) {
      res.json({
        success: false
      })
    } else {
      res.json({
        success: true,
        jwt: result
      })
    }
  });

  function checkUserExist(callback) {
    db.collection(collection.brandCollection).find({
      Username: req.body.username,
      Password: req.body.password
    }).toArray().then(function (docs) {
      //If there is such user
      if (docs.length >= 1) {
        callback(null, docs);
      } else {
        //No such user and return to main function
        callback(true);
      }
    })
  }

  function assignToken(result, callback) {
    jwt.sign({
      brandId: result[0]._id
    }, config.secret, {
      expiresIn: '1h'
    }, function (err, token) {
      if (err) {
        callback(err);
      }
      callback(null, token);
    });
  }
});

router.get('/logout', (req, res, next) => {});

module.exports = router;
