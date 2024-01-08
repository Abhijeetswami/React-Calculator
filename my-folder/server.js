// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

// User model
const UserSchema = new mongoose.Schema({
username: String,
password: String,
});

const User = mongoose.model('User', UserSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username and password
  User.findOne({ username, password }, (err, user) => {
    if (err) {
      console.error('Error finding user', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      res.status(200).json({ message: 'Login successful' });
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
