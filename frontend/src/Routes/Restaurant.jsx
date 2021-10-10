import React from 'react';
import { useSelector } from 'react-redux';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import { getUser } from '../store/selectors/user';
import { USER_TYPE } from '../utils/constants';

import RestaurantLayout from '../Organisms/Restaurant/Layout';
import CustomerLayout from '../Organisms/Customer/Layout';
import RestaurantProfile from '../Organisms/Restaurant/RestaurantProfile';
import RestaurantProfileForm from '../Organisms/Restaurant/RestaurantProfileForm';
import EditableDishes from '../Organisms/Restaurant/EditableDishes';
import RestaurantProfileAndDishes from '../Organisms/Restaurant/RestaurantProfileAndDishes';
import Orders from '../Organisms/Orders';

const Restaurant = () => {
  let { path } = useRouteMatch();
  const user = useSelector(getUser);

  const Layout = user.accountRole === USER_TYPE.restaurant ? RestaurantLayout : CustomerLayout;

  return (
    <Layout>
      <Switch>
        <Route exact path={`${path}/:id`}>
          <RestaurantProfileAndDishes />
        </Route>
        <Route path={`${path}/edit`}>
          <RestaurantProfileForm />
        </Route>
        <Route path={`${path}/dishes`}>
          <EditableDishes />
        </Route>
        <Route path={`${path}/orders`}>
          <Orders />
        </Route>
        <Route exact path={path}>
          <RestaurantProfile />
        </Route>
      </Switch>
    </Layout>
  );
}

export default Restaurant;
