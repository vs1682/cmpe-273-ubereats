import React from 'react';
import { useStyletron } from 'baseui';

import Centered from '../Atoms/Centered';
import Space from '../Atoms/Space';
import { Button } from 'baseui/button';
import { Link } from 'react-router-dom';
import { URLS } from '../utils/constants';
import _ from 'lodash';

const OrderItem = ({
  restaurant,
  order,
  dishes
}) => {
  const [css] = useStyletron();

  const renderDishItem = (dish) => {
    return (
      <>
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
      </>
    );
  }

  return (
    <div className={css({ display: 'flex' })}>
      <div className={css({ flex: 1 })}>
        <img
          className={css({ width: '300px', objectFit: 'cover' })}
          src={restaurant.profilePicUrl}
          alt="restaurant image"
        />
      </div>
      <div className={css({ flex: 2, margin: '0 32px 0 32px' })}>
        <h3>{restaurant.name}</h3>
        <div className={css({ marginTop: '-12px', color: '#545454' })}>
          {`${dishes.length} items for $${_.round(order.amount, 2)} - ${order.orderedAt}`}
        </div>
        <Space size={2} />
        {dishes.map(renderDishItem)}
      </div>
      <div className={css({ flex: 1 })}>
        <Link to={`${URLS.restaurant.base}/${restaurant.credId}`}>
          <Button>View Store</Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderItem;