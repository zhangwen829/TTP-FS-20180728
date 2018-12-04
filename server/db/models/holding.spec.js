const {expect} = require('chai');
const Sequelize = require('sequelize');
const db = require('../index');
const Holding = db.model('holding');
const User = db.model('user');


describe('Holding model', () => {
  beforeEach(() => { return db.sync({force: true}); });
  describe('listHoldingsByUserId', () => {
    let TEST_USER_ID_1;
    let TEST_USER_ID_2;
    let TEST_HOLDING_1;
    let TEST_HOLDING_2;
    const NON_EXIST_USER_ID =
        Sequelize.Utils.toDefaultValue(Sequelize.UUIDV1());

    beforeEach(async() => {
      const users = await User.bulkCreate([
        {email: 'abc@gmail.com', password: '12345'},
        {email: 'efg@gmail.com', password: '12345'}
      ]);
      TEST_USER_ID_1 = users[0].id;
      TEST_USER_ID_2 = users[1].id;
      TEST_HOLDING_1 = {symbol: 'APPL', shares: 100, userId: TEST_USER_ID_1};
      TEST_HOLDING_2 = {symbol: 'GOOG', shares: 200, userId: TEST_USER_ID_2};
      await Holding.bulkCreate([TEST_HOLDING_1, TEST_HOLDING_2]);
    });

    it('Returns TEST_HOLDING_1 when query by TEST_USER_ID_1', async() => {
      const rets = await Holding.listHoldingsByUserId(TEST_USER_ID_1);
      expect(rets).to.be.an('array').that.to.have.lengthOf(1);
    });

    it('Returns empty when query by NON_EXIST_USER_ID', async() => {
      const rets = await Holding.listHoldingsByUserId(NON_EXIST_USER_ID);
      expect(rets).to.be.an('array').that.is.empty;
    });
  });
});