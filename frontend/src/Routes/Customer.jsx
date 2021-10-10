import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Layout from '../Organisms/Customer/Layout';
import Profile from '../Organisms/Customer/Profile';
import ProfileForm from '../Organisms/Customer/ProfileForm';
import Dashboard from '../Organisms/Customer/Dashboard';
import Checkout from '../Organisms/Customer/Checkout';
import Orders from '../Organisms/Orders';
import Favorites from '../Organisms/Customer/Favorites';

const Customer = () => {
  let { path } = useRouteMatch();

  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <Profile />
        </Route>
        <Route path={`${path}/edit`}>
          <ProfileForm />
        </Route>
        <Route path={`${path}/dashboard`}>
          <Dashboard />
        </Route>
        <Route path={`${path}/checkout`}>
          <Checkout />
        </Route>
        <Route path={`${path}/orders`}>
          <Orders />
        </Route>
        <Route path={`${path}/favorites`}>
          <Favorites />
        </Route>
      </Switch>
    </Layout>
  );
}

export default Customer;
