module.exports = app => {
  const users = require("../controllers/user.controller");
  var router = require("express").Router();

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/users', router);

  // Create new user
  router.post("/createUser", users.createUser);
};



  