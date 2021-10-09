import React from 'react';
import { styled } from 'styletron-react';
import { useStyletron } from 'baseui';

import vegIcon from '../assets/veg.svg';
import veganIcon from '../assets/vegan.svg';
import nonVegIcon from '../assets/meat.svg';

const ListItem = styled('li', {
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80px',
  padding: '8px',
  cursor: 'pointer'
});

const BoldText = styled('p', {
  fontSize: '14px',
  fontWeight: 'bold'
});

const FoodTypeFilter = () => {
  const [css] = useStyletron();
  return (
    <ul className={css({ padding: '16px', borderBottom: '1px solid rgb(226, 226, 226)' })}>
      <ListItem>
        <img height="36" src={vegIcon} alt="veg icon" />
        <BoldText>Veg</BoldText>
      </ListItem>
      <ListItem>
        <img height="36" src={nonVegIcon} alt="non veg icon" />
        <BoldText>Non Veg</BoldText>
      </ListItem>
      <ListItem>
        <img height="36" src={veganIcon} alt="vegan icon" />
        <BoldText>Vegan</BoldText>
      </ListItem>
    </ul>
  );
}

export default FoodTypeFilter;