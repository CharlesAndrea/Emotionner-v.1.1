module.exports = app => {
    const article_images = require("../controllers/article_image.controller");
  
    var router = require("express").Router();
  
    // Create new article
    router.post("/", article_images.create);

    app.use('/api/article_images', router);
};