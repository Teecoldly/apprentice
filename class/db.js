const mysql  = require('mysql')
module.exports = mysql.createConnection({
    host: "192.168.64.2",
    user: "project",
    password: "project",
    database: 'corres_system'
})
 
