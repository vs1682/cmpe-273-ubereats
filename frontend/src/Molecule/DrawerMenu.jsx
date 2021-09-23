import React from 'react';
import { styled } from 'styletron-react';
import { useStyletron } from 'baseui';
import { Avatar } from "baseui/avatar";
import { StyledLink } from "baseui/link";
import { Drawer, ANCHOR } from 'baseui/drawer';

import orderIcon from '../assets/order.svg';
import favoriteIcon from '../assets/favorite.svg';
import Space from '../Atoms/Space';

const MenuItem = styled('div', {
  display: 'flex',
  width: '200px',
  padding: '8px',
  fontWeight: '500'
});

const AccountMenuItem = ({ name }) => {
  const [css] = useStyletron();

  return (
    <MenuItem>
      <Avatar
        name={name}
        size="scale1600"
        src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy"
      />
      <Space horizontal />
      <div>
        <div>{name}</div>
        <Space size={0.5} />
        <div>
          <StyledLink href="/customer" className={css({ color: 'green' })}>
            View Account
          </StyledLink>
        </div>
      </div>
    </MenuItem>
  );
}

const DrawerMenu = ({ isOpen, onClose }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size="auto"
      anchor={ANCHOR.left}
    >
      <AccountMenuItem name="Vishal Shinde" />
      <MenuItem>
        <img src={orderIcon} width="20px" height="20px" alt="order icon" />
        <Space horizontal size={2} />
        Orders
      </MenuItem>
      <MenuItem>
        <img src={favoriteIcon} width="20px" height="20px" alt="favorite icon" />
        <Space horizontal size={2} />
        Favorite
      </MenuItem>
    </Drawer>
  )
}

export default DrawerMenu;

