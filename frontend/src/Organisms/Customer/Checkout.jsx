import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCart } from 'react-use-cart';
import _, { round } from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import { styled, useStyletron } from 'baseui';
import { RadioGroup, Radio } from 'baseui/radio';
import { Button, SIZE, SHAPE } from 'baseui/button';
import { useSnackbar } from 'baseui/snackbar';

import AddressItem from '../../Atoms/AddressItem';
import Divider from '../../Atoms/Divider';
import Space from '../../Atoms/Space';
import CartItem from '../../Atoms/CartItem';
import AddAddressForm from './AddAddressForm';
import { fetchCustomerAllAddresses } from '../../store/thunks/customer';
import { createOrder } from '../../store/thunks/order';
import { fetchRestaurant } from '../../store/thunks/restaurant';
import { selectAddress } from '../../store/slices/customer';
import { URLS } from '../../utils/constants';


const SpaceBetweenContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between'
});

const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [css] = useStyletron();
  const { emptyCart, items, cartTotal } = useCart();
  const { enqueue } = useSnackbar();
  const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
  const user = useSelector(state => state.user);
  const restaurant = useSelector(state => state.restaurant.selected || {});
  const allAddresses = useSelector(state => state.customer.address.all);
  const selectedAddress = useSelector(state => state.customer.address.selected);

  useEffect(() => {
    dispatch(fetchCustomerAllAddresses({ custId: user.credId }));
  }, []);

  useEffect(() => {
    const restId = _.get(items, '[0].restId');
    if (restId) {
      dispatch(fetchRestaurant(restId));
    }
  }, []);

  const getAmountBreakup = () => ({
    taxes: cartTotal * 0.16,
    deliveryFee: 2.99,
    total: cartTotal * 1.16 + 2.99
  });

  const onPlaceOrder = () => {
    if (!selectedAddress) {
      enqueue({ message: 'Please select an address!!' });
      return;
    }

    dispatch(createOrder({
      custId: user.credId,
      restId: restaurant.credId,
      dishes: items.map(i => ({dishId: i.id, quantity: i.quantity})),
      amount: getAmountBreakup().total,
      status: 1,
      deliveryMode: restaurant.deliveryModeAllowed,
      orderedAt: new Date()
    }));

    emptyCart();
    history.push(URLS.customer.dashboard);
  }

  const onSelectAddress = (e) => {
    const addressId = e.target.value;
    const address = allAddresses.find(a => a.id == addressId);
    dispatch(selectAddress(address));
  }

  const renderAddresses = () => {
    return (
      <div>
        <RadioGroup
          value={selectedAddress && selectedAddress.id}
          onChange={onSelectAddress}
        >
          {allAddresses.map(a => (
            <Radio value={a.id}>
              <AddressItem {...a} />
            </Radio>
          ))}
        </RadioGroup>
        <div className={css({ display: 'flex', justifyContent: 'flex-end' })}>
          <Button
            onClick={() => setOpenAddAddressModal(true)}
            size={SIZE.compact}
            shape={SHAPE.pill}
            overrides={{
              BaseButton: {
                style: {
                  height: '36px'
                }
              }
            }}
          >
            + Add Address
          </Button>
        </div>
        {openAddAddressModal && (
          <AddAddressForm
            onClose={() => setOpenAddAddressModal(false)}
          />
        )}
      </div>
    );
  }

  const renderOrderItems = () => {
    return (
      <div>
        <div className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        })}>
          <h3>Your Items</h3>
          <Link to={`${URLS.restaurant.base}/${restaurant.credId}`}>
            <Button
              size={SIZE.compact}
              shape={SHAPE.pill}
              overrides={{
                BaseButton: {
                  style: {
                    height: '36px'
                  }
                }
              }}
            >
              + Add Items
            </Button>
          </Link>
        </div>
        {items.map(item => <CartItem key={item.id} item={item} />)}
      </div>
    );
  }

  const renderOrderDetails = () => {
    return (
      <div className={css({ width: '50%', height: '100%', margin: '0 25% 0 64px' })}>
        <h1>{restaurant && restaurant.name}</h1>
        {renderAddresses()}
        <Space />
        <Divider />
        <Space />
        {renderOrderItems()}
      </div>
    );
  }

  const renderAmountDetails = () => {
    const { taxes, deliveryFee, total } = getAmountBreakup();

    return (
      <div
        className={css({
          width: '50%',
          height: '100%',
          padding: '64px 32px 0 64px',
          backgroundColor: '#F6F6F6'
        })}
      >
        <Button
          onClick={onPlaceOrder}
          size={SIZE.large}
          overrides={{
            BaseButton: {
              style: {
                width: '100%',
                backgroundColor: 'green'
              }
            }
          }}
        >
          Place Order
        </Button>
        <p className={css({
          color: 'rgb(117, 117, 117)',
          fontSize: '12px'
        })}
        >
          If you’re not around when the delivery person arrives, they’ll leave your order at the door. By placing your order, you agree to take full responsibility for it once it’s delivered.
        </p>
        <Space />
        <Divider />
        <Space />
        <SpaceBetweenContainer>
          <span>Subtotal</span>
          <span>{`$${cartTotal}`}</span>
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
        <Space />
        <Divider />
        <Space />
        <SpaceBetweenContainer className={css({ fontWeight: 700 })}>
          <span>Total</span>
          <span>{`$${round(total, 2)}`}</span>
        </SpaceBetweenContainer>
      </div>
    );
  }

  return (
    <div className={css({ display: 'flex', height: '80vh' })}>
      {renderOrderDetails()}
      {renderAmountDetails()}
    </div>
  );
}

export default Checkout;
