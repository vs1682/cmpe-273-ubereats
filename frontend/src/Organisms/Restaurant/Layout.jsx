import React from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import { StyledLink } from "baseui/link";

import BrandLogo from '../../Atoms/BrandLogo';

const Layout = ({ children }) => {
  return (
    <>
      <HeaderNavigation>
        <NavigationList $align={ALIGN.left}>
          <NavigationItem>
            <a href="/customer/dashboard">
              <BrandLogo height="24px" />
            </a>
          </NavigationItem>
        </NavigationList>
        <NavigationList $align={ALIGN.center}></NavigationList>
        <NavigationList $align={ALIGN.right}>
          <NavigationItem>
            <StyledLink href="/restaurant">
              Profile
            </StyledLink>
          </NavigationItem>
          <NavigationItem>
            <StyledLink href="/restaurant/dishes">
              Dishes
            </StyledLink>
          </NavigationItem>
          <NavigationItem>
            <StyledLink href="/restaurant/orders">
              Orders
            </StyledLink>
          </NavigationItem>
        </NavigationList>
      </HeaderNavigation>
      {children}
    </>
  );
}

export default Layout;
