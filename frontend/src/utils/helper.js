import _ from 'lodash';

export const changeIdKey = (data) => {
  if (_.isArray(data)) {
    data.forEach(d => {
      if(d._id) {
        d.id = d._id;
      }
    });
  }

  if(data._id) {
    data.id = data._id;
  }

  return data;
}