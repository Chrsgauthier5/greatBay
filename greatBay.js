var mysql = require('mysql');
var inquirer = require('inquirer');
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

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected!');
    inquire();
});



function inquire() {
    inquirer.prompt([{
        message: "POST AN ITEM OR BID ON AN ITEM",
        type: "list",
        name: "topics",
        choices: ["POST", "BID", "DO NOTHING"]
    }]).then(answers => {

        if (answers.topics === "POST") {
            itemInformation();

        }
        if (answers.topics === "BID") {
            showItems();
            console.log('show items ran');

        };
    });
}

//-----------------------------------------------------CAPTURE DATA -------------------------------------------------------//
var showItems = function () {
    var query = connection.query("SELECT * FROM AUCTION", function (err, results) {
        for (i = 0; i < results.length; i++) {
            console.log("Item for sale: " + results[i].item + " | " + "Current Price: " + results[i].bid);
        }
        connection.end()

    })
}


var itemInformation = function () {
    var item;
    var price;
    postQuestions()
}

var postQuestions = function () {
    inquirer.prompt([
        {
            message: "What woud you like to Post for sale?",
            type: "input",
            name: "item"
        },
        {
            message: "How much would you like to sell it for?",
            type: "input",
            name: "price"
        }
    ]).then(answers => {

        item = answers.item
        price = answers.price
        postAnItem();
    });
}

function postAnItem() {
    var query = connection.query("insert into greatBay_db.Auction(item, bid) values( ? , ?)", [item, price], function (err, results) {
        if (err) throw (err);
        connection.end()

    });
}