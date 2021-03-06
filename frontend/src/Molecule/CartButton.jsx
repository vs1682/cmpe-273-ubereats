import React from 'react';
import {Button, SHAPE} from 'baseui/button';

import Space from '../Atoms/Space';
import cartIcon from '../assets/trolley-white.svg';

const CartButton = ({ quantity, onClick }) => {
  return (
    <Button shape={SHAPE.pill} onClick={onClick}>
      <img height={24} src={cartIcon} alt="cart icon" />
      <Space horizontal />
      {quantity}
    </Button>
  );
}

export default CartButton;