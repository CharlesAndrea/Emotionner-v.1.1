module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define("article", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(10000), 
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1000), 
            allowNull: false

        },
        author: {
            type: DataTypes.STRING, 
            allowNull: false

        },
        image: {
            type: DataTypes.STRING(700),
            allowNull: true
        },
        premium: {
            type: DataTypes.BOOLEAN, 
            allowNull: false

        }
        
    });
    
    return Article;
  };