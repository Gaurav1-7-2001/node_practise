const express =require('express');
const app=express();

const Person =require('./models/Person')

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const db =require('./db');



 app.get('/',(req,res)=>{
        res.send("welcome to my  veg hotel.....");
    })

// import  person  route
const personRoutes = require('./routes/personRouter');
app.use('/person', personRoutes);

    app.listen(3000,()=>{
        console.log("Listening on Port 3000....");
        
    });