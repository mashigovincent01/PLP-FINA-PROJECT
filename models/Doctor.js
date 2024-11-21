const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./User');

const Doctor = sequelize.define('Doctor', {
    doctor_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    specialization: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    contact_number: {
        type: DataTypes.STRING(20),
    },
    address: {
        type: DataTypes.TEXT,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: 'Doctors',
});

Doctor.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Doctor;
