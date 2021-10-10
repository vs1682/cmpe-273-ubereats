import React from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { useStyletron } from 'baseui';

import Centered from '../Atoms/Centered';
import Space from '../Atoms/Space';
import OrderStatus from './OrderFilter';
import { Button } from 'baseui/button';
import { Link } from 'react-router-dom';
import { URLS } from '../utils/constants';
import { updateOrderStatus } from '../store/thunks/order';

const OrderItem = ({
  restaurant,
  customer,
  order,
  dishes
}) => {
  const dispatch = useDispatch();
  const [css] = useStyletron();

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
        <div className={css({ marginTop: '-12px', color: '#545454' })}>
          {`${dishes.length} items for $${_.round(order.amount, 2)} - ${order.orderedAt}`}
        </div>
        <Space size={2} />
        {dishes.map(renderDishItem)}
      </div>
      <div className={css({ flex: 1 })}>
        {restaurant && (
          <Link to={`${URLS.restaurant.base}/${restaurant.credId}`}>
            <Button>View Store</Button>
          </Link>
        )}
        {customer && (
          <div className={css({ width: '200px' })}>
            <OrderStatus
              status={order.status}
              onChange={value => dispatch(updateOrderStatus({ orderId: order.orderId, status: value }))}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderItem;