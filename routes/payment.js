'use strict';
//Import
let express = require('express'),
  async = require('async'),
  config = require('../config/config'),
  router = express.Router();

//Variables
let gateway, jwt;

router.get("/client-token", (req, res, next) => {
  gateway = req.gateway;
  gateway.clientToken.generate({}, function (err, response) {
    res.json(response.clientToken);
  });
});

router.post("/checkout", (req, res, next) => {
  gateway = req.gateway;
  async.waterfall([
    verifyToken,
    payment,
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
    jwt = req.jwt;
    jwt.verify(req.body.jwt, config.secret, function (err, decoded) {
      if (err) {
        callback(err);
      } else {
        callback(null, decoded);
      }
    });
  };

  function payment(decoded, callback) {
    let nonceFromClient = req.body.nonce;
    gateway.transaction.sale({
      amount: "10.00",
      paymentMethodNonce: nonceFromClient.nonce,
      options: {
        submitForSettlement: true
      },
      customFields: {
        brandid: decoded.brandId
      }
    }, function (err, result) {
      if (err) {
        callback(true)
      } else {
        callback(null, result)
      }
    });
  }
});



module.exports = router;
