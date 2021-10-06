import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {Grid, Cell} from 'baseui/layout-grid';
import { useStyletron } from 'baseui';
import { Button } from "baseui/button";
import { Avatar } from "baseui/avatar";
import { Link,useRouteMatch } from 'react-router-dom';

import Centered from '../../Atoms/Centered';
import { fetchCustomerProfile } from '../../store/thunks/customer';
import { fetchDetails } from '../../store/thunks/countries';

const Profile = () => {
  const dispatch = useDispatch();
  const [css] = useStyletron();
  const { url } = useRouteMatch();
  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.customer.profile || {});
  const countryDetails = useSelector(state => state.countries.details || {});

  useEffect(() => {
    dispatch(fetchCustomerProfile(user.credId));
  }, []);

  useEffect(() => {
    if (profile && profile.credId) {
      dispatch(fetchDetails({
        country: profile.country,
        state: profile.state,
        city: profile.city
      }));
    }
  }, [profile]);

  return (
    <Centered
      direction="column"
      width="90%"
      height="auto"
      horizontal
      className={css({
        margin: '32px'
      })}
    >
      <div>
        <Grid>
          <Cell span={3}>
            <h1>Profile Details</h1>
          </Cell>
          <Cell span={3}>
            <Link to={`${url}/edit`}>
              <Button>Edit Details</Button>
            </Link>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={9}>
            <Avatar
              name="Vishal Shinde"
              size="scale1600"
              src={profile.profilePicUrl}
            />
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Name</h3>
          </Cell>
          <Cell span={9}>
            <p>{profile.fullname}</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>DoB</h3>
          </Cell>
          <Cell span={9}>
            <p>{profile.dob}</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>City</h3>
          </Cell>
          <Cell span={9}>
            <p>{_.get(countryDetails, 'city.name')}</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>State</h3>
          </Cell>
          <Cell span={9}>
            <p>{_.get(countryDetails, 'state.name')}</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Country</h3>
          </Cell>
          <Cell span={9}>
            <p>{_.get(countryDetails, 'country.name')}</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Email</h3>
          </Cell>
          <Cell span={9}>
            <p>{profile.email}</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Phone number</h3>
          </Cell>
          <Cell span={9}>
            <p>{profile.phone}</p>
          </Cell>
        </Grid>
      </div>
    </Centered>
  );
}

export default Profile;
