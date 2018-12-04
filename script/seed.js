const {userData, holdingData, tradeData} = require('./data');
const db = require('../server/db');
const {User, Holding, Trade} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await Promise.all(userData.map(user => User.create(user)));
  const userId1 = users[0].id;
  const holdings = await Promise.all(
      holdingData(userId1).map(holding => Holding.create(holding)));
  const trades =
      await Promise.all(tradeData(userId1).map(trade => Trade.create(trade)));

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${holdings.length} holdings`);
  console.log(`seeded ${trades.length} holdings`);
  console.log(`seeded successfully`);
}

if (module === require.main) {
  seed()
      .catch(err => {
        console.error(err);
        process.exitCode = 1;
      })
      .then(() => {
        console.log('closing db connection');
        db.close();
        console.log('db connection closed');
      });
  console.log('...');
}

module.exports = seed;