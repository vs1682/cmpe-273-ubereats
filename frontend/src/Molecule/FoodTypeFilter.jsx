import React from 'react';
import { styled } from 'styletron-react';
import { useStyletron } from 'baseui';

import vegIcon from '../assets/veg.svg';
import veganIcon from '../assets/vegan.svg';
import nonVegIcon from '../assets/meat.svg';

const ListItem = styled('li', {
  display: 'inline-block',
  padding: '8px'
});

const FoodTypeFilter = () => {
  const [css] = useStyletron();
  return (
    <ul className={css({ padding: '16px', borderBottom: '1px solid rgb(226, 226, 226)' })}>
      <ListItem>
        <img height="36" src={vegIcon} alt="veg icon" />
      </ListItem>
      <ListItem>
        <img height="36" src={nonVegIcon} alt="veg icon" />
      </ListItem>
      <ListItem>
        <img height="36" src={veganIcon} alt="veg icon" />
      </ListItem>
    </ul>
  );
}

export default FoodTypeFilter;