const db = require("../models");
const Task = db.tasks;
const User = db.users;
const controllers = {};

//Create new Task
controllers.createTask = async (req,res) => {
  // data
  const { title, description, completed, start, end, time, userId } = req.body;
  // create
  const data = await Task.create({
    title: title,
    description: description,
    completed: completed, 
    start: start,
    end: end,
    time: time, 
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

controllers.findUserById = async (userId) => {
  return User.findByPk(userId, { include: ["tasks"] })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.log("Bye bye", err);
    });
}

controllers.findTasks = async (req,res) => {
  const id = req.params.userId;
  const tasks = await User.findByPk(id, { include: ["tasks"] })
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

module.exports = controllers;

