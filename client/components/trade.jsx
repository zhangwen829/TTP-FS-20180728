import { TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { buy } from '../store/trade';

class Trade extends React.Component {
  constructor() {
    super();
    this.state = {
      symbol: '',
      qty: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit(evt) {
    evt.preventDefault();
    const symbol = this.state.symbol;
    const shares = Number(this.state.qty);
    this.props.buy(this.props.userId, symbol, shares);
  }

  render() {
    const { cashBal } = this.props;
    return (
      <div className="trade-view">
        <h3>Cash Available: $ {cashBal}</h3>
        <form onSubmit={this.handleSubmit} className="trade-form">
          <TextField
            id="outlined-name"
            label="Symbol"
            name='symbol'
            value={this.state.symbol}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-number"
            label="Qty"
            name="qty"
            value={this.state.qty}
            onChange={this.handleChange}
            type="number"
            margin="normal"
            variant="outlined"
          />
          <button type="submit" className="submit-button">Buy</button>
        </form>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  cashBal: state.user.cashBal,
});

const mapDispatch = dispatch => {
  return {
    buy: (userId, symbol, shares) => dispatch(buy(userId, symbol, shares))
  };
};

export default connect(mapStateToProps, mapDispatch)(Trade);