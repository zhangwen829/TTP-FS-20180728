import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/user';

const Header = (props) => {
  const { clickLogout } = props;
  return (
    <div className="header">
      <h2 id="welcome-msg">Welcome, abc@gmail.com</h2>
      <nav>
        <div className="header-links">
          <Link to='/portfolio'>Portfolio</Link>
          <Link to='/transaction'>Transaction</Link>
          <a href="#" onClick={clickLogout} >
            Logout
          </a>
        </div>
      </nav>
    </div>);
}


const mapDispatch = dispatch => ({
  clickLogout: () => dispatch(logout())
});

export default connect(null, mapDispatch)(Header);