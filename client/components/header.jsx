import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/user';

const Header = (props) => {
  const { clickLogout, userName } = props;
  return (
    <div className="header">
      <h2 id="welcome-msg">Welcome, {userName}</h2>
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
};


const mapStateToProps = (state) => ({
  userName: state.user.name,
});

const mapDispatch = dispatch => ({
  clickLogout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatch)(Header);