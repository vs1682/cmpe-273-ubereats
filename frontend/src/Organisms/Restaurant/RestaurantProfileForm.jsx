import React from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useStyletron } from 'baseui';
import { Input } from "baseui/input";
import { Button } from 'baseui/button';
import { Textarea } from 'baseui/textarea';
import { Cell, Grid } from 'baseui/layout-grid';

import RestaurantApi from '../../api/restaurant';
import Space from '../../Atoms/Space';

const RestaurantProfileForm = () => {
  const history = useHistory();
  const [css] = useStyletron();
  const { handleSubmit, control } = useForm();
  const onSubmit = async (data) => {
    const restaurant = JSON.parse(localStorage.getItem('user'));
    const profile = await RestaurantApi.updateProfile({
      ...restaurant, ..._.omitBy(data, v => !v)
    });

    if (profile) {
      history.push('/restaurant');
    }
  }

  return (
    <div className={css({ padding: '64px' })}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Cell span={8}>
            <h2>Edit Restaurant Details</h2>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={4}>
            <Controller
              name="fullname"
              control={control}
              defaultValue=""
              render={({ field }) => <Input placeholder="Restaurant Name" {...field} />}
            />
          </Cell>
          <Cell span={4}>
            <Controller
              name="location"
              control={control}
              defaultValue=""
              render={({ field }) => <Input placeholder="Location" {...field} />}
            />
          </Cell>
        </Grid>
        <Space />
        <Grid>
          <Cell span={8}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea placeholder="Restaurant Description" {...field} />}
            />
          </Cell>
        </Grid>
        <Space />
        <Grid>
          <Cell span={8}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Textarea placeholder="Contact Information" {...field} />}
            />
          </Cell>
        </Grid>
        <Space />
        <Grid>
          <Cell span={8}>
            <Controller
              name="timings"
              control={control}
              render={({ field }) => <Textarea placeholder="Timings" {...field} />}
            />
          </Cell>
        </Grid>
        <Space />
        <Grid>
          <Cell span={8}>
            <Button>Save Details</Button>
          </Cell>
        </Grid>
      </form>
    </div>
  );
}

export default RestaurantProfileForm;

