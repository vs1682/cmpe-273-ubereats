import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Select, SIZE } from "baseui/select";

const OrderFilter = ({
  status,
  onChange,
  size = SIZE.default
}) => {
  const statuses = useSelector(state => state.order.statuses);
  const options = statuses.map(s => ({ id: s.id, label: s.name }));
  
  return (
    <Select
      options={options}
      size={size}
      value={options.filter(o => o.id === status)}
      searchable={false}
      placeholder="Order Status"
      onChange={params => onChange(_.get(params, 'option.id'))}
    />
  );
}

export { SIZE };
export default OrderFilter;
