import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Select } from "baseui/select";

const OrderFilter = ({
  status,
  onChange
}) => {
  const statuses = useSelector(state => state.order.statuses);
  const options = statuses.map(s => ({ id: s.id, label: s.name }));
  return (
    <Select
      options={options}
      value={options.filter(o => o.id === status)}
      searchable={false}
      placeholder="Order Status"
      onChange={params => onChange(_.get(params, 'option.id'))}
    />
  );
}

export default OrderFilter;
