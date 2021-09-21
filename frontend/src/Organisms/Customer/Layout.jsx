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
            <BrandLogo height="24px" />
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
      <Drawer
        onClose={() => setDrawerOpen(false)}
        isOpen={isDrawerOpen}
        size="auto"
        anchor={ANCHOR.left}
      >
        lorem ipsum
      </Drawer>
      {children}
    </>
  );
}

export default Layout;
