const { log } = require('console');
var fs =require('fs');
var os =require('os');

var user =os.userInfo();
console.log(user);
console.log(user.username);

// create new file

fs.appendFile('greeting.txt' , ' Hi ' +user.username ,  ()=>
    {
        console.log("file is creaated");
    }
)


    // app.get('/paneer',(req,res)=>{
    //     res.send("sure sir , i would like to serve paneer");
    // })

    // app.get('/dosa',(req,res)=>{

    //     var customized_dosa ={
    //         name:"paneer dosa",
    //         is_sambhar :true,
    //         size:"full",
    //         coconut_chutney:false,
    //     }
    //     res.send(customized_dosa);
    // })
