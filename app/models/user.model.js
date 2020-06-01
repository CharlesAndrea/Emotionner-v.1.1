module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      ocupation: {
        type: DataTypes.STRING,
        allowNull: false
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