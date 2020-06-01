module.exports = app => {
    const emotions = require("../controllers/emotion.controller");
  
    var router = require("express").Router();
  
    // Create new emotion
    router.post("/", emotions.create);

    app.use('/api/emotions', router);
};