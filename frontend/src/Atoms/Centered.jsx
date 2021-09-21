import React from 'react';
import { useStyletron } from 'baseui';

const Centered = ({
  className,
  direction = 'row',
  vertical,
  horizontal,
  children,
  width = 'auto',
  height = '100%'
}) => {
  const [css] = useStyletron();

  return (
    <div className={`${className} ${css({
      display: 'flex',
      flexDirection: direction,
      justifyContent: horizontal && 'center',
      alignItems: vertical && 'center',
      height,
      width
    })}`}>
      {children}
    </div>
  )
}

export default Centered;
