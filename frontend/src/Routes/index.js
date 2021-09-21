import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Restaurant from './Restaurant';
import Customer from './Customer';
import SignIn from '../Organisms/SignIn';
import SignUp from '../Organisms/SignUp';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/customer">
            <Customer />
          </Route>
          <Route path="/restaurant">
            <Restaurant />
          </Route>
        </Switch>
    </Router>
  );
}

export default AppRouter;
