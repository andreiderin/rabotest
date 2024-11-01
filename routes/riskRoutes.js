const express = require('express');
const router = express.Router();
const Risk = require('../models/Risk');

// GET all risks
router.get('/risks', async (req, res) => {
  try {
    const risks = await Risk.find();
    const risksWithScores = risks.map(risk => ({
      ...risk._doc,
      inherent: {
        financial: risk.inherent.probability * risk.inherent.financialImpact,
        operational: risk.inherent.probability * risk.inherent.operationalImpact,
        reputational: risk.inherent.probability * risk.inherent.reputationalImpact
      },
      residual: {
        financial: risk.residual.probability * risk.residual.financialImpact,
        operational: risk.residual.probability * risk.residual.operationalImpact,
        reputational: risk.residual.probability * risk.residual.reputationalImpact
      },
      future: {
        financial: risk.future.probability * risk.future.financialImpact,
        operational: risk.future.probability * risk.future.operationalImpact,
        reputational: risk.future.probability * risk.future.reputationalImpact
      }
    }));

    res.status(200).json(risksWithScores);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch risks' });
  }
});

// POST - Create a new risk
router.post('/risks', async (req, res) => {
  try {
    const { riskName, riskID, department, inherent, residual, future, controls, actions } = req.body;

    // Make sure all required fields are present in the request body
    if (!riskName || !department || !inherent || !residual || !future) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new risk
    const newRisk = new Risk({
      riskName,
      riskID,
      department,
      inherent,
      residual,
      future,
      controls,
      actions
    });

    // Save the new risk to the database
    await newRisk.save();
    res.status(201).json(newRisk);
  } catch (error) {
    console.error('Error creating risk:', error);
    res.status(500).json({ error: 'Failed to create risk' });
  }
});

// DELETE - Remove a risk by ID
router.delete('/risks/:id', async (req, res) => {
  try {
    const risk = await Risk.findByIdAndDelete(req.params.id);
    if (!risk) {
      return res.status(404).json({ message: 'Risk not found' });
    }
    res.status(200).json({ message: 'Risk deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete risk', error });
  }
});

// PUT - Update an existing risk by ID
router.put('/risks/:id', async (req, res) => {
  try {
    const updatedRisk = await Risk.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedRisk) {
      return res.status(404).json({ message: 'Risk not found' });
    }
    res.status(200).json(updatedRisk);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update risk', error });
  }
});

module.exports = router;
