//Import
let express = require('express'),
  request = require('request'),
  router = express.Router();

//Variables
let clientId = 'e32aad0fbd83428da6c89a922eaf260e',
  clientSecret = '4ccd1488aac944549f95e2dff649cb17',
  redirectUrl = "http://localhost:4200/instagram";


router.get("/accessToken", (req, res, next) => {
  let accessToken = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    redirect_uri: redirectUrl,
    code: req.query.code
  };
  request({
    url: "https://api.instagram.com/oauth/access_token",
    method: "POST",
    json: true,
    form: accessToken
  }, function (error, response, body) {
    let responseToken = body.access_token;
    request({
      url: "https://api.instagram.com/v1/users/self/?access_token=" + responseToken,
      method: "GET"
    }, function (error, response, body) {
      res.json(body)
    });
  });
});
module.exports = router;
