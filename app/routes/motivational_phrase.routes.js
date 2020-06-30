module.exports = app => {
    const phrases = require("../controllers/motivational_phrase.controller");
    var router = require("express").Router();
  
    router.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    app.use('/phrases', router);
  
    // Create new phrase
    router.post("/createPhrase", phrases.createPhrase);
    //Find phrases for a given emotion
    router.get("/selectPhrase/:emotionId", phrases.selectPhrase);
    //Update phrase
    router.put("/updatePhrase", phrases.updatePhrase);
    //Find all phrases 
    router.get("/findAll", phrases.findAllPhrases);
  };
  