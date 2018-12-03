import React from 'react';
import Header from './header';
import Holding from './holding';
import Trade from './trade';

export default class Portfolio extends React.Component {
  render() {
    return (<div><Header />
      <div className="main portfolio-main"><Holding /><Trade /></div>
    </div>);
  }
}