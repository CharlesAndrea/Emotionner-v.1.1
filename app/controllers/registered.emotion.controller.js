const db = require("../models");
const Registered_emotion = db.registered_emotions;
const controllers = {};

//Registrate new emotion
controllers.registerEmotion = async (req,res) => {
  // data
  const { user_id, emotion_id, description, registration_date } = req.body;
  // create
  const data = await Registered_emotion.create({
    user_id: user_id,
    emotion_id: emotion_id,
    description: description,
    registration_date: registration_date
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
