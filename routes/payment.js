//Import
let express = require('express'),
  router = express.Router();

//Variables
let gateway;

router.get("/client-token", function (req, res) {
  gateway = req.gateway;
  gateway.clientToken.generate({}, function (err, response) {
    res.json(response.clientToken);
  });
});


module.exports = router;
