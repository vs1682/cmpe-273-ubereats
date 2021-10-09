import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FoodTypeFilter from '../../Molecule/FoodTypeFilter';
import FoodSection from '../../Molecule/FoodSection';

import { addFavorite, fetchAllRestaurant } from '../../store/thunks/restaurant';

const Dashboard = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(state => state.restaurant.all);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchAllRestaurant(user.credId));
  }, []);

  return (
    <div>
      <FoodTypeFilter />
      <FoodSection
        restaurants={restaurants}
        onAddFavorite={(restId) => dispatch(addFavorite({ custId: user.credId, restId }))}
      />
    </div>
  );
}

export default Dashboard;
