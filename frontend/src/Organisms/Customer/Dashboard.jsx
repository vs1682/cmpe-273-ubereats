import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FoodTypeFilter from '../../Molecule/FoodTypeFilter';
import FoodSection from '../../Molecule/FoodSection';

import { fetchAllRestaurant } from '../../store/thunks/restaurant';

const Dashboard = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(state => state.restaurant.all);

  useEffect(() => {
    dispatch(fetchAllRestaurant());
  }, []);

  return (
    <div>
      <FoodTypeFilter />
      <FoodSection restaurants={restaurants} />
    </div>
  );
}

export default Dashboard;
