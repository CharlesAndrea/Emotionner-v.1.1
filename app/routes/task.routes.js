module.exports = app => {
    const tasks = require("../controllers/task.controller");
    var router = require("express").Router();
  
    router.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    app.use('/users', router); 
  
    // Create new task
    router.post("/createTask", tasks.createTask);
    //Get tasks for a user
    router.get("/tasks/:userId", tasks.findTasks);
    // Update a task
    router.put("/updateTask", tasks.updateTask);
    //Get tasks per day 
    router.get("/tasksPerDay/:userId", tasks.tasksPerDay);
  };
  
  