import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Profile from '../Organisms/Customer/Profile';
import ProfileForm from '../Organisms/Customer/ProfileForm';
import Dashboard from '../Organisms/Customer/Dashboard';
import Layout from '../Organisms/Customer/Layout';

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
      </Switch>
    </Layout>
  );
}

export default Customer;
