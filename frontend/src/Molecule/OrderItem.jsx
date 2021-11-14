import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useStyletron } from 'baseui';

import Centered from '../Atoms/Centered';
import Space from '../Atoms/Space';
import OrderStatus, { SIZE as ORDER_FILTER_SIZE } from './OrderFilter';
import { Button, SIZE as BUTTON_SIZE } from 'baseui/button';
import { Link } from 'react-router-dom';
import { URLS } from '../utils/constants';
import { updateOrderStatus } from '../store/thunks/order';

const OrderItem = ({
  restaurant,
  customer,
  order,
  dishes,
  onClickViewReceipt
}) => {
  const dispatch = useDispatch();
  const [css] = useStyletron();
  const orderStatuses = useSelector(state => state.order.statuses);

  const renderDishItem = (dish) => {
    return (
      <div key={dish.id}>
        <div className={css({ display: 'flex', alignItems: 'center' })}>
          <Centered
            horizontal
            vertical
            className={css({
              width: '28px',
              height: '28px',
              border: '1px solid #efefef',
              marginRight: '8px'
            })}
          >
            {dish.quantity}
          </Centered>
          <div>{dish.name}</div>
        </div>
        <Space />
      </div>
    );
  }

  const profilePicUrl = restaurant ? restaurant.profilePicUrl : customer.profilePicUrl;
  const name = restaurant ? restaurant.name : customer.fullname;

  const orderStatusMap = _.keyBy(orderStatuses, 'name');
  const shouldShowCancelButton = order.status == orderStatusMap['NEW'].id;

  return (
    <div className={css({ display: 'flex' })}>
      <div className={css({ flex: 1 })}>
        <img
          className={css({ width: '300px', height: '160px', objectFit: 'cover' })}
          src={profilePicUrl}
          alt="profile image"
        />
      </div>
      <div className={css({ flex: 2, margin: '0 32px 0 32px' })}>
        <h3>{name}</h3>
        <div className={css({ marginTop: '-12px', color: '#545454', fontSize: '15px', })}>
          {`${dishes.length} items for $${_.round(order.amount, 2)} - ${order.orderedAt}`}
          {restaurant && (
            <span
              className={css({
                textDecoration: 'underline',
                color: 'black',
                marginLeft: '16px',
                fontWeight: 700
              })}
              onClick={onClickViewReceipt}
            >
              View Receipt
            </span>
          )}
        </div>
        <Space size={2} />
        {dishes.map(renderDishItem)}
      </div>
      <div className={css({ flex: 1 })}>
        {restaurant && (
          <>
            <Link to={`${URLS.restaurant.base}/${restaurant.credId}`}>
              <Button size={BUTTON_SIZE.compact}>View Store</Button>
            </Link>
            {shouldShowCancelButton && (<Button
              className={css({ marginLeft: '4px' })}
              size={BUTTON_SIZE.compact}
              onClick={() => dispatch(
                updateOrderStatus({
                  orderId: order.orderId,
                  status: orderStatusMap['CANCELLED'].id
                })
              )}
            >
              Cancel Order
            </Button>)}
          </>
        )}
        {customer && (
          <div className={css({ width: '160px' })}>
            <OrderStatus
              status={order.status}
              onChange={value => dispatch(updateOrderStatus({ orderId: order.orderId, status: value }))}
              size={ORDER_FILTER_SIZE.compact}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderItem;