import React from 'react';
import Header from './header';

export default class Trade extends React.Component {
  render() {
    return (
      <div >
        <Header />
        <div className="main">This is transaction</div>
      </div>);
  }
}