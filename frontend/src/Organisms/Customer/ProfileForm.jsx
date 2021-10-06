import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { Cell, Grid } from 'baseui/layout-grid';

import Space from '../../Atoms/Space';
import FormGroup from '../../Molecule/FormGroup';
import ImageUploader from '../../Molecule/ImageUploader';

import useUploadImage from '../../hooks/useUploadImage';
import { fetchCountries, fetchStates, fetchCities } from '../../store/thunks/countries';
import { updateCustomerProfile } from '../../store/thunks/customer';
import { URLS } from '../../utils/constants';

const ProfileForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [css] = useStyletron();
  const { handleSubmit, reset, watch, control } = useForm();
  const profile = useSelector(state => state.customer.profile);
  const countries = useSelector(state => state.countries.countries);
  const states = useSelector(state => state.countries.states);
  const cities = useSelector(state => state.countries.cities);
  const [imgUrl, onUploadImg] = useUploadImage(profile.profilePicUrl);

  const country = watch('country');
  const state = watch('state');

  const onSubmit = async (data) => {
    dispatch(updateCustomerProfile({
      ...profile,
      ..._.omitBy(data, v => !v),
      dob: data.dob.date,
      profilePicUrl: imgUrl,
      country: _.get(data, 'country.option.id'),
      state: _.get(data, 'state.option.id'),
      city: _.get(data, 'city.option.id')
    }))

    if (profile) {
      history.push(URLS.customer.base);
    }
  }

  const createSelectValue = (id, label) => {
    return {
      value: [{ id, label}],
      option: { id, label}
    };
  }

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  useEffect(() => {
    if (country && country.option) {
      dispatch(fetchStates({ country: country.option.id }));
    }
  }, [country]);

  useEffect(() => {
    if (state && state.option) {
      dispatch(fetchCities({ country: country.option.id, state: state.option.id }));
    }
  }, [state]);

  useEffect(() => {
    if (profile) {
      const countryMap = _.keyBy(countries, 'iso3');
      const stateMap = _.keyBy(states, 'state_code');
      const cityMap = _.keyBy(cities, 'id');

      reset({
        fullname: profile.fullname,
        email: profile.email,
        dob: profile.dob ? {date: new Date(profile.dob)} : '',
        phone: profile.phone,
        country: profile.country && createSelectValue(profile.country, countryMap[profile.country]),
        state: profile.state && createSelectValue(profile.state, stateMap[profile.state]),
        city: profile.city && createSelectValue(profile.city, cityMap[profile.city])
      });
    }
  }, [profile]);

  return (
    <div className={css({ padding: '64px' })}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Cell span={8}>
            <h2>Edit Details</h2>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={8}>
            <Grid>
            <Cell span={12}>
              <Controller
                name="fullname"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <FormGroup
                    control="input"
                    controlProps={{
                      ...field
                    }}
                    label="Full Name"
                  />
                )}
              />
            </Cell>
          </Grid>
            <Grid>
              <Cell span={12}>
                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormGroup
                      control="datePicker"
                      controlProps={{
                        ...field,
                        value: _.get(field, 'value.date') ? new Date(field.value.date) : ''
                      }}
                      label="DoB"
                    />
                  )}
                />
              </Cell>
            </Grid>
            <Grid>
              <Cell span={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormGroup
                      control="input"
                      controlProps={{
                        ...field
                      }}
                      label="Email"
                    />
                  )}
                />
              </Cell>
            </Grid>
            <Grid>
              <Cell span={12}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormGroup
                      control="input"
                      controlProps={{
                        ...field
                      }}
                      label="Phone Number"
                    />
                  )}
                />
              </Cell>
            </Grid>
            <Grid>
              <Cell span={12}>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormGroup
                      control="select"
                      controlProps={{
                        options: countries.map(c => ({ id: c.iso3, label: c.name })),
                        ...field,
                        value: field.value != undefined ? field.value.value : []
                      }}
                      label="Country"
                    />
                  )}
                />
              </Cell>
            </Grid>
            <Grid>
              <Cell span={12}>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormGroup
                      control="select"
                      controlProps={{
                        options: states.map(s => ({ id: s.state_code, label: s.name })),
                        ...field,
                        value: field.value != undefined ? field.value.value : []
                      }}
                      label="State"
                    />
                  )}
                />
              </Cell>
            </Grid>
            <Grid>
              <Cell span={12}>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormGroup
                      control="select"
                      controlProps={{
                        options: cities.map(c => ({ id: c.id, label: c.name })),
                        ...field,
                        value: field.value != undefined ? field.value.value : []
                      }}
                      label="City"
                    />
                  )}
                />
              </Cell>
            </Grid>
            <Space />
            <Grid>
          <Cell span={12}>
            <Button type="submit">Save Details</Button>
          </Cell>
        </Grid>
          </Cell>
          <Cell span={4}>
            <ImageUploader
              imageSrc={imgUrl}
              onUpload={onUploadImg}
            />
          </Cell>
        </Grid>
      </form>
    </div>
  );
}

export default ProfileForm;
