import React from 'react';
import { FormControl } from 'baseui/form-control';
import { Input } from "baseui/input";
import { Textarea } from 'baseui/textarea';
import { DatePicker } from 'baseui/datepicker';
import { Select } from 'baseui/select';

const controlMap = {
  input: Input,
  textarea: Textarea,
  datePicker: DatePicker,
  select: Select
};


const FormGroup = ({ control, controlProps, ...restProps }) => {
  const Control = controlMap[control];

  return (
    <FormControl {...restProps}>
      <Control {...controlProps} />
    </FormControl>
  )
}

export default FormGroup;