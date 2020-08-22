const User = require("../models/POJO/User.js");
const userModel = require("../models/models/User.js");
const bcryptjs = require("bcryptjs");

exports.userAddFormValidation = (req,res,next)=>{
    
    
    const user = new User();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    user.gender = req.body.gender;


    req.user = user;


    let isError = false;
   
    const errors =
    {
        firstName : null,
        lastName : null,
        gender : null,
        email : null,
        userName: null,
        password :null,
        cPassword :null
    }


    //Basic validation 
    if(user.firstName=="")
    {
        isError=true;
        errors.firstName= "You must enter a first name";
    }

    if(user.lastName=="")
    {
        isError=true;
        errors.lastName= "You must enter a last name";
    }

    if(user.gender==null)
    {
        isError=true;
        errors.gender= "You must enter select a gender";
    }

    if(user.email=="")
    {
        isError=true;
        errors.email= "You must enter an email";
 
    }

    if(user.username=="")
    {
        isError=true;
        errors.username= "You must enter a username";
        
    }

    if(user.password=="")
    {
        isError=true;
        errors.password= "You must enter a password"
        
    }

    if(req.body.cpassword=="")
    {
        isError=true;
        errors.cPassword= "You must confirm your password"
    }

    //there is an error
    if(isError)
    {
        res.render("Admin/addUser",{
            title : "Add User",
            errors,
            user
        })
    }

    //this means no error
    else
    {
      next(); 

    }
    
};

exports.loginFormValidaiton = (req,res,next)=>{

    const user = new User();

    user.email = req.body.email;
    user.password = req.body.password;

    req.user = user;


    let isError = false;
   
    const errors =
    {
   
        email : null,
        password :null,
    }


    //Basic validation 
    if(user.email=="")
    {
        isError=true;
        errors.email= "You must enter an email";
 
    }

    if(user.password=="")
    {
        isError=true;
        errors.password= "You must enter a password"
        
    }

    //there is no error (meaning that a username and password was entered)
    if(!isError)
    {
         userModel.getUserByEmail(user.email)
         .then((u)=>{

            /*if this user  has a value that is not null then it means
            that the email exists
            */
            if(u)
            {
                //check to see if the password is correct
                bcryptjs.compare(req.body.password,u.password)
                .then(val=>{

                    if(val)
                    {
                        req.user = u;
                        next();

                    }
                    //password is incorrect
                    else
                    {
                        errors.password = "Sorry you entered and incorrect email/password"
                        res.render("General/home",{
                            title : "Login",
                            errors
                        })
                    }

                })
                .catch(err=>console.log(`Error ${err}`))
            }

            /*
                email doesnt' exist
            */
            else
            {
                errors.email = null;
                errors.password = "Sorry you entered and incorrect email/password";
                res.render("General/home",{
                    title : "Login",
                    errors
                })
            }

         })
         .catch(err=>console.log(`Error when getting email ${err}`));


    }

    //this errors if the they did enter a username or password
    else
    {  
        
        res.render("General/home",{
            title : "Login",
            errors
        })

    }


};

exports.taskAddFormValidation  =  (req,res,next)=>{

};

exports.uploadFormValidation  =  (req,res,next)=>{



    let isError = false;
    let errors = null;


    if(req.files==null)
    {
        isError=true;
        errors = "You must upload a file";
    }

    else if(!req.files.photo.mimetype.includes("image"))
    {   
            isError=true;
            errors= "You must uplaod an image"
        
    }

    //there is an error
    if(isError)
    {
        res.render("User/uploadPHoto",{
            title : "Upload",
            errors
        })
    }

    //this means no error
    else
    {
      next(); 

    }


};



