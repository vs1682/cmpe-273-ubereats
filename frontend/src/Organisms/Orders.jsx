import { useStyletron } from 'baseui';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '../Atoms/Divider';
import Space from '../Atoms/Space';

import OrderItem from '../Molecule/OrderItem';

import { fetchOrderByCustomer } from '../store/thunks/order';

const Orders = () => {
  const dispatch = useDispatch();
  const [css] = useStyletron();
  const user = useSelector(state => state.user);
  const orders = useSelector(state => state.order.all);

  useEffect(() => {
    dispatch(fetchOrderByCustomer(user.credId));
  }, []);

  const renderOrderItems = ({restaurant, dishes, ...restDetails}) => (
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

  return (
    <div className={css({ padding: '64px' })}>
      <h1>Past Orders</h1>
      {orders.map(renderOrderItems)}
    </div>
  );
}

export default Orders;
