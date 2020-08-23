const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
require('dotenv').config({path:"config/keys.env"});
const session = require("express-session");
const adminController = require("./controllers/Admin.js");
const generalController = require("./controllers/General.js");
const taskController = require("./controllers/Task.js");
const userController = require("./controllers/User.js");
const authController = require("./controllers/Auth.js");
const mySQL = require("./config/MySQLDOA.js");
const httpProcessing = require("./middleware/HttpProcessing.js");
const fileUpload = require('express-fileupload');

//load controllers
const app = express();


const helper  = exphbs.create({

    helpers:{

        ifEq(a,b, options)
        {
            if(a==b) 
            {
                return options.fn(this)
            }    
            else
            {
                return options.inverse(this)
            }
        }

    }

})

//middleware
app.engine('handlebars',helper.engine);
app.set('view engine', 'handlebars');

//static asset middleware 
app.use(express.static("public")); //makes your static assests (css,js, image)

//body-parser
app.use(bodyParser.urlencoded({ extended: false }))


//map controllers to express 

//localhost:3000/conact-us

app.use(httpProcessing);

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
     cookie: { secure: false }
  }))


app.use(fileUpload());

app.use((req,res,next)=>{

    res.locals.userInfo = req.session.userInfo;
    req.
    next();
})


app.use("/",generalController);
app.use("/admin",adminController);
app.use("/user",userController);
app.use("/auth",authController);
app.use("/task",taskController);


//Web Sever config
app.listen(process.env.PORT,()=>{

    console.log(`Web Server is up and running`);
    mySQL.init();
})

