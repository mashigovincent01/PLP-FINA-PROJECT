const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Patient = require('./Patient');
const Doctor = require('./Doctor');
const Appointment = require('./Appointment');

const MedicalRecord = sequelize.define('MedicalRecord', {
    record_id: {
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
    appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Appointment,
            key: 'appointment_id',
        },
    },
    diagnosis: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    prescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: 'MedicalRecords',
});

MedicalRecord.belongsTo(Patient, { foreignKey: 'patient_id' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctor_id' });
MedicalRecord.belongsTo(Appointment, { foreignKey: 'appointment_id' });

module.exports = MedicalRecord;
