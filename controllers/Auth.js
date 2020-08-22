const express = require('express')
const router = express.Router();

const {loginFormValidaiton} = require("../middleware/validation");


router.post("/login",loginFormValidaiton,(req,res)=>{


    //create session
    req.session.userInfo = req.user;

    if(req.session.userInfo.role=="Admin")
    {
        res.redirect("/admin/dashboard");
    }

    else if(req.session.userInfo.role=="User")
    {
        res.redirect("/user/profile");
    }

})

router.get("/logout",(req,res)=>{
    
    req.session.destroy();
    res.redirect("/");
})




module.exports = router;