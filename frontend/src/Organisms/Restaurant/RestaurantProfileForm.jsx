import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useStyletron } from 'baseui';
import { Input } from "baseui/input";
import { Button } from 'baseui/button';
import { Textarea } from 'baseui/textarea';
import { Cell, Grid } from 'baseui/layout-grid';

import Space from '../../Atoms/Space';

const RestaurantProfileForm = () => {
  const [css] = useStyletron();
  const { handleSubmit, control } = useForm();
  const onSubmit = data => console.log(data);

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
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => <Input placeholder="Restaurant Name" {...field} />}
            />
          </Cell>
          <Cell span={4}>
            <Controller
              name="location"
              control={control}
              defaultValue=""
              rules={{ required: true }}
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
              rules={{ required: true }}
              render={({ field }) => <Textarea placeholder="Restaurant Description" {...field} />}
            />
          </Cell>
        </Grid>
        <Space />
        <Grid>
          <Cell span={8}>
            <Controller
              name="contactInfo"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Textarea placeholder="Contact Information" {...field} />}
            />
          </Cell>
        </Grid>
        <Space />
        <Grid>
          <Cell span={8}>
            <Controller
              name="dishes"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Textarea placeholder="Dishes" {...field} />}
            />
          </Cell>
        </Grid>
        <Space />
        <Grid>
          <Cell span={8}>
            <Controller
              name="timings"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Textarea placeholder="Timings" {...field} />}
            />
          </Cell>
        </Grid>
        <Space />
        <Grid>
          <Cell span={8}>
            <Button type="submit">Save Details</Button>
          </Cell>
        </Grid>
      </form>
    </div>
  );
}

export default RestaurantProfileForm;

