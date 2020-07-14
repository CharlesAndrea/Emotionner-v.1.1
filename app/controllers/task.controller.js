const db = require("../models");
const Task = db.tasks;
const User = db.users;
const controllers = {};
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../models");

//Create new Task
controllers.createTask = async (req,res) => {
  // data
  const { title, description, completed, start, end, time, enabled, userId } = req.body;
  // create
  const data = await Task.create({
    title: title,
    description: description,
    completed: completed, 
    start: start,
    end: end,
    time: time, 
    enabled: enabled,
    userId: userId
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    console.log("Errorazo "+error)
    return error;
  })
  // return res
  res.status(200).json({
    success: true,
    message:"Guardo exitosamente",
    data: data
  });
}

//Find tasks for a given user
controllers.findTasks = async (req,res) => {
  const id = req.params.userId;
  const tasks = await User.findByPk(id, { include: ["tasks"] } )
  .then(function(tasks){
    return tasks;
  })
  .catch(error => {
    console.log("error"+error)
    return error;
  })
  res.status(200).json({
    tasks: tasks
  });
}

//Update task
controllers.updateTask = async (req,res) => {
  const id = req.body.id;
  Task.update(req.body, {
    where: {id: id}
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Task with id=" + id
    });
  });

}

//Tareas logradas por día  (grafica de líneas que diga Lunes lograste tanto)
controllers.tasksPerDay = async (req,res) => {
  const userId= req.params.userId;
  const tasksPerDay = await sequelize.query(
    "SELECT DATE(`updatedAt`) as `date`, COUNT(*) as `count` FROM `tasks` WHERE `userId` = :userId AND `completed` = 1 GROUP BY 1", 
    { replacements: { userId: userId},
      type: QueryTypes.SELECT
  })
  .then(function(tasksPerDay) {
    return tasksPerDay;
  })
  .catch(error => {
    console.log("error"+error)
    return error;
  })
  res.status(200).json({
    tasksPerDay: tasksPerDay
  });
}
module.exports = controllers;

