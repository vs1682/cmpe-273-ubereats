import React, { useEffect, useState } from 'react';
import { useStyletron } from 'baseui';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import Divider from '../Atoms/Divider';
import Space from '../Atoms/Space';

import OrderItem from '../Molecule/OrderItem';
import OrderFilter from '../Molecule/OrderFilter';
import OrderReceipt from '../Molecule/OrderReceipt';

import {
  fetchOrderByCustomer,
  fetchOrderByRestaurant
} from '../store/thunks/order';
import { setOrderFilter } from '../store/slices/filters';
import { USER_TYPE } from '../utils/constants';

const Orders = () => {
  const dispatch = useDispatch();
  const [css] = useStyletron();
  const [receiptForOrder, setReceiptForOrder] = useState(null);
  const user = useSelector(state => state.user);
  const orders = useSelector(state => state.order.all);
  const orderFilters = useSelector(state => state.filters.order);

  useEffect(() => {
    if (user.accountRole === USER_TYPE.customer && Object.keys(orderFilters).length > 0) {
      dispatch(fetchOrderByCustomer({ id: user.credId, filters: orderFilters }));
    }

    if (user.accountRole === USER_TYPE.restaurant && Object.keys(orderFilters).length > 0) {
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
        onClickViewReceipt={() => setReceiptForOrder({
          order: restDetails,
          restaurant,
          dishes
        })}
      />
      <Space/>
      <Divider size={1} />
      <Space/>
    </>
  )

  const isCustomer = user.accountRole === USER_TYPE.customer;
  const renderOrderItems = isCustomer
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
      {isCustomer && receiptForOrder && (
        <OrderReceipt
          {...receiptForOrder}
          onClose={() => setReceiptForOrder(null)}
        />
      )}
    </div>
  );
}

export default Orders;
