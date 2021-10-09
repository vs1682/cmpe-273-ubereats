import React from 'react';
import { useStyletron } from 'baseui';
import { Display4 } from 'baseui/typography';
import { Link } from 'react-router-dom';

import RestaurantCard from './RestaurantCard';
import { URLS } from '../utils/constants';

const FoodSection = ({
  heading,
  desc,
  restaurants = [],
  onAddFavorite
}) => {
  const [css] = useStyletron();

  return (
    <div>
      {heading && (<Display4 className={css({ marginBottom: '8px' })}>{heading}</Display4>)}
      {desc && (<span>{desc}</span>)}
      <div className={css({
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 16px'
      })}>
        {restaurants.map(r => (
          <Link
            className={css({
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit'
            })}
            to={`${URLS.restaurant.base}/${r.credId}`}
          >
            <div key={r.id} className={css({
              width: `${(window.innerWidth / restaurants.length)}px`,
              minWidth: '160px',
              padding: '16px 16px 16px 0',
            })}>
              <RestaurantCard
                {...r}
                estDeliveryTime="25-35m"
                onAddFavorite={() => onAddFavorite(r.credId)}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FoodSection;
