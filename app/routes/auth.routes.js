const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

/**
 module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

  app.post(
    "/users/signup",
    [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/users/signin", controller.signin);
};
 */

module.exports = app => {
  const users = require("../controllers/user.controller");
  var router = require("express").Router();

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/users', router);
  
  router.post(
    "/signup",
    [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRolesExisted
    ],
    users.signup
  );

  router.post("/signin", users.signin);
  
  
};