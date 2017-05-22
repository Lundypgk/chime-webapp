//Import
let express = require('express'),
  moment = require('moment'),
  router = express.Router(),
  config = require('../config/config'),
  ObjectID = require('mongodb').ObjectID,
  Listing = require('../models/listing'),
  async = require('async'),
  collection = require('../config/constant');

//Variables
let db, jwt;

/******************************************************
//Retrieve All Listing
******************************************************/

router.get('/getAllListing', (req, res, next) => {
  db = req.db;
  jwt = req.jwt;

  async.waterfall([
    verifyToken,
    retrieveListing,
  ], function (err, result) {
    res.statusCode = 200;
    if (err) {
      res.json({
        success: false,
        error: err
      })
    } else {
      res.json({
        success: true,
        results: result
      })
    }
  });

  function verifyToken(callback) {
    jwt.verify(req.query.jwt, config.secret, function (err, decoded) {
      if (err) {
        callback(err);
      } else {
        callback(null, decoded);
      }
    });
  };

  function retrieveListing(decoded, callback) {
    db.collection(collection.listingCollection).find({
      brandId: decoded.brandId
    }).toArray().then(function (listing) {
      //If there is any listing
      if (listing.length >= 1) {
        callback(null, listing)
      } else {
        callback(true);
      }
    });
  }
});

/******************************************************
//Add Listing Router
*******************************************************/

router.post('/addListing', (req, res, next) => {
  db = req.db;
  jwt = req.jwt;
  let data, body;

  async.waterfall([
    verifyToken,
    addListing,
  ], function (err, result) {
    res.statusCode = 200;
    if (err) {
      res.json({
        success: false,
        error: err
      })
    } else {
      res.json({
        success: true,
        results: result
      })
    }
  });

  function verifyToken(callback) {
    jwt.verify(req.body.jwt, config.secret, function (err, decoded) {
      if (err) {
        callback(err);
      } else {
        callback(null, decoded);
      }
    });
  };

  function addListing(decoded, callback) {
    body = req.body.listing;
    data = new Listing(body.description, body.budget, body.perks, body.requirements, decoded.brandId);
    db.collection(collection.listingCollection).save(data, (err, result) => {
      if (err) {
        callback(err);
      }
      setTimeout(function () {
        callback(null, result);
      }, 2000);

    })
  }
});

/******************************************************
//Get Chimer Details
*******************************************************/

router.get('/getCampaginDetails', (req, res, next) => {
  let tempDataArray = [];
  db = req.db;
  jwt = req.jwt;

  async.waterfall([
    verifyToken,
    retrieveListingDetail,
  ], function (err, result) {
    res.statusCode = 200;
    if (err) {
      res.json({
        success: false,
        error: err
      })
    } else {
      res.json({
        success: true,
        results: result
      })
    }
  });

  function verifyToken(callback) {
    jwt.verify(req.query.jwt, config.secret, function (err, decoded) {
      if (err) {
        callback(err);
      } else {
        callback(null, decoded);
      }
    });
  };

  //Will need to rewrite the code for async flow but it works fine for now
  function retrieveListingDetail(decoded, callback) {
    db.collection(collection.chimerListingCollection).find({
      listingId: req.query.listingId
    }).toArray().then(function (jobs) {
      for (let data of jobs) {
        let id = new ObjectID(data.chimerId)
        db.collection(collection.chimerCollection).findOne({
          _id: id
        }, function (err, result) {
          let temp = {};
          temp.chimerListingId = data._id;
          temp.name = result.FirstName;
          temp.url = data.instaUrl;
          temp.lastUpdated = data.lastUpdated;
          temp.status = data.jobStatus;
          tempDataArray.push(temp);
        })
      }
      setTimeout(function () {
        res.json({
          success: true,
          result: tempDataArray
        });
      }, 2000);
    });

  }
});

/******************************************************
//Update In Progress Job
*******************************************************/

router.put('/updateStatus', (req, res, next) => {
  db = req.db;
  jwt = req.jwt;

  async.waterfall([
    verifyToken,
    updateListing,
  ], function (err, result) {
    res.statusCode = 200;
    if (err) {
      res.json({
        success: false,
        error: err
      })
    } else {
      res.json({
        success: true,
        results: result
      })
    }
  });

  function verifyToken(callback) {
    jwt.verify(req.body.jwt, config.secret, function (err, decoded) {
      if (err) {
        callback(err);
      } else {
        callback(null, decoded);
      }
    });
  };

  function updateListing(decoded, callback) {
    let id = new ObjectID(req.body.data.chimerListingId);
    db.collection(collection.chimerListingCollection).update({
      _id: id
    }, {
      $set: {
        jobStatus: "Completed",
      }
    }).then(function (result) {
      callback(null, result);
    })
  }
});

module.exports = router;
