import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Textarea } from 'baseui/textarea';
import { Button } from 'baseui/button';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE
} from 'baseui/modal';

import { addCustomerAddress } from '../../store/thunks/customer';

const AddAddressForm = ({
  onClose
}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [address, setAddress] = useState('');

  const onAddAddress = () => {
    dispatch(addCustomerAddress({
      custId: user.credId,
      address
    }));
    onClose();
  }

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Dialog: {
          style: {
            width: '40vw',
            // height: '80vh',
            display: 'flex',
            flexDirection: 'column',
          },
        }
      }}
    >
      <ModalHeader>Add New Address</ModalHeader>
      <ModalBody>
        <Textarea
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Enter a new address"
          clearOnEscape
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onAddAddress}>Save</ModalButton>
      </ModalFooter>
    </Modal>
  )
}

export default AddAddressForm;