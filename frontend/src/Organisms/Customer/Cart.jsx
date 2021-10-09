import React from 'react';
import { useSelector } from 'react-redux';
import { useCart } from 'react-use-cart';
import { useStyletron } from 'baseui';
import {
  Modal,
  ModalHeader,
  ModalBody,
  SIZE,
  ROLE
} from 'baseui/modal';

import CartItem from '../../Atoms/CartItem';
import { Button } from 'baseui/button';

const Cart = ({
  isOpen,
  onClose
}) => {
  const [css] = useStyletron();
  const { items, cartTotal } = useCart();
  const allRestaurants = useSelector(state => state.restaurant.all);

  const restaurant = allRestaurants && items
    ? allRestaurants.find(r => r.credId == items[0].restId)
    : [];

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Dialog: {
          style: {
            width: '40vw',
            // height: '80vh',
            display: 'flex',
            flexDirection: 'column',
          },
        }
      }}
    >
      <ModalHeader>Cart</ModalHeader>
      <ModalBody>
        <div className={css({ color: '#000000' })}>
          <h1>{restaurant && restaurant.name}</h1>
          {items.map(item => <CartItem item={item} />)}
        </div>
        <Button
          className={css({ width: '100%', marginTop: '16px' })}
        >
          Go to Checkout . ${cartTotal}
        </Button>
      </ModalBody>
    </Modal>
  );
}

export default Cart;
