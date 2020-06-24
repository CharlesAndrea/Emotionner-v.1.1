const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  //origin: "https://emotionner.web.app",
  "Access-Control-Allow-Credentials": true,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSucessStatus": 204,
}
app.use(cors(corsOptions));

// Configurar cabeceras y cors
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('content-type: application/json; charset=utf-8');
  next();
}

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//routes
require('./app/routes/auth.routes')(app);
require("./app/routes/user.routes")(app);
require("./app/routes/article.routes")(app);
require("./app/routes/task.routes")(app); 
require("./app/routes/registered_emotion.routes")(app); 

const db = require("./app/models");
const Role = db.roles;
const controller = require("./app/controllers/task.controller");
//const run = async () => {};
const run = async() => {
  const amandaData = await controller.findUserById(11);
  console.log(
    "User id:" + 11,
    JSON.stringify(amandaData, null, 2)
  );
};

const initial = async() => {
    Role.create({
      id: 1,
      name: "user"
    });
  
    Role.create({
      id: 2,
      name: "admin"
    });
  
}

//db.sequelize.sync();
db.sequelize.sync().then(() => {
  run();
  //initial();
});
 
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Charles, Dahan, Gonzalez application." });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

