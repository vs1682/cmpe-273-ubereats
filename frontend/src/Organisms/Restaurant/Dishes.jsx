import React, { useEffect, useState } from 'react';
import _, { set } from 'lodash';
import { useStyletron } from 'baseui';
import { Checkbox } from "baseui/checkbox";
import { ButtonGroup } from "baseui/button-group";
import { Button } from "baseui/button";

import Centered from '../../Atoms/Centered';
import Space from '../../Atoms/Space';
import DishCard from '../../Molecule/DishCard';
import DishFormModal from './DishForm';
import editIcon from '../../assets/edit.svg';

const Dishes = () => {
  const [css] = useStyletron();
  const [ allowDelete, setAllowDelete ] = useState(false);
  const [ showEditIconFor, setShowEditIconFor ] = useState(null);
  const [ openDishModal, setOpenDishModal ] = useState(false);
  const [ dishesDetails, setDishDetails ] = useState([]);
  const [ checkedDishes, setCheckedDishes ] = useState([]);

  const onCheckDish = (e, id) => {
    if (e.target.checked) {
      setCheckedDishes([...checkedDishes, id]);
    } else {
      setCheckedDishes(checkedDishes.filter(d => d != id));
    }
  }

  useEffect(() => {
    // Make api call
    setDishDetails([
      {
        category: 'Picked for you',
        dishes: [
          {
            id: 1,
            name: 'Sandwich Cubano',
            description: 'Our traditional roasted pork, ham, swiss cheese. Mustard and pickles grilled and pressed. Served with your choice of 1 white rice, sweet plantains, black beans, and garden salad with vinaigrette (2 pieces), yuca frita (2 pieces), tostones (2 pieces), gandules (2 pieces), or moros (2 pieces).',
            price: '14',
            imgUrl: 'https://d1ralsognjng37.cloudfront.net/471aa833-1a62-4fe3-88a0-2f507dcbcbb7.jpeg'
          },
          {
            id: 2,
            name: 'Sandwich Cubano',
            description: 'Our traditional roasted pork, ham, swiss cheese. Mustard and pickles grilled and pressed. Served with your choice of 1 white rice, sweet plantains, black beans, and garden salad with vinaigrette (2 pieces), yuca frita (2 pieces), tostones (2 pieces), gandules (2 pieces), or moros (2 pieces).',
            price: '14',
            imgUrl: 'https://d1ralsognjng37.cloudfront.net/471aa833-1a62-4fe3-88a0-2f507dcbcbb7.jpeg'
          },
          {
            id: 3,
            name: 'Sandwich Cubano',
            description: 'Our traditional roasted pork, ham, swiss cheese. Mustard and pickles grilled and pressed. Served with your choice of 1 white rice, sweet plantains, black beans, and garden salad with vinaigrette (2 pieces), yuca frita (2 pieces), tostones (2 pieces), gandules (2 pieces), or moros (2 pieces).',
            price: '14',
            imgUrl: 'https://d1ralsognjng37.cloudfront.net/471aa833-1a62-4fe3-88a0-2f507dcbcbb7.jpeg'
          },
          {
            id: 4,
            name: 'Sandwich Cubano',
            description: 'Our traditional roasted pork, ham, swiss cheese. Mustard and pickles grilled and pressed. Served with your choice of 1 white rice, sweet plantains, black beans, and garden salad with vinaigrette (2 pieces), yuca frita (2 pieces), tostones (2 pieces), gandules (2 pieces), or moros (2 pieces).',
            price: '14',
            imgUrl: 'https://d1ralsognjng37.cloudfront.net/471aa833-1a62-4fe3-88a0-2f507dcbcbb7.jpeg'
          }
        ]
      },
      {
        category: 'Specials',
        dishes: [
          {
            id: 5,
            name: 'Sandwich Cubano',
            description: 'Our traditional roasted pork, ham, swiss cheese. Mustard and pickles grilled and pressed. Served with your choice of 1 white rice, sweet plantains, black beans, and garden salad with vinaigrette (2 pieces), yuca frita (2 pieces), tostones (2 pieces), gandules (2 pieces), or moros (2 pieces).',
            price: '14',
            imgUrl: 'https://d1ralsognjng37.cloudfront.net/471aa833-1a62-4fe3-88a0-2f507dcbcbb7.jpeg'
          },
          {
            id: 6,
            name: 'Sandwich Cubano',
            description: 'Our traditional roasted pork, ham, swiss cheese. Mustard and pickles grilled and pressed. Served with your choice of 1 white rice, sweet plantains, black beans, and garden salad with vinaigrette (2 pieces), yuca frita (2 pieces), tostones (2 pieces), gandules (2 pieces), or moros (2 pieces).',
            price: '14',
            imgUrl: 'https://d1ralsognjng37.cloudfront.net/471aa833-1a62-4fe3-88a0-2f507dcbcbb7.jpeg'
          },
          {
            id: 7,
            name: 'Sandwich Cubano',
            description: 'Our traditional roasted pork, ham, swiss cheese. Mustard and pickles grilled and pressed. Served with your choice of 1 white rice, sweet plantains, black beans, and garden salad with vinaigrette (2 pieces), yuca frita (2 pieces), tostones (2 pieces), gandules (2 pieces), or moros (2 pieces).',
            price: '14',
            imgUrl: 'https://d1ralsognjng37.cloudfront.net/471aa833-1a62-4fe3-88a0-2f507dcbcbb7.jpeg'
          },
          {
            id: 8,
            name: 'Sandwich Cubano',
            description: 'Our traditional roasted pork, ham, swiss cheese. Mustard and pickles grilled and pressed. Served with your choice of 1 white rice, sweet plantains, black beans, and garden salad with vinaigrette (2 pieces), yuca frita (2 pieces), tostones (2 pieces), gandules (2 pieces), or moros (2 pieces).',
            price: '14',
            imgUrl: 'https://d1ralsognjng37.cloudfront.net/471aa833-1a62-4fe3-88a0-2f507dcbcbb7.jpeg'
          }
        ]
      },
      {
        category: 'Appetizers (Aperitivos)',
        dishes: [
          {
            id: 9,
            name: 'Sandwich Cubano',
            description: 'Our traditional roasted pork, ham, swiss cheese. Mustard and pickles grilled and pressed. Served with your choice of 1 white rice, sweet plantains, black beans, and garden salad with vinaigrette (2 pieces), yuca frita (2 pieces), tostones (2 pieces), gandules (2 pieces), or moros (2 pieces).',
            price: '14',
            imgUrl: 'https://d1ralsognjng37.cloudfront.net/471aa833-1a62-4fe3-88a0-2f507dcbcbb7.jpeg'
          },
          {
            id: 10,
            name: 'Sandwich Cubano',
            description: 'Our traditional roasted pork, ham, swiss cheese. Mustard and pickles grilled and pressed. Served with your choice of 1 white rice, sweet plantains, black beans, and garden salad with vinaigrette (2 pieces), yuca frita (2 pieces), tostones (2 pieces), gandules (2 pieces), or moros (2 pieces).',
            price: '14',
            imgUrl: 'https://d1ralsognjng37.cloudfront.net/471aa833-1a62-4fe3-88a0-2f507dcbcbb7.jpeg'
          },
          {
            id: 11,
            name: 'Sandwich Cubano',
            description: 'Our traditional roasted pork, ham, swiss cheese. Mustard and pickles grilled and pressed. Served with your choice of 1 white rice, sweet plantains, black beans, and garden salad with vinaigrette (2 pieces), yuca frita (2 pieces), tostones (2 pieces), gandules (2 pieces), or moros (2 pieces).',
            price: '14',
            imgUrl: 'https://d1ralsognjng37.cloudfront.net/471aa833-1a62-4fe3-88a0-2f507dcbcbb7.jpeg'
          },
          {
            id: 12,
            name: 'Sandwich Cubano',
            description: 'Our traditional roasted pork, ham, swiss cheese. Mustard and pickles grilled and pressed. Served with your choice of 1 white rice, sweet plantains, black beans, and garden salad with vinaigrette (2 pieces), yuca frita (2 pieces), tostones (2 pieces), gandules (2 pieces), or moros (2 pieces).',
            price: '14',
            imgUrl: 'https://d1ralsognjng37.cloudfront.net/471aa833-1a62-4fe3-88a0-2f507dcbcbb7.jpeg'
          }
        ]
      }
    ])
  }, []);

  return (
    <div>
      <Centered className={css({ justifyContent: 'flex-end', padding: '16px' })}>
        <ButtonGroup>
          <Button>Add</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </Centered>
      {dishesDetails.map(({ category, dishes }) => (
        <Centered direction="column">
          <h2>{category}</h2>
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
                    {d.id === showEditIconFor && (
                      <div onClick={() => setOpenDishModal(true)}>
                        <img src={editIcon} width={24} height={24} />
                      </div>
                    )}
                  </div>
              </div>
            ))}
          </Centered>
          <DishFormModal
            isOpen={openDishModal}
            onClose={() => setOpenDishModal(false)}
          />
        </Centered>
      ))}
    </div>
  )
}

export default Dishes;
