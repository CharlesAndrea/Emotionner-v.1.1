module.exports = (sequelize, DataTypes) => {
  const Emotion = sequelize.define("emotion", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  return Emotion;
};