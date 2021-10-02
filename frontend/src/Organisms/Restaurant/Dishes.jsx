import React, { useEffect, useState } from 'react';
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

import DishApi from '../../api/dish';

const Dishes = () => {
  const [css] = useStyletron();
  const [ allowDelete, setAllowDelete ] = useState(false);
  const [ showEditIconFor, setShowEditIconFor ] = useState(null);
  const [ openDishModalFor, setOpenDishModalFor ] = useState(null);
  const [ dishesDetails, setDishDetails ] = useState({});
  const [ checkedDishes, setCheckedDishes ] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpenedFor, setModalOpenedFor] = useState(null);

  const onCheckDish = (e, id) => {
    if (e.target.checked) {
      setCheckedDishes([...checkedDishes, id]);
    } else {
      setCheckedDishes(checkedDishes.filter(d => d != id));
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      const data = await DishApi.getCategories();
  
      if (data && data.length > 0) {
        setCategories(data);
      }
    }

    getCategories();
  }, [])

  useEffect(() => {
    // Make api call
    const getAllDishes = async () => {
      const { credId } = JSON.parse(localStorage.getItem('user'));
      const data = await DishApi.getAll(credId);
  
      if (data && data.length > 0) {
        setDishDetails(_.groupBy(data, d => d.category));
      }
    }

    if (categories.length) {
      getAllDishes();    
    }
  }, [categories.length]);

  const categoryMap = _.keyBy(categories, 'id');

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
              setAllowDelete(!allowDelete);
            } else {
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
          {openDishModalFor && (
            <DishFormModal
              dishId={openDishModalFor}
              isOpen={!!openDishModalFor}
              onClose={() => setOpenDishModalFor(null)}
              onSubmitForm={() => {}}
            />
          )}
        </Centered>
      ))}
    </div>
  )
}

export default Dishes;
