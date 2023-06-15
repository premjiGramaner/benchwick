const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define('Images', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(52),
            allowNull: true
        },
        varients: {
            type: DataTypes.STRING(2),
            allowNull: true
        },
        varient_list: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        original_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        thumb_url: {
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
        create_by: {
            type: DataTypes.INTEGER,
            references:  {
                model: 'user',
                key: 'id'
            }
        },
        created_on: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('created_on')).format('DD/MM/YYYY h:mm:ss');
            }
        },
        updated_on: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updated_on')).format('DD/MM/YYYY h:mm:ss');
            }
        }
    }, {
        tableName: 'image_table',
        freezeTableName: true,
        timestamps: false
    });

    Images.getImageByID = function (id) {
        return this.findOne({ where: { id: id } });
    }

    return Images;
}