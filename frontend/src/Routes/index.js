import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
  useHistory
} from 'react-router-dom';

import Restaurant from './Restaurant';
import Customer from './Customer';
import SignIn from '../Organisms/SignIn';
import SignUp from '../Organisms/SignUp';

import { LOCAL_STORE_KEYS } from '../utils/constants';

const AppRouter = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const loginUrls = ['/sign-in', '/sign-up'];
    if (location && !loginUrls.includes(location.pathname)) {
      if (!localStorage.getItem(LOCAL_STORE_KEYS.user)) {
        history.push('/sign-in');
      }
    }
  }, [location]);

  return (
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
  );
}

export default AppRouter;
