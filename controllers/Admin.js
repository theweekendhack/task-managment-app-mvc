const express = require('express')
const router = express.Router();
const bcryptjs = require("bcryptjs");

const userModel = require("../models/models/User.js");
const User = require("../models/POJO/User.js");
const {userAddFormValidation} = require("../middleware/validation.js");
const auth = require("../middleware/auth.js");
const authorize  = require("../middleware/authorization.js");


router.get("/dashboard",auth,authorize(["Admin"]),(req,res)=>{


    userModel.getAllUsers()
    .then((users)=>{


        res.render("Admin/adminDashboard",{
            title: "Admin Dashboard",
            users
        })
    })
    .catch(err=>console.log(`Error with usrs ${users}`));
 
});


router.get("/adduser",authorize(["Admin"]),(req,res)=>{

    res.render("Admin/addUser",{
        title: "Create a User"
    })
});

router.post("/adduser",auth, authorize(["Admin"]),userAddFormValidation,(req,res)=>{


    bcryptjs.genSalt(10)
    .then((salt)=> bcryptjs.hash(req.user.password,salt))
    .then((encryptPassword)=>{

        req.user.password = encryptPassword;

        userModel.createUsers(req.user)
        .then(()=>{
    
            res.redirect("/admin/dashboard")
        })
        .catch(err=>console.log(`Error when create :${err}`))

    })
    .catch(err=>console.log(`Error ${err}`));


 
});



//basedomain.com/admin/delete/:id

//basedomain.com/admin/delete/24


//basedomain.com/admin/delete/:id
router.delete("/delete/:id",auth, authorize(["Admin"]), (req,res)=>{

    userModel.deleteUser(req.params.id)
    .then(()=>{
        res.redirect("/admin/dashboard")
    })
    .catch(err=>console.log(`Err ${err}`))


    

});



module.exports = router;