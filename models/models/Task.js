
const db  = require("../../config/MySQLDOA.js");
const Task = require("../POJO/Task.js");


const taskModel = {

    SQL : "",

    createTasks(task)
    {

        return new Promise((resolve,reject)=>{

            this.SQL = `INSERT INTO task(title,description,user_id) VALUES(?,?,?)`;
            db.connection.query(this.SQL, [task.title, task.description, task.user])
            .then(()=>{

                    resolve();
            })
            .catch(err=>reject(err));

        })


    },

    getMyTasks(userID)
    {
     
            return new Promise((resolve,reject)=>{

            this.SQL = `SELECT * FROM task WHERE user_id = ?`;
            db.connection.query(this.SQL,[userID])
            .then(([rows, fields])=>{

                const tasks= [];

                rows.forEach(row => {
                    
                    const task = new Task();
                    task.title = row.title;
                    task.description = row.description;
                    task.taskID =  row.task_id;
                    task.user =  row.user_id;
            
                    tasks.push(task);
                });


                  resolve(tasks);
            })
            .catch(err=>reject(err));

        })
       
    },

    deleteTask(taskID)
    {
     
        
      return new Promise((resolve,reject)=>{

            this.SQL = `DELETE FROM task Where task_id = ?`;
            db.connection.query(this.SQL, [taskID])
            .then(()=>{

                resolve();
            })
            .catch(err=>reject(err));

        })
        
        
    }



}

module.exports = taskModel;