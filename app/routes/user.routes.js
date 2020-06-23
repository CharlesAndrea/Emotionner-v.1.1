const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

 module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Origin", 
      "*",
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  //app.get("/api/test/all", controller.allAccess);

  app.get(
    "/users/calendar", //ruta del calendario aquí
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/admin", //ruta del dashboard de admin aqui
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

/**
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

  //Get all users
  router.get("/findAllUsers", users.findAllUsers);
};
 */

  