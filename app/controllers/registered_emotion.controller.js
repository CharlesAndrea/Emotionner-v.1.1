const db = require("../models");
const Op = db.Sequelize.Op;
const Registered_emotion = db.registered_emotions;
const controllers = {};

//Registrate new emotion
controllers.registerEmotion = async (req,res) => {
  const user = req.params.userId;  
  const { emotion_id, description } = req.body; 

  const registered = await Registered_emotion.create({
    user_id: user,
    emotion_id: emotion_id,
    description: description
  })
  .then(function(registered){
    return registered;
  })
  .catch(error =>{
    console.log("Error"+error)
    return error;
  })
  // return res
  res.status(200).json({
    success: true,
    message:"Guardo exitosamente",
    registered: registered
  });  
}


controllers.findRegisters = async (req,res) => {
  return Registered_emotion.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error retrieveing data"
      });
    });
}


module.exports = controllers;
