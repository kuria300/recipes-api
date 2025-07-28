const express= require('express')
const router= express.Router()
const nodemailer= require('nodemailer')
const jwt = require('jsonwebtoken')

app.use(express.json());

router.post('/', async (req,res)=>{
  const { food, email}= req.body;


  if(!email) return res.status(400).json({error: 'Email is required'})

  const sendrecipes= nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const token= jwt.sign(
     {email},
     process.env.JWT_SECRET,
     {expiresIn:'1d'}
  );


  const mailOptions= {
    from: process.env.EMAIL_USER,
    to: email,
    subject:"Important:confirm your subscription",
    html:`
     <div style="color: #333;">
    <h2>Thanks for signing up!</h2>
    <p>Click the link below to confirm your subscription and you'll be on your way.</p>
    
    <p style="text-align: left; margin:30px 0;">
      <a href="https://recipes-api-2b1h.onrender.com/confirm?token=${token}"
         style="background-color: #ff6600; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
        Confirm your subscription
      </a>
    </p>

    <p>It's good to have you!</p>

    <hr style="margin: 10px 0; border: none; border-top: 1px solid #ddd;" />

    <p style="font-size: 18px; color: #888;">
      <a href="https://recipes-api-2b1h.onrender.com/unsubscribe?token=${token}" style="color: #888;">Unsubscribe</a> |
    </p>
  </div>
    `
  }

    try {
    await sendrecipes.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
})

module.exports= router;