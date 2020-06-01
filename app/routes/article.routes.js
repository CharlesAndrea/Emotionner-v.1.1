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

  //get the last article created
  app.get('/lastArticle', function (req, res) {
    connection.query('select * from article order by id DESC limit 1' + req.query.id, function(error, results, fields) {
      if(error) {
        console.log('Error in GET / query')
      } else {
        res.send(results);
      }
    })
  })
  
};