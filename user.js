const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

sequelize.sync()
  .then(() => console.log('tabel users dibuat atau sudah ada'))
  .catch(err => console.error('gagal sync:', err));


module.exports = User;