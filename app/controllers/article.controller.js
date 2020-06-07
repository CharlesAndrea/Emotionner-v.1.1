const db = require("../models");
const Article = db.articles;
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

module.exports = controllers;

