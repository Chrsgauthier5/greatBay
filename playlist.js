var mysql = require('mysql');
var dotenv = require('dotenv').config();


var connection = mysql.createConnection({
    host: "localhost",

    // your port; if not 3306 
    port: 3306,

    //your username
    user: "root",

    //your password
    password: process.env.DB_PASSWORD,
    database: "playlists_DB"
});

connection.connect(function(err){
    if (err) throw err;
    console.log('connected!');

    connection.query('SELECT * FROM SONG', function(err, results, fields){
        if (err) throw err;
        // console.log(results);
        for (i=0; i<results.length; i++){
            console.log("Song title: " + results[i].title);
        }
        console.log("Rock & Country Genre:")
        for (i=0; i<results.length; i++){
            if (results[i].genre === 'Rock' || results[i].genre === 'Country'){
                console.log(results[i].title);
            }
        }
    });

    connection.end();
});


function createProduct(){
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            flavor: "Rocky Road",
            price: 3.0,
            quantity: 50
    },
    function (err, res){
        console.log(res.affectedRows + " product inserted!\n")
        //call updateProduct AFTER the INSERT completes
        updateProduct()
    }
    )
}
