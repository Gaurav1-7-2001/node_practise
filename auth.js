const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (userName, password, done) => {
    try {
      const user = await Person.findOne({ username: userName });
      if (!user) {
        return done(null, false, { message: " Invalid  username" });
      }
      // const isPasswordMatch = user.password === password ? true : false;
            //  by using bcrypt
      const isPasswordMatch = user.comparePassword(password);

      if (!isPasswordMatch) {
        return done(null, false, { message: " Invalid Password" });
      } else {
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;


// practise 

// passport.use( new LocalStrategy(async(User,Pass,done)=>{
//   try {
    
//     const user = await Person.findOne({username :User});
//     if(!user){
//       return done(null,false,{message :"invalid username"});
//     }
//     const checkPass =user.password === Pass ? true :false;
//     if(!checkPass){
//       return done(null,false,{message :"invalid Pass"})
//     }else{
//       return done(null,user);
//     }

//   } catch (error) {
//     return done(error);
//   }
// }))


