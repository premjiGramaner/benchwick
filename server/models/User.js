const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        identifier: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.STRING, // pre defined - admin, user
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'user',
        freezeTableName: false,
        timestamps: false
    });

    User.getUserByUserEmail = function (email) {
        return this.findOne({ where: { email } });
    }

    User.createUser = function (Obj) {
        return this.create(Obj);
    }

    User.updateUser = function (id, password) {
        return this.update({ password: password }, { where: { id } });
    }

    return User;
}