const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { mongoURI, cookieKey } = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(mongoURI, { useNewUrlParser: true }).catch(e => {
  console.log('error: ', e);
});

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({
    hello: 'world',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
