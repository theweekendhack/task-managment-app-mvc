const express = require('express')
const router = express.Router();
const Task = require("../models/POJO/Task.js");
const taskModel = require("../models/models/Task.js");

router.get("/dashboard",(req,res)=>{

    taskModel.getMyTasks(req.session.userInfo.id)
    .then((tasks)=>{
        
        res.render("task/taskDashboard",{
            title : "Task Dashboard",
            tasks
        })

        
    })
    .catch(err=>console.log(`Error ${err}`));





});


router.get("/add",(req,res)=>{

    res.render("task/taskAddForm",{
        title : "Create a Task"
    })
});

router.post("/add",(req,res)=>{


    const task  = new Task();
    task.title = req.body.title;
    task.description = req.body.description;
    task.user = req.session.userInfo.id;

    taskModel.createTasks(task)
    .then(()=>{

        res.redirect("/task/dashboard");
    })
    .catch(err=>console.log(`Error When inserting task :${err}`))



    /*

        1. Get the data from the submitted form


        2. Assign to the task POJO

        3. Insert into the db ()

    */


});


router.get("/edit",(req,res)=>{

    res.render("task/taskEditForm",{
        title : "Edit Task Form"
    })
});



router.delete("/delete/:id", (req,res)=>{

    taskModel.deleteTask(req.params.id)
    .then(()=>{
        res.redirect("/task/dashboard")
    })
    .catch(err=>console.log(`Err ${err}`))

});


router.put("/edit",(req,res)=>{

    console.log("FormSubmitted")
});

router.put("/delete",(req,res)=>{

    res.send("Task's Edit form")
});


module.exports = router;