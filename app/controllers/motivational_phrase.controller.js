const db = require("../models");
const Phrase = db.motivational_phrases;
const Emotion = db.emotions;
const controllers = {}

//Create new Phrase
controllers.createPhrase = async (req,res) => {
  // data
  const { phrase, emotionId} = req.body;
  // create
  const data = await Phrase.create({
    phrase: phrase,
    emotionId: emotionId
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

//Find phrases for a given emotion 
controllers.findPhrases = async (req,res) => {
  const emotion = req.body.emotionId;
  const motivational_phrases = await Emotion.findByPk(emotion, { include: ["motivational_phrases"] } )
  .then(function(motivational_phrases){
    return motivational_phrases;
  })
  .catch(error => {
    console.log("error"+error)
    return error;
  })
  res.status(200).json({
    motivational_phrases: motivational_phrases
  });
}

//Update phrase
controllers.updatePhrase = async (req,res) => {
  const id = req.body.id;
  Phrase.update(req.body, {
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
      message: "Error updating Phrase with id=" + id
    });
  });

}

module.exports = controllers;



