const db = require("../models");
const Registered_emotion = db.registered_emotions;
const controllers = {};
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../models");

//Registrate new emotion
controllers.registerEmotion = async (req,res) => { 
  const { user_id, emotion_id, description } = req.body; 

  const data = await Registered_emotion.create({
    user_id: user_id,
    emotion_id: emotion_id,
    description: description
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    console.log("Error"+error)
    return error;
  })
  // return res
  res.status(200).json({
    success: true,
    message:"Guardo exitosamente",
    data: data
  });  
}

//Update register
controllers.updateRegister = async (req,res) => {
  const id = req.body.id;
  Registered_emotion.update(req.body, {
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
      message: "Error updating Register with id=" + id
    });
  });

}

//Find register for a given user 
controllers.findRegisters = async (req,res) => {
  const id = req.params.userId;
  return Registered_emotion.findAll({ where: { user_id: id } })
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

//Query 
/**
  controllers.queryEmotions = async (req,res) => {
  const userId= req.params.userId;
  const emotionId = await sequelize.query(
    "SELECT * FROM `registered_emotions` WHERE  `id`= (SELECT max(`id`) FROM `registered_emotions` WHERE `user_id` = :userId)", 
    { replacements: { userId: userId},
      type: QueryTypes.SELECT
    });
  res.status(200).json({
    success: true,
    message:"Exito",
    emotionId: emotionId
  }); 
}
 */

controllers.queryEmotions = async (req,res) => {
  const userId= req.params.userId;
  const emotion = await sequelize.query(
    "SELECT * FROM `registered_emotions` WHERE  `id`= (SELECT max(`id`) FROM `registered_emotions` WHERE `user_id` = :userId)", 
    { replacements: { userId: userId},
      type: QueryTypes.SELECT
  })
  .then(function(emotion) {
    return emotion;
  })
  .catch(error => {
    console.log("error"+error)
    return error;
  })
  res.status(200).json({
    emotion: emotion
  });
}

module.exports = controllers;
