

const db  = require("../../config/MySQLDOA.js");
const User = require("../POJO/User.js");

const userModel = {

    SQL : "",



    createUsers(user)
    {

        return new Promise((resolve,reject)=>{

            this.SQL = `INSERT INTO user(firstName,lastName,email,password,gender,img_path) VALUES(?,?,?,?,?,?)`;
            db.connection.query(this.SQL, [user.firstName,user.lastName, user.email,user.password,user.gender,"default.jpg"])
            .then(()=>{

                    resolve();
            })
            .catch(err=>reject(err));

        })


    },

    getAllUsers()
    {
       

            return new Promise((resolve,reject)=>{

            this.SQL = `SELECT * FROM user`;
            db.connection.query(this.SQL)
            .then(([rows, fields])=>{

                const users= [];

                rows.forEach(row => {

                    const user = new User();
                    user.firstName = row.firstName;
                    user.lastName = row.lastName;
                    user.email =  row.email;
                    user.id =  row.user_id;
                    user.role = row.role;

                    users.push(user);
                });


                  resolve(users);
            })
            .catch(err=>reject(err));

        })
       
    },

    getUser(userID)
    {
       /*
      return new Promise((resolve,reject)=>{

            this.SQL = `INSERT INTO user(firstName,lastName,email,password,gender,img_path) VALUES(?,?,?,?,?,?)`;
            db.connection.query(this.SQL, [user.firstName,user.lastName, user.email,user.password,user.gender,"default.jpg"])
            .then(()=>{

                    resolve();
            })
            .catch(err=>reject(err));

        })
       */
    },

    getUserByEmail(email)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `SELECT * FROM user where email = ?`;
            db.connection.query(this.SQL,[email])
            .then(([rows, fields])=>{

                let user= null;

                if(rows.length > 0) 
                {
                    user = new User();
                    user.firstName = rows[0].firstName;
                    user.lastName = rows[0].lastName;
                    user.email =  rows[0].email;
                    user.id =  rows[0].user_id;
                    user.role = rows[0].role;
                    user.password= rows[0].password;
                    user.img_path = rows[0].img_path;
                }

                resolve(user);
            })
            .catch(err=>reject(err));

        })
    },

    deleteUser(userID)
    {
     
        
      return new Promise((resolve,reject)=>{

            this.SQL = `DELETE FROM user Where user_id = ?`;
            db.connection.query(this.SQL, [userID])
            .then(()=>{

                resolve();
            })
            .catch(err=>reject(err));

        })
        
        
    },

    uploadPhoto(userID,imgPath)
    {
    
      return new Promise((resolve,reject)=>{

            this.SQL = `UPDATE user SET img_path = ? WHERE user_id = ?`;
            db.connection.query(this.SQL, [imgPath, userID])
            .then(()=>{

                    resolve();
            })
            .catch(err=>reject(err));

        })
        
        
    }


}

module.exports = userModel;