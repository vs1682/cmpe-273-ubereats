import React from 'react';
import {Button, SHAPE} from 'baseui/button';

import Space from '../Atoms/Space';
import cartIcon from '../assets/trolley-white.svg';

const CartButton = () => {
  return (
    <Button shape={SHAPE.pill}>
      <img height={24} src={cartIcon} alt="cart icon" />
      <Space horizontal />
      0
    </Button>
  );
}

export default CartButton;