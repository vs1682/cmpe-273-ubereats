import { useStyletron } from 'baseui';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '../Atoms/Divider';
import Space from '../Atoms/Space';

import OrderItem from '../Molecule/OrderItem';
import OrderFilter from '../Molecule/OrderFilter';

import {
  fetchOrderByCustomer,
  fetchOrderByRestaurant,
  fetchOrderStatuses
} from '../store/thunks/order';
import { setOrderFilter } from '../store/slices/filters';
import { USER_TYPE } from '../utils/constants';

const Orders = () => {
  const dispatch = useDispatch();
  const [css] = useStyletron();
  const user = useSelector(state => state.user);
  const orders = useSelector(state => state.order.all);
  const orderFilters = useSelector(state => state.filters.order);

  useEffect(() => {
    dispatch(fetchOrderStatuses());
  }, []);

  useEffect(() => {
    if (user.accountRole === USER_TYPE.customer) {
      dispatch(fetchOrderByCustomer({ id: user.credId, filters: orderFilters }));
    }

    if (user.accountRole === USER_TYPE.restaurant) {
      dispatch(fetchOrderByRestaurant({ id: user.credId, filters: orderFilters }));
    }
  }, [orderFilters]);

  const renderOrderItemsForRestaurant = ({customer, dishes, ...restDetails}) => (
    <>
      <OrderItem
        order={restDetails}
        customer={customer}
        dishes={dishes}
      />
      <Space/>
      <Divider size={1} />
      <Space/>
    </>
  )

  const renderOrderItemsForCustomer = ({restaurant, dishes, ...restDetails}) => (
    <>
      <OrderItem
        order={restDetails}
        restaurant={restaurant}
        dishes={dishes}
      />
      <Space/>
      <Divider size={1} />
      <Space/>
    </>
  )

  const renderOrderItems = user.accountRole === USER_TYPE.customer
    ? renderOrderItemsForCustomer
    : renderOrderItemsForRestaurant;

  return (
    <div className={css({ padding: '64px' })}>
      <div className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      })}>
        <h1>Orders</h1>
        <div className={css({ width: '200px' })}>
          <OrderFilter
            status={orderFilters.status}
            onChange={value => dispatch(setOrderFilter(value))}
          />
        </div>
      </div>
      {orders.map(renderOrderItems)}
    </div>
  );
}

export default Orders;
