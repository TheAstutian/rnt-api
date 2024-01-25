import mysql from 'mysql2';

export const db= mysql.createConnection({
    host:"bb2xhenxgpntgubjbdvi-mysql.services.clever-cloud.com",
    user:"upt8b84uf4lryoim",
    password:"JXet9AkMuWhudiT9csuv",
    database:"bb2xhenxgpntgubjbdvi",
    port: 3306
})


