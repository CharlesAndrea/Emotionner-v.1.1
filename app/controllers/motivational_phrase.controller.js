const db = require("../models");
const Phrase = db.motivational_phrases;
const Emotion = db.emotions;
const controllers = {}
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../models");

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
controllers.selectPhrase = async (req,res) => {
  const emotionId = req.params.emotionId;
  const phrase = await sequelize.query(
    "SELECT * FROM `motivational_phrases` WHERE `emotionId` = :emotionId ORDER BY RAND() LIMIT 1", 
    {
      replacements: {emotionId: emotionId},
      type: QueryTypes.SELECT
  })
  .then(function(phrase) {
    return phrase;
  })
  .catch(error => {
    console.log("error"+error)
    return error;
  })
  res.status(200).json({
    phrase: phrase
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



