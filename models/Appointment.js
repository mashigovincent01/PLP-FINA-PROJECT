const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Patient = require('./Patient');
const Doctor = require('./Doctor');

const Appointment = sequelize.define('Appointment', {
    appointment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: 'patient_id',
        },
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Doctor,
            key: 'doctor_id',
        },
    },
    appointment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    appointment_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled'),
        defaultValue: 'Pending',
    },
    reason: {
        type: DataTypes.TEXT,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: 'Appointments',
});

Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id' });

module.exports = Appointment;
