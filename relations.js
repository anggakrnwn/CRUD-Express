const User = require('./user');
const Role = require('./role');

User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

async function syncModels() {
  try {
    await Role.sync({ alter: true });
    await User.sync({ alter: true });
    console.log('Model berhasil disinkronkan');
  } catch (error) {
    console.error('Gagal mensinkronkan model:', error);
  }
}

module.exports = { syncModels };