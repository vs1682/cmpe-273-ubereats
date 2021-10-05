import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useStyletron } from 'baseui';
import { Input } from "baseui/input";
import { Button } from 'baseui/button';
import { Textarea } from 'baseui/textarea';
import { Cell, Grid } from 'baseui/layout-grid';

import Space from '../../Atoms/Space';
import ImageUploader from '../../Molecule/ImageUploader';

import useUploadImage from '../../hooks/useUploadImage';
import { URLS } from '../../utils/constants';
import { updateRestaurant } from '../../store/thunks/restaurant';


const RestaurantProfileForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleSubmit, reset, control } = useForm();
  const [css] = useStyletron();
  const profile = useSelector(state => state.restaurant || {});
  const [imgUrl, onUploadImg] = useUploadImage(profile.profilePicUrl);

  const onSubmit = async (data) => {
    dispatch(updateRestaurant({
      ...profile,
      ..._.omitBy(data, v => !v),
      profilePicUrl: imgUrl
    }))

    if (profile) {
      history.push(URLS.restaurant.base);
    }
  }

  useEffect(() => {
    reset({
      fullname: profile.name,
      location: profile.location,
      description: profile.description,
      phone: profile.phone,
      timings: profile.timing,
    });
  }, [profile]);

  return (
    <div className={css({ padding: '64px' })}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Cell span={8}>
            <h2>Edit Restaurant Details</h2>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={8}>
            <Grid>
              <Cell span={6}>
                <Controller
                  name="fullname"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input placeholder="Restaurant Name" {...field} />}
                />
              </Cell>
              <Cell span={6}>
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
              <Cell span={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => <Textarea placeholder="Restaurant Description" {...field} />}
                />
              </Cell>
            </Grid>
            <Space />
            <Grid>
              <Cell span={12}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => <Textarea placeholder="Contact Information" {...field} />}
                />
              </Cell>
            </Grid>
            <Space />
            <Grid>
              <Cell span={12}>
                <Controller
                  name="timings"
                  control={control}
                  render={({ field }) => <Textarea placeholder="Timings" {...field} />}
                />
              </Cell>
            </Grid>
          </Cell>
          <Cell span={4}>
            <ImageUploader imageSrc={imgUrl} onUpload={onUploadImg}/>
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

