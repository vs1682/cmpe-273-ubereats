import React from 'react';
import { styled } from 'baseui';
import { useStyletron } from 'styletron-react';
import { CheckIndeterminate, Plus } from "baseui/icon";

const Operator = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#ebebeb',
  cursor: 'pointer',
});

const AdderRemover = ({ quantity = 0, onAdd, onRemove }) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80px'
      })}
    >
      <Operator onClick={onRemove}>
        <CheckIndeterminate />
      </Operator>
      <div className={css({ margin: '0 4px' })}>
      {quantity}
      </div>
      <Operator onClick={onAdd}>
        <Plus />
      </Operator>
    </div>  
  );
}

export default AdderRemover;
