import React from 'react';

export default class Trade extends React.Component {
  render() {
    return (
      <div className="trade-view">
        <h3>Cash Available: $ 456.78</h3>
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