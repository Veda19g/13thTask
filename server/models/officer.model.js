const mongoose = require('mongoose');
const OfficerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], // Task references
  workers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' }], // Worker references
});
const Officer = mongoose.model('Officer', OfficerSchema);
module.exports = Officer;