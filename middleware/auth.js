const isAuth= (req,res,next)=>{

    if(req.session.userInfo)
    {
        next();
    }
    else
    {
        res.redirect("/")
    }

}



module.exports = isAuth;