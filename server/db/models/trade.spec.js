const {expect, assert} = require('chai');
const Sequelize = require('sequelize');
const db = require('../index');
const Trade = db.model('trade');
const User = db.model('user');
const Holding = db.model('holding');

describe('Trade model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });
  describe('listTradesByUserId', () => {
    let TEST_USER_ID_1;
    let TEST_USER_ID_2;
    let TEST_TRADE_1;
    let TEST_TRADE_2;
    const NON_EXIST_USER_ID =
        Sequelize.Utils.toDefaultValue(Sequelize.UUIDV1());

    beforeEach(async () => {
      const users = await User.bulkCreate([
        {email: 'abc@gmail.com', password: '12345'},
        {email: 'efg@gmail.com', password: '12345'}
      ]);
      TEST_USER_ID_1 = users[0].id;
      TEST_USER_ID_2 = users[1].id;
      TEST_TRADE_1 = {
        symbol: 'APPL',
        shares: 100,
        price: 180,
        tradeType: 'BUY',
        userId: TEST_USER_ID_1
      };
      TEST_TRADE_2 = {
        symbol: 'GOOG',
        shares: 200,
        price: 1200,
        tradeType: 'SELL',
        userId: TEST_USER_ID_2
      };
      await Trade.bulkCreate([TEST_TRADE_1, TEST_TRADE_2]);
    });

    it('Returns TEST_TRADE_1 when query by TEST_USER_ID_1', async () => {
      const rets = await Trade.listTradesByUserId(TEST_USER_ID_1);
      expect(rets).to.be.an('array').that.to.have.lengthOf(1);
      expect(rets[0].symbol).to.be.equal(TEST_TRADE_1.symbol);
      expect(rets[0].shares).to.be.equal(TEST_TRADE_1.shares);
      expect(rets[0].price).to.be.equal(TEST_TRADE_1.price);
      expect(rets[0].tradeType).to.be.equal(TEST_TRADE_1.tradeType);
      expect(rets[0].userId).to.be.equal(TEST_TRADE_1.userId);
    });

    it('Returns empty when query by NON_EXIST_USER_ID', async () => {
      const rets = await Holding.listHoldingsByUserId(NON_EXIST_USER_ID);
      expect(rets).to.be.an('array').that.is.empty;
    });
  });
  describe('buy', () => {
    const TEST_SYMBOL = 'AAPL';
    const TEST_SHARES = 10;
    const TEST_PRICE = 170;
    it('Buy a non existent symbol', async () => {
      const user = await User.create(
          {email: 'abc@gmail.com', password: '12345', cashBal: 10000});
      await Trade.buy(user.id, TEST_SYMBOL, TEST_SHARES, TEST_PRICE);

      const updatedUser = await User.findByPk(user.id);
      expect(updatedUser.cashBal).to.be.equal(10000 - 10 * 170);

      const trades = await Trade.listTradesByUserId(user.id);
      expect(trades).to.be.an('array').that.to.have.lengthOf(1);
      expect(trades[0].symbol).to.be.equal(TEST_SYMBOL);
      expect(trades[0].shares).to.be.equal(TEST_SHARES);
      expect(trades[0].price).to.be.equal(TEST_PRICE);

      const holdings = await Holding.listHoldingsByUserId(user.id);
      expect(holdings).to.be.an('array').that.to.have.lengthOf(1);
      expect(holdings[0].symbol).to.be.equal(TEST_SYMBOL);
      expect(holdings[0].shares).to.be.equal(TEST_SHARES);
    });

    it('Buy existent symbol', async () => {
      const user = await User.create(
          {email: 'abc@gmail.com', password: '12345', cashBal: 10000});
      await Holding.create({userId: user.id, symbol: TEST_SYMBOL, shares: 5});
      await Trade.buy(user.id, TEST_SYMBOL, TEST_SHARES, TEST_PRICE);
      const holdings = await Holding.listHoldingsByUserId(user.id);
      expect(holdings).to.be.an('array').that.to.have.lengthOf(1);
      expect(holdings[0].symbol).to.be.equal(TEST_SYMBOL);
      expect(holdings[0].shares).to.be.equal(TEST_SHARES + 5);
    });

    // it('Buy without enough cash', async () => {});
    // throw exception
  });
});