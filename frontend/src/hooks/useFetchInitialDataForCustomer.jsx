import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { fetchCustomerProfile } from '../store/thunks/customer';
import { fetchAllRestaurant } from '../store/thunks/restaurant';
import { fetchOrderStatuses } from '../store/thunks/order';
import { fetchDishCategories, fetchDishTypes } from '../store/thunks/dish';
import { fetchDetails } from '../store/thunks/countries';
import { setOrderFilter } from '../store/slices/filters';
import { USER_TYPE } from '../utils/constants';

const useFetchInitialDataForCustomer = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.customer.profile);
  const restaurantFilters = useSelector(state => state.filters.restaurant);
  const orderStatuses = useSelector(state => state.order.statuses);

  useEffect(() => {
    if (user && user.accountRole === USER_TYPE.customer) {
      dispatch(fetchCustomerProfile(user.credId));
      dispatch(fetchAllRestaurant({ custId: user.credId, filters: restaurantFilters }));
      dispatch(fetchDishCategories());
      dispatch(fetchDishTypes());
      dispatch(fetchOrderStatuses());
    }
  }, [user && user.accountRole]);

  useEffect(() => {
    if (orderStatuses && orderStatuses.length > 0) {
      const orderStatusMap = _.keyBy(orderStatuses, 'name');
      dispatch(setOrderFilter(orderStatusMap['NEW'].id));
    }
  }, [orderStatuses]);

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
