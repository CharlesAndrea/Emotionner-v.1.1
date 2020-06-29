const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.emotions = require("./emotion.model")(sequelize, Sequelize);
db.articles = require("./article.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);
db.motivational_phrases = require("./motivational_phrase.model")(sequelize, Sequelize);
db.tasks = require("./task.model")(sequelize, Sequelize);
db.registered_emotions = require("./registered_emotion.model")(sequelize, Sequelize); 
db.roles = require("../models/role.model.js")(sequelize, Sequelize);


//Associations from here 
//Aricles - Emotions
db.emotions.hasMany(db.articles, {
  as: "articles"
});
db.articles.belongsTo(db.emotions, {
  as: "emotion"
})

//Emotions - Motivational phrases 
db.emotions.hasMany(db.motivational_phrases, {
  as: "motivational_phrases"
});
db.motivational_phrases.belongsTo(db.emotions, {
  as: "emotion"
});

//Users - Tasks
db.users.hasMany(db.tasks, {
  as: "tasks"
});
db.tasks.belongsTo(db.users, {
  as: "user"
});

//Emotions - Users 
/**
 db.users.belongsToMany(db.emotions, {
  through: "registered_emotions",
  as: "emotions",
  foreignKey: "user_id",
  otherKey: "emotion_id"
});

db.emotions.belongsToMany(db.users, {
  through: "registered_emotions",
  as: "users",
  foreignKey: "emotion_id",
  otherKey: "user_id"
});
 */


const registered_emotions = sequelize.define('registered_emotions', {
  id: {
    type: Sequelize.INTEGER(),
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER(),
    allownull: false,
    unique: false
  },
  emotion_id: {
    type: Sequelize.INTEGER(),
    allownull: false,
    unique: false
  },
  description: Sequelize.TEXT()
});

db.users.belongsToMany(db.emotions, {
  through: {
    model: registered_emotions
  },
  as: "emotions",
  foreignKey: "user_id",
  otherKey: "emotion_id"
});

db.emotions.belongsToMany(db.users, {
  through: {
    model: registered_emotions
  },
  as: "users",
  foreignKey: "emotion_id",
  otherKey: "user_id"
});



//Users - roles
db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

module.exports = db;