const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100] 
    }
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    defaultValue: 2  
  }
}, {
  tableName: 'users',
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
      
      if (![1, 2].includes(user.roleId)) {
        user.roleId = 2;
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

User.addHook('beforeValidate', (user) => {
  if (user.roleId && ![1, 2].includes(user.roleId)) {
    throw new Error('Invalid roleId');
  }
});


User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign(
    { 
      id: this.id, 
      roleId: this.roleId,
      name: this.name
    }, 
    process.env.JWT_SECRET || 'your-secret-key', 
    { expiresIn: '1d' }
  );
};

User.prototype.isAdmin = function () {
  return this.roleId === 1;
};

module.exports = User;