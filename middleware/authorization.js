const authorization = (roles)=>{

    return (req,res,next)=>{


        let isAuthorized = false;
        roles.forEach(role => {
            
            if(req.session.userInfo.role == role ) 
            {   
                isAuthorized = true;
            }
        });


        if(isAuthorized)
        {
            next();
        }

        else
        {

                switch(req.session.userInfo.role)
                {
                    case  "Admin" :
                        res.redirect("/admin/dashboard");
                    break;
                   
                    case  "User" :
                        res.redirect("/user/profile");
                    break;

                }

        }

    }


}

module.exports =  authorization;