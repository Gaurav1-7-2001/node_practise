    const mongoose=require('mongoose');
    const bcrypt =require('bcrypt');

    const personSchema= new  mongoose.Schema({
        name:{
            type :String,
            required:true
        },
        age :{
            type:Number
        },
        work:{
            
            type:String,
            enum:['chef','waiter','manager'],
            required:true
        },
       mobile: {
        type:Number,
        },
       email: {
            type:String,
            required:true,
            unique:true
        },
        address:{
            type:String,

        },
        salary:{
            type:Number,
            
        },
        username :{
            type :String,
            required :true
        },
        password :{
            type :String,
            required:true
        }
    })

    personSchema.pre('save',async function(next){
        const person =this;
        
        // hash the  password  only if it is modified or new
        if(!person.isModified('password'))return next();
        try {
            // add salt
            const salt =await  bcrypt.genSalt(10);

            // hash password
            const hashPassword = await bcrypt.hash(person.password, salt)

            //override plain pass with hash pass
            person.password =hashPassword;

            next();
        } catch (error) {
            return next(error);
        }
    })

    personSchema.method.comparePassword = async function(candidatePassword){
        try {
            
            const isMatch = await bcrypt.compare(candidatePassword,this.password)
            return isMatch;

        } catch (error) {
            throw(error);
        }
    }



    // practise
    // personSchema.pre('save',async function(next){
    //    const person =this;

    //    if(!person.isModified('password'))return next();
    //     try {
    //        const salt  =await bcrypt.genSalt(10);
    //        const hashPass =await bcrypt.hash(person.password,salt);
    //        person.password =hashPass;
    //     } catch (error) {
    //         return next(error);
    //     }
    // })

    // // we compare the pass again login time

    // personSchema.method.comparePassword =async function(loginPass){
    //     try {
    //         const verify =await bcrypt.compare(loginPass ,this.password);
    //         return verify;
    //     } catch (error) {
    //         throw(error);
    //     }
    // }


    // create model

    const Person = mongoose.model('Person', personSchema);

    module.exports =Person;