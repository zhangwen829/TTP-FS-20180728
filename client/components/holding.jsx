import List from '@material-ui/core/List';
import { ListItem, ListItemText, Divider } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { fetchHoldingsWithPriceByUserId } from '../store/holding';

class Holding extends React.Component {
  componentDidMount() {
    this.props.fetchHoldingsWithPriceByUserId('60c87910-f752-11e8-ad9a-e58b437b2803');
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