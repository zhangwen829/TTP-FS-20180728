import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { connect } from 'react-redux';
import { fetchHoldingsWithPriceByUserId } from '../store/holding';

class Holding extends React.Component {
  componentDidMount() {
    this.props.fetchHoldingsWithPriceByUserId('fc946c40-f72b-11e8-bd2e-1f96f6ec4941');
  }
  render() {
    const { holdingsWithPrice } = this.props;
    let portfolioTotal = 0;
    holdingsWithPrice.forEach(holding => { portfolioTotal += holding.shares * holding.price; });
    return (
      <div>
        <h3>Portfolio: $ {Number(portfolioTotal).toFixed(2)}</h3>
        {holdingsWithPrice.map(holding => (
          <div key={holding.symbol}>
            <List>
              <ListItem>
                <ListItemText >{holding.symbol}</ListItemText >
                <ListItemText >{holding.shares} shares</ListItemText >
                <ListItemText >$ {Number(holding.price).toFixed(2)}</ListItemText >
              </ListItem>
            </List>
            <Divider />
          </div>))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  holdingsWithPrice: state.holdings.holdingsWithPrice,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchHoldingsWithPriceByUserId: (userId) => dispatch(fetchHoldingsWithPriceByUserId(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Holding);