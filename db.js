import mysql from 'mysql2';

 const db_config= {
    host:"bb2xhenxgpntgubjbdvi-mysql.services.clever-cloud.com",
    user:"upt8b84uf4lryoim",
    password:"JXet9AkMuWhudiT9csuv",
    database:"bb2xhenxgpntgubjbdvi",
    debug:false,
    connectionLimit: 1,
    supportBigNumbers: true,
    bigNumberStrings: true
}


export var db = mysql.createPool(db_config);

db.getConnection(function(err, connection) {
    // connected! (unless `err` is set) 
    if (err){
        console.log(err);
    }else{
       connection.release(); 
    }
});