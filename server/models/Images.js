const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define('Images', {
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
            type: DataTypes.STRING(52),
            allowNull: true
        },
        variants: {
            type: DataTypes.STRING(2),
            allowNull: true
        },
        variant_list: {
            type: DataTypes.STRING(3000),
            allowNull: true
        },
        original_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        image_name: {
            type: DataTypes.STRING(60),
            allowNull: true
        },
        image_size: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_date: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_time: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isActive: {
            type: DataTypes.STRING,
            allowNull: true
        },
        create_by: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
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
        tableName: 'image_table',
        freezeTableName: true,
        timestamps: false
    });

    Images.getImageByID = function (id) {
        return this.findOne({ where: { id: id } });
    }

    Images.getByUserID = function (id) {

        // Extra check is needed - subQuery: false
        // user.findAll({
        //     offset: 5, 
        //     limit: 5,
        //     order: [
        //         // Will escape full_name and validate DESC against a list of valid direction parameters
        //         ['full_name', 'DESC']]
        // }).then(function (result) { })

        return this.findAll({ where: { create_by: id } });
    }

    Images.getHistoryByAdmin = function () {
        return this.findAll();
    }

    Images.createHistory = function (Obj) {
        return this.create(Obj);
    }

    Images.deleteHistory = function (id) {
        return this.destroy({ where: { id: id } });
    }

    Images.softDeleteHistory = function (id) {
        return this.update({ isActive: 'false' }, { where: { id: id } });
    }

    return Images;
}