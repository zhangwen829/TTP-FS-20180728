import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <h2>Welcome, abc@gmail.com</h2>
        <nav>
          <Link to='/portfolio'>portfolio</Link>
          <Link to='/transaction'>transaction</Link>
          <a href="#">
            Logout
          </a>
        </nav>
      </div>);
  }
}