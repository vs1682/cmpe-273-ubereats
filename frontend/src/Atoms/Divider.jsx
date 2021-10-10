import React from 'react';
import { useStyletron } from 'baseui';

const Divider = ({ size = 2 }) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        width: '100%',
        borderBottom: `${size}px solid rgb(226, 226, 226)`
      })}
    ></div>
  );
}

export default Divider;
