import React, { useState } from 'react';
import { Drawer, ANCHOR } from 'baseui/drawer';
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

const Layout = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
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
            <CartButton />
          </NavigationItem>
        </NavigationList>
      </HeaderNavigation>
      <DrawerMenu
        onClose={() => setDrawerOpen(false)}
        isOpen={isDrawerOpen}
        anchor={ANCHOR.left}
      />
      {children}
    </>
  );
}

export default Layout;
