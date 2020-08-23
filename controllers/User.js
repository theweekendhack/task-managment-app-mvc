const express = require('express')
const router = express.Router();
const auth = require("../middleware/auth.js");
const authorize = require("../middleware/authorization.js");
const  {uploadFormValidation} = require("../middleware/validation.js");
const { v4: uuidv4 } = require('uuid');
const userModel = require("../models/models/User.js");


router.get("/profile",auth,(req,res)=>{

    res.render("User/userDashboard",{
        title:"User Profile Page"
    })
});


router.get("/upload",auth,authorize(["User"]),(req,res)=>{

    res.render("User/uploadPhoto",{
        title:"User Photo Upload"
    })
});

router.post("/upload",auth,authorize(["User"]),uploadFormValidation,(req,res)=>{


    const id = uuidv4();

    const newFileName = `${id}_${req.files.photo.name}`;

    req.files.photo.mv(`public/img/uploads/${newFileName}`)
    .then(()=>{
       
        userModel.uploadPhoto(req.session.userInfo.id,newFileName)
        .then(()=>{

            req.session.userInfo.img_path = newFileName;
            res.redirect("/user/profile")
        })
        .catch(err=>console.log(`Error when upload :${err}`))

       
    })
    .catch(err=>console.log(`Error when uploading file ${err}`))

});


router.get("/password",auth,authorize(["User"]),(req,res)=>{

    res.render("User/changePassword",{
        title:"User Password"
    })
});


router.put("/user/password", auth, authorize(["User"]),(req,res)=>{

    res.send("Task's Edit form")
});




module.exports = router;