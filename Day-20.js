const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get('/average-age', async (req, res) => {
  try {
    const averageAge = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: '$age' }
        }
      }
    ]);
    const result = averageAge.length > 0 ? averageAge[0].averageAge : 0;

    res.json({ averageAge: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
