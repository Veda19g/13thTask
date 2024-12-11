const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], // Task references
    officerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Officer' }, // Officer reference
  });

const Worker = mongoose.model('Worker', WorkerSchema);

module.exports = Worker;