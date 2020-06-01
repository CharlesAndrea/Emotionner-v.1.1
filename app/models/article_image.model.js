module.exports = (sequelize, DataTypes) => {
    const Article_image = sequelize.define("article_image", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      image: {
        type: DataTypes.BLOB,
        allowNull: false
      }
    });
  
    return Article_image;
  };