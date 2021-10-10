import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCart } from 'react-use-cart';
import _ from 'lodash';
import { Button } from 'baseui/button';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import {StatefulSelect as Search, TYPE} from 'baseui/select';
import { Menu } from "baseui/icon";

import BrandLogo from '../../Atoms/BrandLogo';
import CartButton from '../../Molecule/CartButton';
import DrawerMenu from '../../Molecule/DrawerMenu';
import Toggle from '../../Molecule/Toggle';
import Cart from './Cart';
import { setRestaurantFilters } from '../../store/slices/filters';
import { fetchAllRestaurant } from '../../store/thunks/restaurant';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { totalItems  } = useCart();
  const profile = useSelector(state => state.customer.profile);
  const restaurantFilters = useSelector(state => state.filters.restaurant);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  const fetchFilteredRestaurants = (filters) => {
    dispatch(fetchAllRestaurant({custId: profile.credId, filters}));
  }

  const onChangeSearchText = _.debounce(
    (e) => {
      const searchText = e && e.target ? e.target.value: '';
      dispatch(setRestaurantFilters({ searchText }));
      fetchFilteredRestaurants({...restaurantFilters, searchText});
    },
    300
  )

  return (
    <>
      <HeaderNavigation>
        <NavigationList $align={ALIGN.left}>
          <NavigationItem>
            <Button onClick={() => setDrawerOpen(true)}>
              <Menu size={24} />
            </Button>
          </NavigationItem>
          <NavigationItem>
            <a href="/customer/dashboard">
              <BrandLogo height="24px" />
            </a>
          </NavigationItem>
        </NavigationList>
        <NavigationList $align={ALIGN.center}>
          <Toggle
            options={[
              {label: 'Delivery', value: true},
              {label: 'Pickup', value: false}
            ]}
            onToggle={value => {
              dispatch(
                setRestaurantFilters({
                  ...restaurantFilters,
                  deliveryMode: value
                })
              );
              fetchFilteredRestaurants({
                ...restaurantFilters,
                deliveryMode: value
              });
            }}
          />
        </NavigationList>
        <NavigationList $align={ALIGN.right}>
          <NavigationItem style={{width: '400px'}}>
            <Search
              options={[]}
              type={TYPE.search}
              onBlurResetsInput={false}
              onCloseResetsInput={false}
              onInputChange={onChangeSearchText}
              onChange={onChangeSearchText}
              placeholder="What are you craving?"
            />
          </NavigationItem>
          <NavigationItem>
            <CartButton quantity={totalItems} onClick={() => setCartOpen(true)} />
          </NavigationItem>
        </NavigationList>
      </HeaderNavigation>
      <DrawerMenu
        userName={profile.fullname}
        profilePicUrl={profile.profilePicUrl}
        onClose={() => setDrawerOpen(false)}
        isOpen={isDrawerOpen}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
      />
      {children}
    </>
  );
}

export default Layout;
