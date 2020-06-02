module.exports = app => {
  const { verifySignUp } = require("../middleware");
  const users = require("../controllers/user.controller");
  const controllers = require("../controllers/auth.controller");
  var router = require("express").Router();
  const { authJWT } = require("../middleware");

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/users', router);

  // Create new user
  //router.post("/createUser", []users.createUser);
  router.post(
    "/createUser",
    [verifySignUp.checkDuplicateEmail]
  )

  router.post(
    controllers.signin
  )

  router.get(
    "/profile",
    [authJWT.verifyToken]
  )

};



  