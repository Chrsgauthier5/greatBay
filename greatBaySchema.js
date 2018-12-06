var mysql = require('mysql');
var dotenv = require('dotenv').config();

var dotenv = require('dotenv').config();


var connection = mysql.createConnection({
    host: "localhost",

    // your port; if not 3306 
    port: 3306,

    //your username
    user: "root",

    //your password
    password: process.env.DB_PASSWORD,
    database: "greatBay_DB"
});

connection.connect(function(err){
    if (err) throw err;
    console.log('connected!');
    connection.end();
});