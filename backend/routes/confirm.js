const express = require('express');
const app= express()
const router = express.Router();
app.use(express.json());
const jwt= require('jsonwebtoken')

router.post('/', async (req, res) => {
  const { token } = req.body

  if (!token) return res.status(400).json({ error: 'token is Missing' });

  try {
   const decoded= jwt.verify(token, process.env.JWT_SECRET)
   const email= decoded.email;
   
    console.log(`Confirmed unsubscription for ${email}`);
    res.status(200).json({ message: 'Subscribed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;