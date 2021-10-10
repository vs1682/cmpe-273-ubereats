import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCustomerProfile } from '../store/thunks/customer';
import { fetchAllRestaurant } from '../store/thunks/restaurant';
import { fetchDishCategories, fetchDishTypes } from '../store/thunks/dish';
import { fetchDetails } from '../store/thunks/countries';
import { USER_TYPE } from '../utils/constants';

const useFetchInitialDataForCustomer = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.customer.profile);
  const restaurantFilters = useSelector(state => state.filters.restaurant);

  useEffect(() => {
    if (user && user.accountRole === USER_TYPE.customer) {
      dispatch(fetchCustomerProfile(user.credId));
      dispatch(fetchAllRestaurant({ custId: user.credId, filters: restaurantFilters }));
      dispatch(fetchDishCategories());
      dispatch(fetchDishTypes());
    }
  }, [user && user.accountRole]);

  useEffect(() => {
    if (profile && profile.credId) {
      dispatch(fetchDetails({
        country: profile.country,
        state: profile.state,
        city: profile.city
      }));
    }
  }, [profile]);
}

export default useFetchInitialDataForCustomer;
