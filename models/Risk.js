const mongoose = require('mongoose');

// Define schema for controls
const controlSchema = new mongoose.Schema({
  number: { type: Number, required: true }, // Auto-increment for each risk
  title: { type: String, required: true },
  details: { type: String, required: true },
  type: { type: String, enum: ['preventative', 'detective'], required: true } // Enum to limit type options
});

// Define schema for actions
const actionSchema = new mongoose.Schema({
  number: { type: Number, required: true }, // Auto-increment for each risk
  title: { type: String, required: true },
  details: { type: String, required: true },
  priority: { type: String, enum: ['low', 'high', 'urgent'], required: true } // Enum to limit priority options
});

// Risk schema
const riskSchema = new mongoose.Schema({
  riskName: { type: String, required: true },
  riskID: { type: String, required: true },
  department: { type: String, required: true },
  inherent: {
    probability: { type: Number, required: true },
    financialImpact: { type: Number, required: true },
    operationalImpact: { type: Number, required: true },
    reputationalImpact: { type: Number, required: true }
  },
  residual: {
    probability: { type: Number, required: true },
    financialImpact: { type: Number, required: true },
    operationalImpact: { type: Number, required: true },
    reputationalImpact: { type: Number, required: true }
  },
  future: {
    probability: { type: Number, required: true },
    financialImpact: { type: Number, required: true },
    operationalImpact: { type: Number, required: true },
    reputationalImpact: { type: Number, required: true }
  },
  // New fields for controls and actions
  controls: [controlSchema],
  actions: [actionSchema]
});

module.exports = mongoose.model('Risk', riskSchema);
