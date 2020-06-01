module.exports = (sequelize, DataTypes) => {
    const Motivational_phrase = sequelize.define("motivational_phrase", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      phrase: {
        type: DataTypes.STRING(500),
        allowNull: false
      }
    });
    
    return Motivational_phrase;
  };