const express = require('express');
const router = express.Router();

//Register Router
router.get('/register',(req,res,next) => {
  res.send('Register');
});

module.exports = router;
