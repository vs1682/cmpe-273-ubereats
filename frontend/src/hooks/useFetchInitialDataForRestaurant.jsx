import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { fetchOrderStatuses } from '../store/thunks/order';
import { fetchRestaurant } from '../store/thunks/restaurant';
import { fetchDishCategories, fetchDishTypes } from '../store/thunks/dish';
import { setOrderFilter } from '../store/slices/filters';
import { USER_TYPE } from '../utils/constants';

const useFetchInitialDataForRestaurant = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const orderStatuses = useSelector(state => state.order.statuses);

  useEffect(() => {
    if (user && user.accountRole === USER_TYPE.restaurant) {
      dispatch(fetchRestaurant(user.credId));
      dispatch(fetchDishCategories());
      dispatch(fetchDishTypes());
      dispatch(fetchOrderStatuses());
    }
  }, [user && user.accountRole]);

  useEffect(() => {
    if (orderStatuses && orderStatuses.length > 0) {
      const orderStatusMap = _.keyBy(orderStatuses, 'name');
      // dispatch(setOrderFilter(orderStatusMap['NEW'].id));
    }
  }, [orderStatuses]);
}

export default useFetchInitialDataForRestaurant;
