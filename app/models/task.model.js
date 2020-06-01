module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("task", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(5000),
            allowNull: false

        },
        completed: {
            type: DataTypes.BOOLEAN,
            default : false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false

        },
        time: {
            type: DataTypes.TIME
        }
        
    });
    
    return Task;
  };