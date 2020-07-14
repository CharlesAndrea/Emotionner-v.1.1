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

//Retrieve last emotion
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

//Emotion of the month 
controllers.emotionOfTheMonth = async (req,res) => {
  const userId= req.params.userId;
  const ofTheMonth = await sequelize.query(
    "SELECT MONTH(`createdAt`) AS `month`, `emotion_id` AS `emotion`, COUNT(*) AS `registers` FROM `registered_emotions` WHERE `user_id` = :userId AND MONTH(CURDATE()) = MONTH(`createdAt`) GROUP BY `emotion` ORDER BY `registers` DESC LIMIT 1", 
    { replacements: { userId: userId},
      type: QueryTypes.SELECT
  })
  .then(function(ofTheMonth) {
    return ofTheMonth;
  })
  .catch(error => {
    console.log("error"+error)
    return error;
  })
  res.status(200).json({
    ofTheMonth: ofTheMonth
  });
}

//Emotion counter
controllers.emotionCounter = async (req,res) => {
  const userId = req.params.userId;
  const counter = await sequelize.query(
    "SELECT `emotion_id` AS `emotion`, COUNT(*) AS `counter` FROM `registered_emotions` WHERE `user_id` = :userId GROUP BY 1", 
    { replacements: {userId: userId},
    type: QueryTypes.SELECT
  })
  .then(function(counter) {
    return counter;
  })
  .catch(error => {
    console.log("error"+error)
    return error;
  })
  res.status(200).json({
    counter: counter
  });

}
//Racha más larga de sentirte bien


module.exports = controllers;
