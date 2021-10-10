import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyletron } from 'baseui';

import FoodSection from '../../Molecule/FoodSection';

import { addFavorite, fetchFavorites } from '../../store/thunks/restaurant';

const Favorites = () => {
  const dispatch = useDispatch();
  const [css] = useStyletron();
  const restaurants = useSelector(state => state.restaurant.favorites);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchFavorites(user.credId));
  }, []);

  return (
    <div className={css({ margin: '32px' })}>
      <FoodSection
        heading="Favorites"
        restaurants={restaurants}
        onAddFavorite={(restId) => dispatch(addFavorite({ custId: user.credId, restId }))}
      />
    </div>
  );
}

export default Favorites;
