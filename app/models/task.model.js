module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("task", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(5000),
            allowNull: true

        },
        completed: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: true
        },
        start: {
            type: DataTypes.DATEONLY,
            allowNull: false

        },
        end: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: true
        },
        enabled: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    });
    
    return Task;
  };