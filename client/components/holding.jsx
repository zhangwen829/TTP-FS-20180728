import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { connect } from 'react-redux';
import { fetchHoldingsWithPriceByUserId } from '../stores/holding';

class Holding extends React.Component {
  componentDidMount() {
    this.props.fetchHoldingsWithPriceByUserId('372b28a0-f6bc-11e8-b401-ef551a180680');
  }
  render() {
    const { holdingsWithPrice } = this.props;
    const holdingsWithPrice2 = holdingsWithPrice ? holdingsWithPrice : [];
    console.log(holdingsWithPrice2);
    return (
      <div>
        <h3>Portfolio ($5943.34)</h3>
        holdingsWithPrice2.forEach(holding => (
        <List>
          <ListItem>
            <ListItemText>{holding.symbol}</ListItemText>
            <ListItemText>{holding.shares} shares</ListItemText>
            <ListItemText>{holding.price}</ListItemText>
          </ListItem>
        </List>
        <Divider />
        ))
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