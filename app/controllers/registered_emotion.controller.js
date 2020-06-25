const db = require("../models");
const Registered_emotion = db.registered_emotions;
const controllers = {};

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


module.exports = controllers;
