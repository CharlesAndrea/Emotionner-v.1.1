const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//var whitelist = ["https://emotionner.web.app"]
var corsOptions = {
  origin: "https://emotionner.web.app",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSucessStatus": 204,
  
  /**
   origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", "preflightContinue": false, "optionsSucessStatus": 204,
  "Access-Control-Allow-Credentials": true
   */
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

const db = require("./app/models");
const run = async() => {};

db.sequelize.sync(); 


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Charles, Dahan, Gonzalez application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/article.routes")(app);
require("./app/routes/task.routes")(app); 

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});