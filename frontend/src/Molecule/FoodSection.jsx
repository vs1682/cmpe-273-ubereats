import React from 'react';
import { useStyletron } from 'baseui';
import {
  Display1,
  Display2,
  Display3,
  Display4,
} from 'baseui/typography';

import RestaurantCard from './RestaurantCard';

const restaurants = [
  {
    id: 1,
    imgUrl: 'https://d1ralsognjng37.cloudfront.net/5176bfe7-d608-4d6b-ad58-ba34d58bf573.jpeg',
    name: 'Starbucks',
    rating: 4.6,
    deliveryFee: 2.49,
    estDeliveryTime: '15-25m'
  },
  {
    id: 2,
    imgUrl: 'https://d1ralsognjng37.cloudfront.net/5176bfe7-d608-4d6b-ad58-ba34d58bf573.jpeg',
    name: 'Starbucks',
    rating: 4.6,
    deliveryFee: 2.49,
    estDeliveryTime: '15-25m'
  },
  {
    id: 3,
    imgUrl: 'https://d1ralsognjng37.cloudfront.net/5176bfe7-d608-4d6b-ad58-ba34d58bf573.jpeg',
    name: 'Starbucks',
    rating: 4.6,
    deliveryFee: 2.49,
    estDeliveryTime: '15-25m'
  },
  {
    id: 4,
    imgUrl: 'https://d1ralsognjng37.cloudfront.net/5176bfe7-d608-4d6b-ad58-ba34d58bf573.jpeg',
    name: 'Starbucks',
    rating: 4.6,
    deliveryFee: 2.49,
    estDeliveryTime: '15-25m'
  },
  {
    id: 5,
    imgUrl: 'https://d1ralsognjng37.cloudfront.net/5176bfe7-d608-4d6b-ad58-ba34d58bf573.jpeg',
    name: 'Starbucks',
    rating: 4.6,
    deliveryFee: 2.49,
    estDeliveryTime: '15-25m'
  },
  {
    id: 6,
    imgUrl: 'https://d1ralsognjng37.cloudfront.net/5176bfe7-d608-4d6b-ad58-ba34d58bf573.jpeg',
    name: 'Starbucks',
    rating: 4.6,
    deliveryFee: 2.49,
    estDeliveryTime: '15-25m'
  },
  {
    id: 7,
    imgUrl: 'https://d1ralsognjng37.cloudfront.net/5176bfe7-d608-4d6b-ad58-ba34d58bf573.jpeg',
    name: 'Starbucks',
    rating: 4.6,
    deliveryFee: 2.49,
    estDeliveryTime: '15-25m'
  }
];

const FoodSection = ({ heading = 'Favorites', desc = 'Nearby restaurants delivered for less' }) => {
  const [css] = useStyletron();

  return (
    <div>
      <Display4 className={css({ marginBottom: '8px' })}>{heading}</Display4>
      <span>{desc}</span>
      <div className={css({
        display: 'flex',
        overflow: 'auto'
      })}>
        {restaurants.map(r => (
          <div key={r.id} className={css({
            width: '200px',
            padding: '16px 16px 16px 0'
          })}>
            <RestaurantCard {...r} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodSection;
