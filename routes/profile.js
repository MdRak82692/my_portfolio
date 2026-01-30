const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/profile
// @desc    Get profile
// @access  Public
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    if (!profile) {
      // Create default profile if none exists
      profile = new Profile({
        name: 'Your Name',
        title: 'Full Stack Developer',
        bio: 'Add your bio here',
        email: 'your@email.com'
      });
      await profile.save();
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PUT /api/profile
// @desc    Update profile
// @access  Private
router.put('/', authMiddleware, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      social: req.body.social ? JSON.parse(req.body.social) : {}
    };

    if (req.files) {
      if (req.files.avatar) {
        updateData.avatar = `/uploads/${req.files.avatar[0].filename}`;
      }
      if (req.files.resume) {
        updateData.resume = `/uploads/${req.files.resume[0].filename}`;
      }
    }

    let profile = await Profile.findOne();
    
    if (!profile) {
      profile = new Profile(updateData);
    } else {
      Object.assign(profile, updateData);
    }

    await profile.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
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
