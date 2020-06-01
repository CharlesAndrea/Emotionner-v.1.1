const db = require("../models");
const Emotion = db.emotions;
const Article = db.articles;

//Create a new Emotion 
exports.create = (emotion) => {
  return Emotion.create({
    name: emotion.name
  })
    .then((emotion) => {
      console.log(">> Created Emotion: " + JSON.stringify(emotion, null, 2));
      return emotion;
    })
    .catch((err) => {
      console.log(">> Error while creating Emotion: ", err);
    });
};

//Find all Emotions
exports.findAll = () => {
  return Emotion.findAll({
    include: [
      {
        model: Article,
        as: "articles",
        attributes: ["id", "title", "content", "description", "author", "premium" ],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((emotions) => {
      return emotions;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Emotions: ", err);
    });
};

//Find an Emotion for a given Emotion id
exports.findById = (id) => {
  return Emotion.findByPk(id, {
    include: [
      {
        model: Article,
        as: "articles",
        attributes: ["id", "title", "content", "description", "author", "premium"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((emotion) => {
      return emotion;
    })
    .catch((err) => {
      console.log(">> Error while finding Emotion: ", err);
    });
};

//Add an Article to an Emotion
exports.addArticle = (emotionId, articleId) => {
  return Emotion.findByPk(emotionId)
    .then((emotion) => {
      if (!emotion) {
        console.log("Emotion not found!");
        return null;
      }
      return Article.findByPk(articleId).then((article) => {
        if (!article) {
          console.log("Article not found!");
          return null;
        }

        emotion.addArticle(article);
        console.log(`>> added Article id=${article.id} to Emotion id=${emotion.id}`);
        return emotion;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Article to Emotion: ", err);
    });
};
