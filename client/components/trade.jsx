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
    const intRex = /[0-9]+/g;
    console.log('QTY', event.target.value);
    console.log('STATE', this.state.qty);
    if (intRex.test(event.target.value)) {
      this.setState({ qtyErr: '', qty: event.target.value });
    } else {
      this.setState({ qtyErr: 'Only whole number of shares allowed!' });
    }
  }
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
            name="symbol"
            value={this.state.symbol}
            onChange={this.symbolHandleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-number"
            label="Qty"
            name="qty"
            onChange={this.qtyHandleChange}
            type="number"
            margin="normal"
            variant="outlined"
            error={!!this.state.qtyErr.length}
            helperText={this.state.qtyErr}
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