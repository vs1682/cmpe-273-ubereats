import React from 'react';
import { useStyletron } from "baseui";

const Space = ({ size=1, horizontal }) => {
  const [css] = useStyletron();
  const spaceSize = `${size*12}px`;

  return <div className={css({
    width: horizontal ? spaceSize : '100%',
    height: !horizontal ? spaceSize : '1px'
  })}></div>
}

export default Space;