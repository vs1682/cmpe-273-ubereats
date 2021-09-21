import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import RestaurantProfile from '../Organisms/Restaurant/RestaurantProfile';
import RestaurantProfileForm from '../Organisms/Restaurant/RestaurantProfileForm';

const Restaurant = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <RestaurantProfile />
      </Route>
      <Route path={`${path}/edit`}>
        <RestaurantProfileForm />
      </Route>
    </Switch>
  );
}

export default Restaurant;
