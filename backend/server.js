const express= require('express');
const app= express();
require('dotenv').config();
const cors = require('cors');
const conn= require('./dbconn');
const userRoutes = require('./routes/user');
const sendEmail= require('./routes/sendemail')
const confirmSub= require('./routes/confirm')
const Unsub= require('./routes/remove')
conn();

const corsOptions= {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/send-recipes', sendEmail)
app.use('/confirm',confirmSub);
app.use('/unsubscribe', Unsub)


app.post('/api/recipes', (req,res)=>{
 const recipes= req.body;

 res.json({data: recipes})
})


const PORT= process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
})
