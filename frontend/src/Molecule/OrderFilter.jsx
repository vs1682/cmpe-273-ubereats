import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Select, SIZE } from "baseui/select";

const OrderFilter = ({
  status,
  onChange,
  size = SIZE.default,
  isFilter
}) => {
  const orderStatuses = useSelector(state => state.order.statuses);
  const statuses = [...orderStatuses];
  if (isFilter) {
    statuses.unshift({ id: 'ALL', name: 'ALL' });
    if (!status) {
      status = 'ALL';
    }
  }

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
