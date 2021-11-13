import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { styled } from 'styletron-react';
import { useStyletron } from 'baseui';

import vegIcon from '../assets/veg.svg';
import veganIcon from '../assets/vegan.svg';
import nonVegIcon from '../assets/meat.svg';

import { setDishFilters } from '../store/slices/filters';
import { fetchAllRestaurant } from '../store/thunks/restaurant';

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
  const dispatch = useDispatch();
  const [css] = useStyletron();
  const customer = useSelector(state => state.customer.profile);
  const dishTypes = useSelector(state => state.dish.types);
  const dishFilters = useSelector(state => state.filters.dish);
  const restaurantFilters = useSelector(state => state.filters.restaurant);

  const onSelectFilter = (typeId) => {
    const typeFilters = dishFilters.types;
    const newTypeFilters = typeFilters.includes(typeId)
    ? _.filter(typeFilters, t => t !== typeId)
    : [...typeFilters, typeId];

    dispatch(setDishFilters({
      ...dishFilters,
      types: newTypeFilters
    }));

    dispatch(fetchAllRestaurant({
      custId: customer.credId,
      filters: {...restaurantFilters, types: newTypeFilters}
    }));
  }

  const getIconMap = () => {
    if (!dishTypes || dishTypes.length == 0) {
      return {};
    }

    const dishTypesMap = _.keyBy(dishTypes, 'name');

    return {
      [dishTypesMap['Veg'].id]: vegIcon,
      [dishTypesMap['Non-Veg'].id]: nonVegIcon,
      [dishTypesMap['Vegan'].id]: veganIcon
    };
  }

  const iconMap = getIconMap();

  return (
    <ul className={css({ padding: '16px', borderBottom: '1px solid rgb(226, 226, 226)' })}>
      {dishTypes.map(type => {
        const isFilterSelected = _.get(dishFilters, 'types', []).includes(type.id);
        return (
          <ListItem
            key={type.id}
            className={css({ boxShadow: isFilterSelected ? '4px 4px 8px #545454' : '' })}
            onClick={() => onSelectFilter(type.id)}
          >
            <img height="36" src={iconMap[type.id]} alt="veg icon" />
            <BoldText>{type.name}</BoldText>
          </ListItem>
        );
      })}
    </ul>
  );
}

export default FoodTypeFilter;