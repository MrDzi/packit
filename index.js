const express = require('express');
const mongoose = require('mongoose');
const { mongoURI } = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(mongoURI);

const app = express();

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({
    test: 1,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
