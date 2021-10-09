import React from 'react';
import { useStyletron } from 'baseui';
import LinesEllipsis from 'react-lines-ellipsis';

import Centered from '../Atoms/Centered';
import Space from '../Atoms/Space';
import AdderRemover from '../Atoms/AdderRemover';

const DishCard = ({
  imageUrl,
  name,
  description,
  price,
  quantity,
  onAddItem,
  onRemoveItem
}) => {
  const [css] = useStyletron();  

  return (
    <Centered
      className={css({ height: '120px', padding: '16px', border: '1px solid rgb(226, 226, 226)' })}
    >
      <Centered direction="column" className={css({ justifyContent: 'space-between' })}>
        <div>
          <div className={css({ fontWeight: 'bold' })}>{name}</div>
          <Space />
          <LinesEllipsis
            className={css({ color: '#545454' })}
            text={description}
            maxLine='2'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />
        </div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: '16px'
          })}
        >
          <div>{`$${price}`}</div>
          <div>
            <AdderRemover
              quantity={quantity}
              onAdd={onAddItem}
              onRemove={onRemoveItem}
            />
          </div>
        </div>
      </Centered>
      {imageUrl && (
        <img
          src={imageUrl}
          className={css({ width: '158px', objectFit: 'cover' })}
          alt="Dish image"
        />
      )}
    </Centered>
  );
}

export default DishCard;