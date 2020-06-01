const db = require("../models");
const Task = db.tasks;

//Create a new Emotion 
exports.create = (task) => {
  return Task.create({
    description: task.description, 
    completed: task.completed,
    date: task.date,
    time: task.time
  })
    .then((task) => {
      console.log(">> Created Task: " );
      return task;
    })
    .catch((err) => {
      console.log(">> Error while creating Task: ", err);
    });
};