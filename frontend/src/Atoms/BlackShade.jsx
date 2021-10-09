import React from 'react';
import { useStyletron } from 'styletron-react';

const BlackShade = ({ children }) => {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        height: '98%',
        position: 'absolute',
        right: '0',
        top: '0',
        left: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.15)'
      })}
    >
      {children}
    </div>
  );
}

export default BlackShade;