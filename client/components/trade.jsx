import { TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { buy } from '../store/trade';

class Trade extends React.Component {
  constructor() {
    super();
    this.state = {
      symbol: '',
      qty: '',
      qtyErr: ''
    };
    this.symbolHandleChange = this.symbolHandleChange.bind(this);
    this.qtyHandleChange = this.qtyHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  symbolHandleChange(event) {
    this.setState({
      symbol: event.target.value
    });
  }

  qtyHandleChange(event) {
    const intRex = /^\d+$/;
    if (event.target.value === '') {
      this.setState({ qtyErr: '', qty: '' });
      return;
    }
    if (intRex.test(event.target.value)) {
      this.setState({ qtyErr: '', qty: event.target.value });
    } else {
      this.setState({
        qtyErr: 'Only positive integer of shares allowed!',
        qty: this.state.qty
      });
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const symbol = this.state.symbol;
    const shares = Number(this.state.qty);
    this.props.buy(this.props.userId, symbol, shares);
  }

  render() {
    const { cashBal, error } = this.props;
    console.log('ERR', error);
    return (
      <div className="trade-view">
        <h3>Cash Available: $ {cashBal}</h3>
        <form onSubmit={this.handleSubmit} className="trade-form">
          <TextField
            id="outlined-name"
            label="Symbol"
            name="symbol"
            value={this.state.symbol}
            onChange={this.symbolHandleChange}
            margin="normal"
            variant="outlined"
            placeholder="type a valid ticker"
          />
          <TextField
            id="outlined-number"
            label="Qty"
            name="qty"
            value={this.state.qty}
            onChange={this.qtyHandleChange}
            type="number"
            margin="normal"
            variant="outlined"
            error={!!this.state.qtyErr.length}
            helperText={this.state.qtyErr}
            placeholder="positive integer of shares"
          />
          <button type="submit" className="submit-button">Buy</button>
        </form>
        {error && error.response && <div className="err-message"> {error.response.data} </div>}
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  cashBal: state.user.cashBal,
  error: state.trades.error
});

const mapDispatch = dispatch => {
  return {
    buy: (userId, symbol, shares) => dispatch(buy(userId, symbol, shares))
  };
};

export default connect(mapStateToProps, mapDispatch)(Trade);