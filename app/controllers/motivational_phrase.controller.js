const db = require("../models");
const Motivational_phrase = db.motivational_phrases;
const Emotion = db.emotions;

//Create phrase
exports.create = (emotionId, motivational_phrase) => {
    return Motivational_phrase.create({
      phrase: motivational_phrase.phrase,
      emotion_id: emotionId
    })
      .then((motivational_phrase) => {
        console.log(">> Created phrase: " );
        return motivational_phrase;
      })
      .catch((err) => {
        console.log(">> Error while creating phrase: ", err);
      });
  };

  //Get phrases for a given emotion
  exports.findEmotionById = (emotionId) => {
    return Emotion.findByPk(emotionId, { include: ["motivational_phrases"] })
      .then((emotion) => {
        return emotion;
      })
      .catch((err) => {
        console.log(">> Error while finding phrases: ", err);
      });
  };

  //Get phrases for a given phrase id
  exports.findMotivationalPhraseById = (id) => {
    return Motivational_phrase.findByPk(id, { include: ["emotion"] })
      .then((motivational_phrase) => {
        return motivational_phrases;
      })
      .catch((err) => {
        console.log(">> Error while finding phrase: ", err);
      });
  };