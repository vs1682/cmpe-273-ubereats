import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCart } from 'react-use-cart';
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
import Cart from './Cart';

const Layout = ({ children }) => {
  const { totalItems  } = useCart();
  const profile = useSelector(state => state.customer.profile);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

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
        <NavigationList $align={ALIGN.center} />
        <NavigationList $align={ALIGN.right}>
          <NavigationItem style={{width: '200px'}}>
            <Search
              options={[]}
              type={TYPE.search}
              onChange={() => {}}
            />
          </NavigationItem>
          <NavigationItem>
            <CartButton quantity={totalItems} onClick={() => setCartOpen(true)} />
          </NavigationItem>
        </NavigationList>
      </HeaderNavigation>
      <DrawerMenu
        userName={profile.fullname}
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
