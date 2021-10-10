import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useStyletron } from 'baseui';
import { Checkbox } from "baseui/checkbox";
import { ButtonGroup } from "baseui/button-group";
import { Button } from "baseui/button";

import Centered from '../../Atoms/Centered';
import Space from '../../Atoms/Space';
import DishCard from '../../Molecule/DishCard';
import DishFormModal from './DishForm';
import editIcon from '../../assets/edit.svg';

import {
  deleteDishes,
  fetchAllDishes,
  fetchDishCategories,
  fetchDishTypes
} from '../../store/thunks/dish';
import { removeDish } from '../../store/slices/dish';

const Dishes = () => {
  const [css] = useStyletron();
  const dispatch = useDispatch();
  const restaurant = useSelector(state => state.restaurant);
  const dishes = useSelector(state => state.dish.all);
  const categories = useSelector(state => state.dish.categories);
  const [ allowDelete, setAllowDelete ] = useState(false);
  const [ showEditIconFor, setShowEditIconFor ] = useState(null);
  const [ openDishModalFor, setOpenDishModalFor ] = useState(null);
  const [ checkedDishes, setCheckedDishes ] = useState([]);
  const [modalOpenedFor, setModalOpenedFor] = useState(null);

  const onCheckDish = (e, id) => {
    if (e.target.checked) {
      setCheckedDishes([...checkedDishes, id]);
    } else {
      setCheckedDishes(checkedDishes.filter(d => d != id));
    }
  }

  const onDeleteDishes = () => {
    dispatch(deleteDishes({ restId: restaurant.credId, ids: checkedDishes }));
  }

  // useEffect(() => {
  //   dispatch(fetchDishCategories());
  //   dispatch(fetchDishTypes());
  // }, [])

  useEffect(() => {
    if (categories.length) {
      dispatch(fetchAllDishes(restaurant.credId));
    }
  }, [categories.length]);

  const categoryMap = _.keyBy(categories, 'id');
  const dishesDetails = _.groupBy(dishes, d => d.category);

  return (
    <div>
      <Centered className={css({ justifyContent: 'flex-end', padding: '16px' })}>
        <ButtonGroup
          selected={modalOpenedFor}
          onClick={(e, idx) => {
            if (modalOpenedFor === idx) {
              setModalOpenedFor(null);
            } else {
              setModalOpenedFor(idx);
            }

            if (idx === 1) {
              if (allowDelete) {
                onDeleteDishes();
              }

              setAllowDelete(!allowDelete);
            } else {
              dispatch(removeDish());
              setOpenDishModalFor('NEW');
            }
          }}
        >
          <Button>Add</Button>
          <Button>{!allowDelete ? 'Delete' : 'Delete Selected'}</Button>
        </ButtonGroup>
      </Centered>
      {_.entries(dishesDetails).map(([category, dishes]) => (
        <Centered direction="column">
          <h2>{categoryMap[category].name}</h2>
          <Space />
          <Centered height="auto" className={css({ flexWrap: 'wrap' })}>
            {dishes.map(d => (
              <div
                className={css({
                  position: 'relative',
                  width: '400px',
                  margin: '0 16px 16px 0'
                })}
                onMouseEnter={() => setShowEditIconFor(d.id)}
                onMouseLeave={() => setShowEditIconFor(null)}
              >
                <DishCard {...d} />
                <div className={css({
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    cursor: 'pointer'
                  })}>
                    {allowDelete && (
                      <Checkbox
                        checked={checkedDishes.includes(d.id)}
                        onChange={e => onCheckDish(e, d.id)}
                      />
                    )}
                    {!allowDelete && d.id === showEditIconFor && (
                      <div onClick={() => setOpenDishModalFor(d.id)}>
                        <img src={editIcon} width={24} height={24} />
                      </div>
                    )}
                  </div>
              </div>
            ))}
          </Centered>
        </Centered>
      ))}
      {openDishModalFor && (
        <DishFormModal
          dishId={openDishModalFor}
          isOpen={!!openDishModalFor}
          onClose={() => {
            dispatch(removeDish());
            setOpenDishModalFor(null);
          }}
          onSubmitForm={() => {}}
        />
      )}
    </div>
  )
}

export default Dishes;
