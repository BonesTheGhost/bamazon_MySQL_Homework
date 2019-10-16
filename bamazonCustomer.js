var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Iambonesthegh0st",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;

    // run the start function after the connection is made to prompt the user
    start();
    showProducts();
});



function start() {
    console.log("So far so good");
}

//The output of this in this format is horrible. Recommend fixing at a later date if possible.
function showProducts() {
        connection.query("SELECT * FROM products", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
};

//THIS IS NOT FINISHED YET!!! TO-DO!
function promptForBuy() {
    inquirer
      .prompt({
        name: "song",
        type: "input",
        message: "What song would you like to look for?"
      })
      .then(function(answer) {
        console.log(answer.song);
        connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
          console.log(
            "Position: " +
              res[0].position +
              " || Song: " +
              res[0].song +
              " || Artist: " +
              res[0].artist +
              " || Year: " +
              res[0].year
          );
          runSearch();
        });
      });
  }