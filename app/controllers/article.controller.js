const db = require("../models");
const Article = db.articles;
const controllers = {}

//Create new Article
controllers.createArticle = async (req,res) => {
  // data
  const { title, content, description, author, image, premium, emotionid} = req.body;
  // create
  const data = await Article.create({
    title: title,
    content: content,
    description: description,
    author: author,
    image: image,
    premium: premium,
    emotionid: emotionid
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
*/