import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCustomerProfile } from '../store/thunks/customer';
import { fetchAllRestaurant } from '../store/thunks/restaurant';
import { USER_TYPE } from '../utils/constants';

const useFetchInitialDataForCustomer = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user && user.accountRole === USER_TYPE.customer) {
      dispatch(fetchCustomerProfile(user.credId));
      dispatch(fetchAllRestaurant(user.credId));
    }
  }, [user && user.accountRole]);
}

export default useFetchInitialDataForCustomer;
