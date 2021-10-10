import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useStyletron } from 'baseui';

import FoodTypeFilter from '../../Molecule/FoodTypeFilter';
import FoodSection from '../../Molecule/FoodSection';

import { addFavorite } from '../../store/thunks/restaurant';
import Space from '../../Atoms/Space';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [css] = useStyletron();
  const restaurants = useSelector(state => state.restaurant.all);
  const user = useSelector(state => state.user);
  const customerLocationDetails = useSelector(state => state.countries.details);

  const customerCity = _.get(customerLocationDetails, 'city.name');
  const nearByRestaurants = [];
  const otherRestaurants = [];

  restaurants.forEach(r => {
    if (r.location.includes(customerCity)) {
      nearByRestaurants.push(r);
    } else {
      otherRestaurants.push(r);
    }
  });

  return (
    <div className={css({ margin: '32px' })}>
      <FoodTypeFilter />
      {!!nearByRestaurants.length && (
        <FoodSection
          heading="Near By Restaurants"
          desc="Nearby restaurants delivered for less"
          restaurants={nearByRestaurants}
          onAddFavorite={(restId) => dispatch(addFavorite({ custId: user.credId, restId }))}
        />
      )}
      <Space size={2} />
      {!!otherRestaurants.length && (
        <FoodSection
          heading="All Other Restaurants"
          restaurants={otherRestaurants}
          onAddFavorite={(restId) => dispatch(addFavorite({ custId: user.credId, restId }))}
        />
      )}
    </div>
  );
}

export default Dashboard;
