const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


function registerStudent(user){
  
}
module.exports = registerStudent; 