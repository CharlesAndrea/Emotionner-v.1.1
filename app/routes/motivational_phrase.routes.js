module.exports = app => {
    const motivational_phrases = require("../controllers/motivational_phrase.controller");
  
    var router = require("express").Router();
  
    // Create new motivational phrase
    router.post("/", motivational_phrases.create);

    app.use('/api/motivational_phrases', router);
};