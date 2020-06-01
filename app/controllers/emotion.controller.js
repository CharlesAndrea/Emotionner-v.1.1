const db = require("../models");
const Emotion = db.emotions;

//Create a new Emotion 
exports.create = (emotion) => {
  return Emotion.create({
    name: emotion.name
  })
    .then((emotion) => {
      console.log(">> Created Emotion: " + JSON.stringify(emotion, null, 2));
      return emotion;
    })
    .catch((err) => {
      console.log(">> Error while creating Emotion: ", err);
    });
};