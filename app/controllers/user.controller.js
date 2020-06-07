
const db = require("../models");
const User = db.users;
const controllers = {};



//Create new User
controllers.createUser = async (req,res) => {
  // data
  const { name, lastname, email, birthdate, ocupation, premium, password } = req.body;
  // create
  const data = await User.create({
    name: name,
    lastname: lastname,
    email: email,
    birthdate: birthdate,
    ocupation: ocupation,
    premium: premium,
    password: password
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



