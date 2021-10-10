import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCustomerProfile } from '../store/thunks/customer';
import { fetchRestaurant } from '../store/thunks/restaurant';
import { fetchDishCategories, fetchDishTypes } from '../store/thunks/dish';
import { fetchDetails } from '../store/thunks/countries';
import { USER_TYPE } from '../utils/constants';

const useFetchInitialDataForRestaurant = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user && user.accountRole === USER_TYPE.restaurant) {
      dispatch(fetchRestaurant(user.credId));
      dispatch(fetchDishCategories());
      dispatch(fetchDishTypes());
    }
  }, [user && user.accountRole]);
}

export default useFetchInitialDataForRestaurant;
