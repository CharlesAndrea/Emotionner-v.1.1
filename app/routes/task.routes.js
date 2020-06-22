module.exports = app => {
    const tasks = require("../controllers/task.controller");
    var router = require("express").Router();
  
    router.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    app.use('/users', router); //Not sure
  
    // Create new user
    router.post("/createTask", tasks.createTask);
    router.get("/getTasks", tasks.findUserById);
  };
  