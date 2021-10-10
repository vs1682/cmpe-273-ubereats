import React from 'react';
import { useStyletron } from 'baseui';
import { Radio } from 'baseui/radio';

import locationIcon from '../assets/location.svg';

const AddressItem = ({
  id,
  address
}) => {
  const [css] = useStyletron();

  return (
    <div className={css({
      display: 'flex',
      alignItems: 'center'
    })}>
      <img
        className={css({ marginLeft: '16px' })}
        src={locationIcon}
        width="24px"
        height="24px"
      />
      <div className={css({
        marginLeft: '16px',
        padding: '8px',
        borderBottom: '1px solid rgb(226, 226, 226)'
      })}>
        {address}
      </div>
    </div>
  )
}

export default AddressItem;
