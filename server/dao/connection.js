var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sql password", /* enter your sql password here */
    database: "task manager"
});

connection.connect(err => {
    if (err) {
        console.log(err);
        return; 
    }
    console.log("We're connected to MySQL");
});

// One function for executing select / insert / update / delete: 
function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            console.log(result)
            resolve(result);
        });
    });
}

function executeWithParameters(sql, parameters) {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            // console.log(result)
            resolve(result);
        });
    });
}


module.exports = {
    execute,
    executeWithParameters
};