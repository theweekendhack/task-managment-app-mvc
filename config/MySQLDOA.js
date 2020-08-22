const mysql = require('mysql2/promise');


const mySQL = 
{

    connection : null,

        init()
        {
            mysql.createConnection
            ({
                 host:process.env.HOST,
                 user: process.env.USER_NAME, 
                 database: process.env.DATABASE,
                 password : process.env.PASSWORD
            })
            .then((con)=>{
                
               this.connection = con;
               
               console.log("Database is up and running!!!!!");
            })
            .catch(err=>console.log(`Error :$error`))


        }



}

module.exports = mySQL