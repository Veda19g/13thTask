const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true,default:'admin@abc.com'},
    password: { type: String, required: true ,default: 'Admin' }, // Hashed password
  });

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;