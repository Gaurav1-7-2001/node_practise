const express = require('express');
const router =express.Router();

const Person = require('../models/Person');

// add person

router.post('/', async(req,res)=>{
    try {

        const data =req.body; //req.body contain data
        //create new object of Person
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json({ response:response , message:"data saved"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error..."})
    }
})


// get method

router.get('/', async(req,res)=>{
    try {

        const data =await Person.find();
        console.log("data fetch");
        res.status(200).json(data);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
})

// parameterized api

router.get('/:workType', async(req,res)=>{
    try {
        //fetch parameter from url
        const workType =req.params.workType
        if(workType=='chef' || workType=='waiter' || workType=='manager'){

            const response = await Person.find({work :workType});
            console.log("data fetch...");
            res.status(200).json(response);

        }else{
            res.status(404).json({message:" invalid worktype"});
        }        

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error.."})
    }
})

// put method
router.put('/:id',async(req,res)=>{
    try {
        const personId =req.params.id;
        const updatePerson =req.body;

        const response= await Person.findByIdAndUpdate(personId,updatePerson,{
            new :true,
            runValidators:true
        })
        if(!response){
            res.status(404).json({message :" Person not found"})
        }
        console.log( "data updated..");
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:" internal server error"})
    }
})

//delete router

router.delete('/:id',async(req,res)=>{
    try {
        const personId= req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({message :" Person id not found.."});

        } 
        console.log("data deleted..");
        res.status(200).json({message :" data  deleted" , response :response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message :" internal server error"});
    }
})
   

module.exports =router;