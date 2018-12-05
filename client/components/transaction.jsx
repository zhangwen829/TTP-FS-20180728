import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import Header from './header';
import { connect } from 'react-redux';
import { fetchTradesByUserId } from '../store/trade';

class Transaction extends React.Component {
  componentDidMount() {
    this.props.fetchTradesByUserId(this.props.userId);
  }

  render() {
    const { trades } = this.props;
    return (<div><Header /><div className="main"> <h2>Transaction</h2>
      {trades.map(trade => (
        <div>
          <List>
            <ListItem>
              <ListItemText>{trade.tradeType}({trade.symbol})</ListItemText>
              <ListItemText>- {trade.shares} shares @ ${trade.price}</ListItemText>
            </ListItem>
          </List>
          <Divider />
        </div>)
      )}
    </div>
    </div>);
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  trades: state.trades.tradesByUserId
});

const mapDispatchToProps = dispatch => {
  return {
    fetchTradesByUserId: (userId) => dispatch(fetchTradesByUserId(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);