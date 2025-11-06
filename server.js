const express =require('express');
const app=express();

const Person =require('./models/Person')
const passport =require('./auth');
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const db =require('./db');


require('dotenv').config();
const PORT =process.env.PORT || 3000;

// auth

app.use(passport.initialize());
const localAuthMiddleware =passport.authenticate('local',{session:false})

// // practise
// app.use( passport.initialize());
// const authMiddleware=passport.authenticate('local',{session:false});


// middle ware function

const logRequest =(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest);
 app.get('/',localAuthMiddleware,(req,res)=>{
        res.send("welcome to my  veg hotel.....");
    })

// import  person  route
const personRoutes = require('./routes/personRouter');
app.use('/person',localAuthMiddleware, personRoutes);

    app.listen(PORT,()=>{
        console.log("Listening on Port 3000....");
        
    });