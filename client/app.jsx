import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthForm from './components/auth-form';
import Portfolio from './components/portfolio';
import Transaction from './components/transaction';

const App = () => {
  return (
    <Switch>
      <Route path="/login" component={AuthForm} />
      <Route path="/signup" component={AuthForm} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/transaction" component={Transaction} />
      <Route component={AuthForm} />
    </Switch >
  );
}

export default App;