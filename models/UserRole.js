const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const UserRole = sequelize.define('UserRole', {
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    role_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: false,
    tableName: 'UserRoles',
});

module.exports = UserRole;
