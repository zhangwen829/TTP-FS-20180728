const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
module.exports = app;

const createApp = () => {
  app.use('/api', require('./api'));

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server =
      app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
};

async function bootApp() {
  await createApp();
  await startListening();
}

if (require.main === module) {
  bootApp();
} else {
  createApp();
}