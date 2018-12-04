import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Login, Signup } from './components/auth-form';
import Portfolio from './components/portfolio';
import Transaction from './components/transaction';
import { me } from './store/user';

class App extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/transaction" component={Transaction} />
          </Switch >
        )}
        <Route component={Login} />
      </Switch >
    );
  }
}
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me())
});


App.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};


export default withRouter((connect(mapState, mapDispatch))(App));
