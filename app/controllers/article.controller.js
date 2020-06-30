const db = require("../models");
const Article = db.articles;
const Emotion = db.emotions;
const controllers = {}

//Create new Article
controllers.createArticle = async (req,res) => {
  // data
  const { title, content, description, author, image, premium, emotionId} = req.body;
  // create
  const data = await Article.create({
    title: title,
    content: content,
    description: description,
    author: author,
    image: image,
    premium: premium,
    emotionId: emotionId
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    console.log("Errorazo "+error)
    return error;
  })
  // return res
  res.status(200).json({
    success: true,
    message:"Guardo exitosamente",
    data: data
  });
}

//Find articles for a given emotion 
controllers.findArticles = async (req,res) => {
  const emotion = req.body.emotionId;
  const articles = await Emotion.findByPk(emotion, { include: ["articles"] } )
  .then(function(articles){
    return articles;
  })
  .catch(error => {
    console.log("error"+error)
    return error;
  })
  res.status(200).json({
    articles: articles
  });
}

//Update article
controllers.updateArticle= async (req,res) => {
  const id = req.body.id;
  Article.update(req.body, {
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
      message: "Error updating Article with id=" + id
    });
  });

}

module.exports = controllers;

