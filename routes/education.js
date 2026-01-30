const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/education
// @desc    Get all education
// @access  Public
router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ startDate: -1 });
    res.json({
      success: true,
      count: education.length,
      data: education
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   POST /api/education
// @desc    Create education
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();

    res.status(201).json({
      success: true,
      message: 'Education created successfully',
      data: education
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PUT /api/education/:id
// @desc    Update education
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!education) {
      return res.status(404).json({ 
        success: false, 
        message: 'Education not found' 
      });
    }

    res.json({
      success: true,
      message: 'Education updated successfully',
      data: education
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   DELETE /api/education/:id
// @desc    Delete education
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);

    if (!education) {
      return res.status(404).json({ 
        success: false, 
        message: 'Education not found' 
      });
    }

    res.json({
      success: true,
      message: 'Education deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

module.exports = router;
