import React from 'react';
import {useStyletron} from 'baseui';

import uberEatsImg from '../assets/uber-eats.svg';

const BrandLogo = ({ height = '32px' }) => {
  const [css] = useStyletron();

  return (
    <img
      className={css({
        height,
        width: 'auto'
      })}
      src={uberEatsImg}
      alt="brand image"
    />
  );
}

export default BrandLogo;