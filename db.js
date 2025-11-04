const mongoose =require('mongoose');

// mongo  url

const mongoUrl='mongodb://localhost:27017/hotels_1';

// setup mongodb connection

mongoose.connect(mongoUrl)

// get default connection

const db= mongoose.connection;

// define event Listner

db.on('connected',()=>{
    console.log("Connected to MongoDB....");
})

db.on('error',(err)=>{
    console.error("error to MongoDB....",err);
})
db.on('disconnected',()=>{
    console.log("DisConnected to MongoDB....");
})

// export mongodb connection

module.exports=db;