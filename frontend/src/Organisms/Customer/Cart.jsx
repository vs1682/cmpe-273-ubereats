import React from 'react';
import { useSelector } from 'react-redux';
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import {
  Modal,
  ModalHeader,
  ModalBody,
  SIZE,
  ROLE
} from 'baseui/modal';

import CartItem from '../../Atoms/CartItem';
import Centered from '../../Atoms/Centered';
import cartIcon from '../../assets/trolley.svg';
import { URLS } from '../../utils/constants';

const Cart = ({
  isOpen,
  onClose
}) => {
  const [css] = useStyletron();
  const { items, cartTotal } = useCart();
  const allRestaurants = useSelector(state => state.restaurant.all);

  const renderEmptyCart = () => {
    return (
      <Centered direction="column" horizontal vertical>
        <div>
          <img src={cartIcon} height={32} />
        </div>
        <p>Add items from a restaurant to start a new cart</p>
      </Centered>
    );
  }

  const renderCart = () => {
    const restaurant = allRestaurants && items
    ? allRestaurants.find(r => r.credId == items[0].restId)
    : [];

    return (
      <>
        <div className={css({ color: '#000000' })}>
          <h1>{restaurant && restaurant.name}</h1>
          {items.map(item => <CartItem key={item.id} item={item} />)}
        </div>
        <Link to={`${URLS.customer.checkout}`}>
          <Button
            className={css({ width: '100%', marginTop: '16px' })}
            onClick={onClose}
          >
            Go to Checkout . ${cartTotal}
          </Button>
        </Link>
      </>
    );
  }

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
        {items && items.length > 0
          ? renderCart()
          : renderEmptyCart()
        }
      </ModalBody>
    </Modal>
  );
}

export default Cart;
