module.exports = app => {
  const users = require("../controllers/user.controller");
  
  var router = require("express").Router();

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('content-type: application/json; charset=utf-8');
    });
    app.use('/users', router);

    // Create new user
    router.post("/createUser", users.createUser);

};



  