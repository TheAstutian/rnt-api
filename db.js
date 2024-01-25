import mysql from 'mysql2';

export const db= mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.HOST.DATABASE,
    port: process.env.PORT
})
