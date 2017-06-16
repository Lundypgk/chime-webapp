'use strict';
//Import
let express = require('express'),
  router = express.Router(),
  config = require('../config/config'),
  async = require('async'),
  bcrypt = require('bcrypt'),
  collection = require('../config/constant');

//Variables  
let db, jwt;
//Variable
const saltRounds = 10; // For hashing the password

/******************************************************
Login Router for chimer
******************************************************/
router.post('/chimer', (req, res, next) => {
  //Retrieve database connection
  db = req.db;

  //Retrieve jwt
  jwt = req.jwt;

  async.waterfall([
    checkUserExist,
    comparePassword,
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

  //Just retrieving the user based on the email first
  function checkUserExist(callback) {
    db.collection(collection.chimerCollection).find({
      email: req.body.email,
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

  //Compare the password to see if it matches
  function comparePassword(docs, callback) {
    bcrypt.compare(req.body.password, docs[0].password, function (err, res) {
      if (res) {
        //Password match
        callback(null, docs);
      } else {
        //Password does not match
        callback(true);
      }
    });
  }

  //Password matches and assign token
  function assignToken(result, callback) {
    jwt.sign({
      chimerId: result[0]._id,
      isChimer: true
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

/******************************************************
Login Router brand
******************************************************/

router.post('/brand', (req, res, next) => {
  //Retrieve database connection
  db = req.db;

  //Retrieve jwt
  jwt = req.jwt;

  async.waterfall([
    checkUserExist,
    comparePassword,
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

  //Just retrieving the user based on the email first
  function checkUserExist(callback) {
    db.collection(collection.brandCollection).find({
      email: req.body.email,
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

  //Compare the password to see if it matches
  function comparePassword(docs, callback) {
    bcrypt.compare(req.body.password, docs[0].password, function (err, res) {
      if (res) {
        //Password match
        callback(null, docs);
      } else {
        //Password does not match
        callback(true);
      }
    });
  }

  //Password matches and assign token
  function assignToken(result, callback) {
    jwt.sign({
      brandId: result[0]._id,
      isChimer: false
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

router.post('/isUserLoggedIn', (req, res, next) => {
  //Retrieve jwt
  console.log(req.body);
  jwt = req.jwt;
  jwt.verify(req.body.jwt, config.secret, function (err, decoded) {
    if (err) {
      res.json({
        result: false
      })
    } else {
      res.json({
        result: true,
        isChimer: decoded.isChimer
      })
    }
  });
});

router.get('/logout', (req, res, next) => {});

module.exports = router;
