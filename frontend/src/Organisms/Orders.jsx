import React, { useEffect, useState } from 'react';
import { useStyletron } from 'baseui';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Pagination } from 'baseui/pagination';
import { Select, SIZE as SELECT_SIZE } from 'baseui/select';

import Divider from '../Atoms/Divider';
import Space from '../Atoms/Space';

import OrderItem from '../Molecule/OrderItem';
import OrderFilter from '../Molecule/OrderFilter';
import OrderReceipt from '../Molecule/OrderReceipt';

import {
  fetchOrderByCustomer,
  fetchOrderByRestaurant
} from '../store/thunks/order';
import { setOrderFilter, setOrderPagination } from '../store/slices/filters';
import { USER_TYPE } from '../utils/constants';
import Centered from '../Atoms/Centered';

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

  const renderPagination = () => (
    <Centered horizontal>
      <Pagination
        numPages={20}
        currentPage={orderFilters.page}
        onPageChange={({ nextPage }) => {
          dispatch(setOrderPagination({
            page: Math.min(Math.max(nextPage, 1), 20)
          }));
        }}
      />
    </Centered>
  );

  const isCustomer = user.accountRole === USER_TYPE.customer;
  const renderOrderItems = isCustomer
    ? renderOrderItemsForCustomer
    : renderOrderItemsForRestaurant;

  const pageSizes = [2, 5, 10];
  const pageOptions = pageSizes.map(ps => ({label: `show ${ps} orders per page`, id: ps}));

  return (
    <div className={css({ padding: '64px' })}>
      <div className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      })}>
        <div className={css({display: 'flex', alignItems: 'center'})}>
          <h1 className={css({marginRight: '8px'})}>Orders</h1>
          <Select
            size={SELECT_SIZE.compact}
            value={pageOptions.filter(o => o.id === orderFilters.limit)}
            options={pageOptions}
            onChange={params => dispatch(
              setOrderPagination({ limit: _.get(params, 'option.id') })
            )}
          />
        </div>
        <div className={css({ width: '200px' })}>
          <OrderFilter
            status={orderFilters.status}
            onChange={value => dispatch(setOrderFilter(value))}
            size={SELECT_SIZE.compact}
            isFilter
          />
        </div>
      </div>
      {orders.map(renderOrderItems)}
      {renderPagination()}
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
