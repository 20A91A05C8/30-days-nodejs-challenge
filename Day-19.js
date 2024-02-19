const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/userdatabase')
  .then(() => console.log('connection successful..'))
  .catch(err => console.log('error establishing Connection..', err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {   // Fix: Change validate to an object
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address`
    }
  }
});

const User = new mongoose.model('User', userSchema);

async function addUserWithValidation(user) {
  const newuser = new User(user);
  try {
    const result = await newuser.save();
    console.log('user added successfully:', result);
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
}

// Adding users
addUserWithValidation({ name: 'Luffy', email: 'onepiece@gmail.com' });
addUserWithValidation({ username: 'john_doe', email: 'invalid-email' });

app.listen(3000, () => console.log('Running on port 3000..'));
