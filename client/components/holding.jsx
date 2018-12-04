import List from '@material-ui/core/List';
import { ListItem, ListItemText, Divider } from '@material-ui/core';
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { fetchHoldingsWithPriceByUserId } from '../store/holding';


const styles = () => ({
  grey: {
    color: '#808080'
  },
  green: {
    color: '#388e3c'
  },
  red: {
    color: '#d50000'
  }
});

class Holding extends React.Component {
  componentDidMount() {
    this.props.fetchHoldingsWithPriceByUserId(this.props.userId);
  }
  render() {
    const { classes, holdingsWithPrice, portfolioTotal } = this.props;
    return (
      <div>
        <h3>Portfolio: ${Number(portfolioTotal).toFixed(2)}</h3>
        {holdingsWithPrice.map((holding) => {
          let color = classes.grey;
          if (holding.change > 0) { color = classes.green; }
          if (holding.change < 0) { color = classes.red; }
          return (
            <div key={holding.symbol}>
              <List>
                <ListItem>
                  <ListItemText >{holding.symbol} - {holding.shares} shares</ListItemText >
                  <ListItemText classes={{ primary: `${color}` }} >${Number(holding.price).toFixed(2)} {holding.change === 0 ? (
                    <ArrowForward />
                  ) : holding.change > 0 ? (
                    <ArrowUpward />
                  ) : (
                        <ArrowDownward />
                      )}</ListItemText >
                </ListItem>
              </List>
              <Divider />
            </div>);
        })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  holdingsWithPrice: state.holdings.holdingsWithPrice,
  portfolioTotal: state.holdings.portfolioTotal
});

const mapDispatchToProps = dispatch => {
  return {
    fetchHoldingsWithPriceByUserId: (userId) => dispatch(fetchHoldingsWithPriceByUserId(userId))
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Holding));
