import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import SignOut from '../Organisms/SignOut';

import { USER_TYPE, URLS } from '../utils/constants';
import { getUser } from '../store/selectors/user';
import useFetchInitialDataForCustomer from '../hooks/useFetchInitialDataForCustomer';

const AppRouter = () => {
  const location = useLocation();
  const history = useHistory();
  const user = useSelector(getUser);

  useFetchInitialDataForCustomer();

  useEffect(() => {
    const loginUrls = Object.values(URLS.login);
    const isLoginUrl = location && loginUrls.includes(location.pathname);
    const isNonLoginUrl = location && !loginUrls.includes(location.pathname);
    const isIndexUrl = location && location.pathname === '/';
    const isUserLoggedIn = user && user.credId;
    if (!isUserLoggedIn && (isNonLoginUrl || isIndexUrl)) {
      history.push(URLS.login.signIn);
    }

    if (isUserLoggedIn && (isLoginUrl || isIndexUrl)) {
      const nextPath = user.accountRole == USER_TYPE.customer ? URLS.customer.dashboard : URLS.restaurant.base;
      history.push(nextPath);
    }
  }, [location, user]);

  return (
    <Switch>
      <Route path={URLS.login.signIn}>
        <SignIn />
      </Route>
      <Route path={URLS.login.signUp}>
        <SignUp />
      </Route>
      <Route path={URLS.login.signOut}>
        <SignOut />
      </Route>
      <Route path={URLS.customer.base}>
        <Customer />
      </Route>
      <Route path={URLS.restaurant.base}>
        <Restaurant />
      </Route>
    </Switch>
  );
}

export default AppRouter;
