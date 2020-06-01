module.exports = app => {
    const managers = require("../controllers/manager.controller");
  
    var router = require("express").Router();
  
    // Create new manager
    router.post("/", managers.create);

    app.use('/api/managers', router);
};