import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useCart } from 'react-use-cart';
import {Grid, Cell} from 'baseui/layout-grid';
import { useStyletron } from 'baseui';
import { Spinner } from "baseui/spinner";

import { fetchRestaurant } from '../../store/thunks/restaurant';
import { fetchAllDishes, fetchDishCategories } from '../../store/thunks/dish';

import Centered from '../../Atoms/Centered';
import Space from '../../Atoms/Space';
import DishCard from '../../Molecule/DishCard';

const RestaurantProfileAndDishes = () => {
  const dispatch = useDispatch();
  const [css] = useStyletron();
  const { addItem, getItem, updateItemQuantity } = useCart();
  const { id: restaurantId } = useParams();
  const restaurant = useSelector(state => state.restaurant.selected || {});
  const dishes = useSelector(state => state.dish.all);
  const categories = useSelector(state => state.dish.categories);

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
  }, []);

  useEffect(() => {
    dispatch(fetchDishCategories());
  }, [])

  useEffect(() => {
    if (categories.length && restaurant) {
      dispatch(fetchAllDishes(restaurantId));
    }
  }, [categories.length, restaurant]);

  const renderDish = (d) => {
    const item = getItem(d.id);
    let onAddItem = () => addItem(d);
    let onRemoveItem = () => {};

    if (item) {
      onAddItem = () => updateItemQuantity(item.id, item.quantity + 1);
      onRemoveItem = () => updateItemQuantity(item.id, item.quantity - 1);
    }

    return (
      <div
        className={css({
          width: '400px',
          margin: '0 16px 16px 0'
        })}
      >
        <DishCard
          {...d}
          quantity={item && item.quantity}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      </div>
    );
  }

  const renderDishSection = ([category, dishes]) => {
    return (
      <Centered direction="column" className={css({ flexWrap: 'wrap', margin: '0 32px' })}>
        <h2>{categoryMap[category].name}</h2>
        <Space />
        <Centered height="auto" className={css({ flexWrap: 'wrap' })}>
          {dishes.map(renderDish)}
        </Centered>
      </Centered>
    );
  }

  const categoryMap = _.keyBy(categories, 'id');
  const dishesDetails = _.groupBy(dishes, d => d.category);

  return (
    <>
      {!restaurant && (
        <Centered horizontal vertical height="80vh">
          <Spinner />
        </Centered>
      )}
      {restaurant && (
        <>
          {restaurant.profilePicUrl && (<img
            className={css({
              width: '100%',
              height: '240px',
              objectFit: 'cover'
            })}
            src={restaurant.profilePicUrl}
          />)}
          <Centered
            direction="column"
            width="90%"
            height="auto"
            horizontal
            className={css({
              margin: '32px'
            })}
          >
            <div>
              <Grid>
                <Cell span={10}>
                  <h1>{restaurant.name}</h1>
                </Cell>
              </Grid>
              <Grid>
                <Cell span={9}>
                  <p>{restaurant.description}</p>
                </Cell>
              </Grid>
              <Grid>
                <Cell span={9}>
                  <p>{restaurant.location}</p>
                </Cell>
              </Grid>
              <Grid>
                <Cell span={9}>
                  <p>{restaurant.phone}</p>
                </Cell>
              </Grid>
              <Grid>
                <Cell span={9}>
                  {restaurant.timing}
                </Cell>
              </Grid>
            </div>
          </Centered>
          {_.entries(dishesDetails).map(renderDishSection)}
        </>
      )}
    </>
  );
}

export default RestaurantProfileAndDishes;
