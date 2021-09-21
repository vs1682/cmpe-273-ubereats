import React from 'react';
import { styled } from 'styletron-react';
import { useStyletron } from 'baseui';

import Centered from '../Atoms/Centered';
import Space from '../Atoms/Space';

const SpaceBetweenContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between'
});

const RestaurantCard = ({
  imgUrl,
  name,
  rating,
  deliveryFee,
  estDeliveryTime
}) => {
  const [css] = useStyletron();

  return (
    <Centered direction="column">
      <img src={imgUrl} width="200px" height="128px" alt="restaurant image" />
      <Space />
      <SpaceBetweenContainer>
        <div className={css({ fontWeight: 'bold' })}>{name}</div>
        <div>{rating}</div>
      </SpaceBetweenContainer>
      <SpaceBetweenContainer>
        <div>{`${deliveryFee} Delivery Fee`}</div>
        <div>{estDeliveryTime}</div>
      </SpaceBetweenContainer>
    </Centered>
  );
}

export default RestaurantCard;