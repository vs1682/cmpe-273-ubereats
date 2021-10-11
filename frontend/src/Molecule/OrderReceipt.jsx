import React from 'react';
import { useSelector } from 'react-redux';
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
import { styled, useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import {
  Modal,
  ModalHeader,
  ModalBody,
  SIZE,
  ROLE
} from 'baseui/modal';

import Centered from '../Atoms/Centered';
import Divider from '../Atoms/Divider';
import Space from '../Atoms/Space';
import _ from 'lodash';

const SpaceBetweenContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between'
});

const OrderReceipt = ({
  order,
  dishes,
  onClose
}) => {
  const [css] = useStyletron();

  const getAmountBreakup = () => {
    const subtotal = _.round(((order.amount - 2.99) / 1.16), 2);
    return {
      subtotal,
      deliveryFee: 2.99,
      taxes: _.round(subtotal * 0.16, 2)
    }
  };

  const renderHeader = () => (
    <Centered vertical className={css({ color: 'black', justifyContent: 'space-between' })}>
      <h2>Total</h2>
      <h2>{order.amount}</h2>
    </Centered>
  )

  const renderDishItem = (dish) => {
    return (
      <div key={dish.id}>
        <div className={css({ display: 'flex', alignItems: 'center', color: 'black' })}>
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
        <Space size={2} />
      </div>
    );
  }

  const renderAmountBreak = () => {
    const { taxes, deliveryFee, subtotal } = getAmountBreakup();

    return (
      <div>
        <SpaceBetweenContainer className={css({ color: 'black', fontWeight: 500 })}>
          <span>Subtotal</span>
          <span>{`$${subtotal}`}</span>
        </SpaceBetweenContainer>
        <Space />
        <SpaceBetweenContainer>
          <span>Taxes & Fees</span>
          <span>{`$${taxes}`}</span>
        </SpaceBetweenContainer>
        <Space />
        <SpaceBetweenContainer>
          <span>Delivery Fee</span>
          <span>{`$${deliveryFee}`}</span>
        </SpaceBetweenContainer>
      </div>
    );
  }

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen
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
      <ModalHeader>Receipt</ModalHeader>
      <ModalBody>
        {renderHeader()}
        <Space />
        <Divider size={1} />
        <Space />
        {dishes.map(renderDishItem)}
        <Divider size={1} />
        <Space size={2} />
        {renderAmountBreak()}
      </ModalBody>
    </Modal>
  );
}

export default OrderReceipt;
