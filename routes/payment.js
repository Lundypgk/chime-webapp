'use strict';
//Import
let express = require('express'),
  router = express.Router();

//Variables
let gateway;

router.get("/client-token", (req, res, next) => {
  gateway = req.gateway;
  gateway.clientToken.generate({}, function (err, response) {
    res.json(response.clientToken);
  });
});

router.post("/checkout", (req, res, next) => {
  gateway = req.gateway;
  let nonceFromClient = req.body.nonce;

  gateway.transaction.sale({
    amount: "10.00",
    paymentMethodNonce: nonceFromClient,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    if (err)
      console.log(err)
    res.json({
      success: true,
      result: result
    })
  });

});



module.exports = router;
