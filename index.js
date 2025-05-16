require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./user');
const { syncModels } = require('./relations');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

syncModels();

app.post('/register', authMiddleware.optional, async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    let finalRoleId = 2;
    if (req.user && req.user.roleId === 1) {
      finalRoleId = roleId || 2;
    }

    const user = await User.create({ name, email, password, roleId: finalRoleId });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      token: user.generateToken()
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }
    
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: user.generateToken()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use(authMiddleware);

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'user not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'user not found' });
    
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'user not found' });
    
    await user.destroy();
    res.json({ message: 'user deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`server berjalan di http://localhost:${PORT}`);
});