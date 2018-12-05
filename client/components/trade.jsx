import React from 'react';
import { connect } from 'react-redux';

class Trade extends React.Component {
  render() {
    const { cashBal } = this.props;
    return (
      <div className="trade-view">
        <h3>Cash Available: $ {cashBal}</h3>
        <form className="form">
          <div>
            <label htmlFor="ticker" />
            <input name="ticker" type="text" value="Ticker" className="input" />
          </div>
          <div>
            <label htmlFor="qty" />
            <input name="qty" type="text" value="Qty" className="input" />
          </div>
          <button type="submit" className="submit-button">Buy</button>
        </form>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  cashBal: state.user.cashBal,
});

export default connect(mapStateToProps, null)(Trade);