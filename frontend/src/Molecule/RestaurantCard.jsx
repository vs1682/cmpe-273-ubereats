import React, { useState } from 'react';
import { styled } from 'styletron-react';
import { useStyletron } from 'baseui';

import Centered from '../Atoms/Centered';
import Space from '../Atoms/Space';
import BlackShade from '../Atoms/BlackShade';
import favOutlined from '../assets/fav-outlined.svg';
import favFilled from '../assets/fav-filled.svg';

const SpaceBetweenContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
});

const RestaurantCard = ({
  profilePicUrl,
  name,
  rating,
  deliveryFee = 0,
  estDeliveryTime
}) => {
  const [css] = useStyletron();
  const [favIconHovered, setFavIconHovered] = useState(false);

  const addToFavorites = () => {}

  return (
    <Centered direction="column">
      <div className={css({ position: 'relative' })}>
        <img src={profilePicUrl} width="100%" height="128px" alt="restaurant image" />
        <BlackShade>
          <img
            src={favIconHovered ? favFilled : favOutlined }
            className={css({ position: 'absolute', right: '8px', top: '8px' })}
            onMouseEnter={() => setFavIconHovered(true)}
            onMouseLeave={() => setFavIconHovered(false)}
            onClick={addToFavorites}
          />
        </BlackShade>
      </div>
      <Space />
      <SpaceBetweenContainer>
        <div className={css({ fontWeight: 'bold' })}>{name}</div>
        <div>{rating}</div>
      </SpaceBetweenContainer>
      <SpaceBetweenContainer>
        <div>{`$${deliveryFee} Delivery Fee`}</div>
        <div className={css({ color: '#545454' })}>{estDeliveryTime}</div>
      </SpaceBetweenContainer>
    </Centered>
  );
}

export default RestaurantCard;