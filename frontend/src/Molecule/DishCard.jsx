import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis'
import { useStyletron } from 'baseui';

import Centered from '../Atoms/Centered';
import Space from '../Atoms/Space';

const DishCard = ({
  imgUrl,
  name,
  description,
  price
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
        <div>{`$${price}`}</div>
      </Centered>
      <img
        src={imgUrl}
        className={css({ width: '158px', objectFit: 'cover' })}
        alt="Dish image"
      />
    </Centered>
  );
}

export default DishCard;