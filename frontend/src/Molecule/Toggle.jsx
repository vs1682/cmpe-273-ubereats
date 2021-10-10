import React, { useState } from 'react';
import { styled } from 'baseui';
import { useStyletron } from 'styletron-react';

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  width: '180px',
  height: '48px',
  borderRadius: '24px',
  backgroundColor: 'rgb(238, 238, 238)',
  cursor: 'pointer'
});

const Mover = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '4px',
  left: '4px',
  width: '90px',
  height: '40px',
  borderRadius: '20px',
  backgroundColor: '#ffffff',
  transition: 'left 1s',
  cursor: 'pointer'
});

const Toggle = ({ onToggle, options }) => {
  const [css] = useStyletron();
  const [moveDirection, setMoveDirection] = useState('LEFT');
  const onClickToggle = () => {
    setMoveDirection(moveDirection === 'RIGHT' ? 'LEFT' : 'RIGHT');

    if (onToggle) {
      onToggle(moveDirection === 'RIGHT' ? options[0].value : options[1].value);
    }
  }

  return (
    <Container onClick={onClickToggle}>
      <Mover style={{ left: moveDirection === 'RIGHT' ? '86px' : '4px' }}>
        {moveDirection === 'RIGHT' ? options[1].label : options[0].label}
      </Mover>
      <div className={css({ marginLeft: '24px' })}>
        {moveDirection === 'RIGHT' ? options[0].label : ''}
      </div>
      <div className={css({ marginRight: '24px' })}>
        {moveDirection === 'LEFT' ? options[1].label : ''}
      </div>
    </Container>
  );
}

export default Toggle;
