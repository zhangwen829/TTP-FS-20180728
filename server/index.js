const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({db});
module.exports = app;

// passport registration
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(
    (id, done) =>
        db.models.user.findByPk(id).then(user => done(null, user)).catch(done));

const createApp = () => {
  // body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // compression middleware
  app.use(compression());

  app.use(session({
    secret: process.env.SESSION_SECRET || 'I love coding',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
};

const syncDb = () => db.sync();

if (require.main === module) {
  sessionStore.sync().then(syncDb).then(createApp).then(startListening);
} else {
  createApp();
}