//Import
let express = require('express'),
  router = express.Router();

//Variables
let clientId = 'e32aad0fbd83428da6c89a922eaf260e',
  redirectUrl = "http://localhost:4200/chimer";

router.get("/authenticate", (req, res, next) => {
  res.redirect("https://api.instagram.com/oauth/authorize/?client_id=" + clientId + "&redirect_uri=" + redirectUrl + "&response_type=code");
});

module.exports = router;
