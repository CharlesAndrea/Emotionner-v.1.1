module.exports = (sequelize, DataTypes) => {
    const Registered_emotion = sequelize.define("registered_emotion", {
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      registration_date: {
          type: DataTypes.DATE,
          allowNull: false
      }
    });
    
    return Registered_emotion;
  };