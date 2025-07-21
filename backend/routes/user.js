const express= require('express');
const User = require('../schemas/schema');
const router= express.Router()

router.post('/', async (req,res)=>{

    try {
    const { sub, name, email, picture } = req.body;

    let user = await User.findOne({ sub });

    if (!user) {
      user = await User.create({ sub, name, email, picture });
    } else {
       res.status(200).json(user);
    }
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports= router