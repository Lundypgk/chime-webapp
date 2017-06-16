'use strict';
//Import
let express = require('express'),
  moment = require('moment'),
  router = express.Router(),
  config = require('../config/config'),
  ObjectID = require('mongodb').ObjectID,
  async = require('async'),
  chimerListing = require('../models/chimer-listing'),
  collection = require('../config/constant');

//Variables
let db, jwt;

/******************************************************
Retrieve Chimer Details
*******************************************************/

router.get('/retrieveChimerDetail', (req, res, next) => {
  db = req.db;
  jwt = req.jwt;

  async.waterfall([
    verifyToken,
    retrieveData,
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

  function retrieveData(decoded, callback) {
    let id = new ObjectID(decoded.chimerId)
    db.collection(collection.chimerCollection).find({
      _id: id
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
Retrieve All Listing
*******************************************************/

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
    db.collection(collection.listingCollection).find().toArray().then(function (listing) {
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
Apply for Listing
*******************************************************/

router.post('/applyListing', (req, res, next) => {
  db = req.db;
  jwt = req.jwt;

  async.waterfall([
    verifyToken,
    applyListing,
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

  function applyListing(decoded, callback) {
    let listing = new chimerListing(decoded.chimerId, req.body._id, "InProgress", "", "");
    db.collection(collection.chimerListingCollection).save(listing, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    })
  }
});

/******************************************************
Retrieve In Progress Job
*******************************************************/

router.get('/getCurrentJob', (req, res, next) => {
  db = req.db;
  jwt = req.jwt;
  let data = [],
    response = [];

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

  //Need to rewrite to follow async flow but for now its ok
  function retrieveListing(decoded, callback) {
    db.collection(collection.chimerListingCollection).find({
      chimerId: decoded.chimerId
    }).toArray().then(function (jobs) {
      //Retrieve the list of listingId from the result 
      for (let tempData of jobs) {
        let listingId = new ObjectID(tempData.listingId)
        data.push(listingId)
      }
      db.collection('listing').find({
        _id: {
          $in: data
        }
      }).toArray().then(function (result) {
        for (let tempData of result) {
          for (let tempData2 of jobs) {
            if (tempData._id == tempData2.listingId) {
              tempData.status = tempData2.jobStatus;
              response.push(tempData);
            }
          }
        }
        //If there is any listing
        if (result.length >= 1) {
          callback(null, response);
        } else {
          callback(true);
        }
      })
    });
  }
});

/******************************************************
Update In Progress Job
*******************************************************/

router.put('/updateCurrentJob', (req, res, next) => {
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
    db.collection(collection.chimerListingCollection).update({
      chimerId: decoded.chimerId,
      listingId: req.body._id,
    }, {
      $set: {
        jobStatus: "Approval",
        instaUrl: req.body.url,
        lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a')
      }
    }).then(function (result) {
      callback(null, result)
    })
  }
});


/******************************************************
Update Profile
*******************************************************/

router.put('/updateProfile', (req, res, next) => {
  db = req.db;
  jwt = req.jwt;

  async.waterfall([
    verifyToken,
    updateProfile,
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

  function updateProfile(decoded, callback) {
    let id = new ObjectID(decoded.chimerId)
    console.log(req.body.jwt);
    db.collection(collection.chimerCollection).update({
      _id: id
    }, {
      $set: {
        Email: req.body.Email,
        Street: req.body.Street,
        Postal: req.body.Postal,
        Unit: req.body.Unit,
        Mobile: req.body.Mobile,
        Bank: req.body.Bank,
        lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a')

      }
    }).then(function (result) {
      callback(null, result)
    })
  }
});







module.exports = router;
