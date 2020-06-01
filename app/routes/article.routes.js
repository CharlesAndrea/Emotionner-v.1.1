module.exports = app => {
  const articles = require("../controllers/article.controller");
  var router = require("express").Router();

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/articles', router);

  // Create new article
  router.post("/createArticle", articles.createArticle);
  
};