const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    deadline: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // Admin reference
    assignedToOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'Officer' }, // Officer reference
    assignedToWorker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' }, // Worker reference
    delegationHistory: [
      {
        assignedBy: { type: mongoose.Schema.Types.ObjectId, refPath: 'role' }, // Admin or Officer
        assignedTo: { type: mongoose.Schema.Types.ObjectId, refPath: 'role' }, // Officer or Worker
        role: { type: String, enum: ['Admin', 'Officer', 'Worker'] }
      },
    ],
  });
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;