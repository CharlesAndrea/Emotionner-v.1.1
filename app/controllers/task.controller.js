const db = require("../models");
const Task = db.tasks;
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
module.exports = controllers;