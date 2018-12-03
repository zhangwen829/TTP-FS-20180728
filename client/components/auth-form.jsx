import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store/user';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="form-parent">
      <form onSubmit={handleSubmit} name={name} className="form">
        <div>
          <label htmlFor="email">
            <small>Email:   </small>
          </label>
          <input name="email" type="text" className="input" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password:</small>
          </label>
          <input name="password" type="password" className="input" />
        </div>
        <div>
          <button type="submit" className="submit-button">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {name === 'login' ? <a href="/signup" >No Account? Let's Sign Up First!</a> : <a href="/login" >Registered User? Let's Log In!</a>}
    </div>
  );
};


const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
