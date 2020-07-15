const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get(
    "/users/calendar", //ruta del calendario aquí
    [authJwt.verifyToken]
  );

  app.get(
    "/admin", //ruta del dashboard de admin aqui
    [authJwt.verifyToken, authJwt.isAdmin]
  );
};







  