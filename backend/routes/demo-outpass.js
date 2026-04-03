const express = require('express');
const DemoOutPass = require('../models/DemoOutPass');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminAuth = (req, res, next) => {
  // For demo, we'll check if user is admin by looking at the demo users
  if (req.user.id === 'admin123') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Admin role required.' });
};

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { date, time, reason } = req.body;

    if (!date || !time || !reason) {
      return res.status(400).json({ message: 'Please provide date, time, and reason' });
    }

    const outPass = await DemoOutPass.create({
      userId: req.user.id,
      date,
      time,
      reason
    });

    const populatedOutPass = await DemoOutPass.populate(outPass);

    res.status(201).json({
      success: true,
      outPass: populatedOutPass
    });
  } catch (error) {
    console.error('Create out-pass error:', error.message);
    res.status(500).json({ message: 'Server error while creating out-pass' });
  }
});

router.get('/my', authMiddleware, async (req, res) => {
  try {
    const outPasses = await DemoOutPass.find({ userId: req.user.id });
    
    res.json({
      success: true,
      outPasses
    });
  } catch (error) {
    console.error('Get my out-passes error:', error.message);
    res.status(500).json({ message: 'Server error while fetching out-passes' });
  }
});

router.get('/all', authMiddleware, adminAuth, async (req, res) => {
  try {
    const outPasses = await DemoOutPass.find({});
    const populatedOutPasses = await Promise.all(
      outPasses.map((outPass) => DemoOutPass.populate(outPass))
    );
    
    res.json({
      success: true,
      outPasses: populatedOutPasses
    });
  } catch (error) {
    console.error('Get all out-passes error:', error.message);
    res.status(500).json({ message: 'Server error while fetching out-passes' });
  }
});

router.put('/:id', authMiddleware, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Approved or Rejected' });
    }

    const outPass = await DemoOutPass.findById(req.params.id);

    if (!outPass) {
      return res.status(404).json({ message: 'Out-pass not found' });
    }

    const updatedOutPass = await DemoOutPass.findByIdAndUpdate(req.params.id, { status });

    res.json({
      success: true,
      outPass: updatedOutPass
    });
  } catch (error) {
    console.error('Update out-pass error:', error.message);
    res.status(500).json({ message: 'Server error while updating out-pass' });
  }
});

module.exports = router;
