module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'user',
        freezeTableName: false,
        timestamps: false
    });

    User.getUserByID = function (id) {
        return this.findOne({ where: { user_id: id } });
    }

    User.getUserByUsername = function (name, password) {
        return this.findOne({ where: { name: name, password: password } });
    }

    return User;
}