const express = require('express')
const router = express.Router();
const Task = require("../models/POJO/Task.js");
const taskModel = require("../models/models/Task.js");
const auth = require("../middleware/auth.js");
const authorization = require("../middleware/authorization.js");

router.get("/dashboard",auth,authorization(["User"]),(req,res)=>{

    taskModel.getMyTasks(req.session.userInfo.id)
    .then((tasks)=>{
        
        res.render("task/taskDashboard",{
            title : "Task Dashboard",
            tasks,
            pageID : "task-dashboard"
        })

        
    })
    .catch(err=>console.log(`Error ${err}`));


});


router.get("/add", auth,authorization(["User"]),(req,res)=>{

    res.render("task/taskAddForm",{
        title : "Create a Task"
    })
});

router.post("/add",auth,authorization(["User"]),(req,res)=>{


    const task  = new Task();
    task.title = req.body.title;
    task.description = req.body.description;
    task.user = req.session.userInfo.id;

    taskModel.createTasks(task)
    .then(()=>{

        res.redirect("/task/dashboard");
    })
    .catch(err=>console.log(`Error When inserting task :${err}`))

});



router.get("/edit/:id",auth,authorization(["User"]),(req,res)=>{


    taskModel.getATask(req.params.id)
    .then((task)=>{
        
        res.render("task/taskEditForm",{
            title : "Edit Task Form",
            task
        })
    })
    .catch(err=>console.log(`Error ${err}`));


});




router.delete("/delete/:id", auth,authorization(["User"]),(req,res)=>{

    taskModel.deleteTask(req.params.id)
    .then(()=>{
        res.redirect("/task/dashboard")
    })
    .catch(err=>console.log(`Err ${err}`))

});


router.put("/edit/:id",auth,authorization(["User"]),(req,res)=>{

    const newTask = new Task();
    newTask.title = req.body.title;
    newTask.description = req.body.description;

    taskModel.updateTask(newTask,req.params.id)
    .then(()=>{
        res.redirect("/task/dashboard");
    })
    .catch(err=>console.log(`Error:${err}`));


});

module.exports = router;