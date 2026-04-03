const express = require('express');
const OutPass = require('../models/OutPass');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/create', auth, async (req, res) => {
  try {
    const { date, time, reason } = req.body;

    if (!date || !time || !reason) {
      return res.status(400).json({ message: 'Please provide date, time, and reason' });
    }

    const outPass = await OutPass.create({
      userId: req.user.id,
      date,
      time,
      reason
    });

    res.status(201).json({
      success: true,
      outPass
    });
  } catch (error) {
    console.error('Create out-pass error:', error.message);
    res.status(500).json({ message: 'Server error while creating out-pass' });
  }
});

router.get('/my', auth, async (req, res) => {
  try {
    const outPasses = await OutPass.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      outPasses
    });
  } catch (error) {
    console.error('Get my out-passes error:', error.message);
    res.status(500).json({ message: 'Server error while fetching out-passes' });
  }
});

router.get('/all', auth, adminAuth, async (req, res) => {
  try {
    const outPasses = await OutPass.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      outPasses
    });
  } catch (error) {
    console.error('Get all out-passes error:', error.message);
    res.status(500).json({ message: 'Server error while fetching out-passes' });
  }
});

router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Approved or Rejected' });
    }

    const outPass = await OutPass.findById(req.params.id);

    if (!outPass) {
      return res.status(404).json({ message: 'Out-pass not found' });
    }

    outPass.status = status;
    await outPass.save();

    res.json({
      success: true,
      outPass
    });
  } catch (error) {
    console.error('Update out-pass error:', error.message);
    res.status(500).json({ message: 'Server error while updating out-pass' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const outPass = await OutPass.findById(req.params.id);

    if (!outPass) {
      return res.status(404).json({ message: 'Out-pass not found' });
    }

    if (req.user.role !== 'admin' && outPass.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      success: true,
      outPass
    });
  } catch (error) {
    console.error('Get out-pass error:', error.message);
    res.status(500).json({ message: 'Server error while fetching out-pass' });
  }
});

module.exports = router;
