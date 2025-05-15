// const mysql = require('mysql');
// ini adalah update menggunakan ORM dari callback based MySQL
const { Sequelize } = require('sequelize');


// const db = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '',
//   database: 'db_express'
// });

const sequelize = new Sequelize('db_express', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false
})

// db.connect((err) => {
//   if (err) {
//     console.error('error connecting:', err);
//     return;
//   }
//   console.log('connected as id ' + db.threadId);
// });

sequelize.authenticate()
.then(() => console.log('database connect'))
.catch(err => console.error('no connect:', err))

module.exports = sequelize;