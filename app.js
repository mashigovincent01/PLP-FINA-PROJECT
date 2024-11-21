const sequelize = require('./models/db');
const UserRole = require('./models/UserRole');
const User = require('./models/User');
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');
const MedicalRecord = require('./models/MedicalRecord');

// Sync models
sequelize.sync({ alter: true })
    .then(() => console.log('Models synced with the database'))
    .catch(err => console.error('Failed to sync models:', err));
