const mongoose =require('mongoose');
require('dotenv').config();
// mongo  url

// const mongoUrl=process.env.MONGO_DB_LOCAL;

const mongoUrl= process.env.MONGO_DB || 'mongodb+srv://gaurav:gaurav123@cluster0.18hmwnq.mongodb.net/'
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