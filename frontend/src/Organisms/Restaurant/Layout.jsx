import React from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import { StyledLink } from "baseui/link";

import BrandLogo from '../../Atoms/BrandLogo';
import { URLS } from '../../utils/constants';

const Layout = ({ children }) => {
  return (
    <>
      <HeaderNavigation>
        <NavigationList $align={ALIGN.left}>
          <NavigationItem>
            <a href="/restaurant">
              <BrandLogo height="24px" />
            </a>
          </NavigationItem>
        </NavigationList>
        <NavigationList $align={ALIGN.center}></NavigationList>
        <NavigationList $align={ALIGN.right}>
          <NavigationItem>
            <StyledLink href={URLS.restaurant.base}>
              Profile
            </StyledLink>
          </NavigationItem>
          <NavigationItem>
          <StyledLink href={URLS.restaurant.dishes}>
              Dishes
            </StyledLink>
          </NavigationItem>
          <NavigationItem>
          <StyledLink href={URLS.restaurant.orders}>
              Orders
            </StyledLink>
          </NavigationItem>
          <NavigationItem>
          <StyledLink href={URLS.login.signOut}>
              Sign Out
            </StyledLink>
          </NavigationItem>
        </NavigationList>
      </HeaderNavigation>
      {children}
    </>
  );
}

export default Layout;
