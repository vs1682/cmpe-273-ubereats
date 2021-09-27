import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Layout from '../Organisms/Restaurant/Layout';
import RestaurantProfile from '../Organisms/Restaurant/RestaurantProfile';
import RestaurantProfileForm from '../Organisms/Restaurant/RestaurantProfileForm';
import Dishes from '../Organisms/Restaurant/Dishes';

const Restaurant = () => {
  let { path } = useRouteMatch();

  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <RestaurantProfile />
        </Route>
        <Route path={`${path}/edit`}>
          <RestaurantProfileForm />
        </Route>
        <Route path={`${path}/dishes`}>
          <Dishes />
        </Route>
      </Switch>
    </Layout>
  );
}

export default Restaurant;
