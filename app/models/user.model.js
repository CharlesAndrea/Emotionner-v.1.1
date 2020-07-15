module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birthdate: {
        type: DataTypes.DATEONLY
      },
      ocupation: {
        type: DataTypes.STRING
      },
      premium: {
        type: DataTypes.BOOLEAN,
        default : false
      }, 
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    
    return User;
  };