module.exports = (sequelize, DataTypes) => {
    const Registered_emotion = sequelize.define("registered_emotion", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allownull: false
      },
      emotion_id: {
        type: DataTypes.INTEGER(11),
        allownull: false

      },
      description: {
        type: DataTypes.TEXT()
      }
    
    });
    
    return Registered_emotion;
  };