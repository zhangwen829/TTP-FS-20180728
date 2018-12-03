import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <h2 id="welcome-msg">Welcome, abc@gmail.com</h2>
        <nav>
          <div className="header-links">
            <Link to='/portfolio'>Portfolio</Link>
            <Link to='/transaction'>Transaction</Link>
            <a href="#">
              Logout
          </a>
          </div>
        </nav>
      </div>);
  }
}