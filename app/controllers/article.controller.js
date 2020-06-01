const db = require("../models");
const Article = db.articles;
const Emotion = db.emotions;
const controllers = {}

//Create new Article
controllers.createArticle = async (req,res) => {
  // data
  const { title, content, description, author, premium} = req.body;
  // create
  const data = await Article.create({
    title: title,
    content: content,
    description: description,
    author: author,
    premium: premium
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

module.exports = controllers;


/*
//Create a new Article 
exports.create = (article) => {
  return Article.create({
    title: article.title,
    content: article.content,
    description: article.description,
    author: article.author,
    premium: article.premium
  })
    .then((article) => {
      console.log(">> Created Aticle: " );
      return article;
    })
    .catch((err) => {
      console.log(">> Error while creating Article: ", err);
    });
};

//Find all Articles
exports.findAll = () => {
  return Article.findAll({
    include: [
      {
        model: Emotion,
        as: "emotions",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((articles) => {
      return articles;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Articles: ", err);
    });
};

//Find an Article for a given Article id
exports.findById = (id) => {
  return Article.findByPk(id, {
    include: [
      {
        model: Emotion,
        as: "emotions",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((article) => {
      return article;
    })
    .catch((err) => {
      console.log(">> Error while finding Article: ", err);
    });
};
*/

//Add an Emotion to an Article
exports.addEmotion = (articleId, emotionId) => {
  return Article.findByPk(articleId)
    .then((article) => {
      if (!article) {
        console.log("Article not found!");
        return null;
      }
      return Emotion.findByPk(emotionId).then((emotion) => {
        if (!emotion) {
          console.log("Emotion not found!");
          return null;
        }

        article.addEmotion(emotion);
        console.log(`>> added Emotion id=${emotion.id} to Article id=${article.id}`);
        return article;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Emotion to Article: ", err);
    });
};






