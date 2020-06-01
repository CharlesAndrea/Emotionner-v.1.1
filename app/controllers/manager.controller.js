const db = require("../models");
const Manager = db.managers;

//Create new Manager
exports.create = (manager) => {
    return Manager.create({
      user: manager.user,
      email: manager.email,
      password: manager.password
    })
      .then((manager) => {
        console.log(">> Created manager");
        return manager;
      })
      .catch((err) => {
        console.log(">> Error while creating Manager: ", err);
      });
  };