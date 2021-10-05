import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Grid, Cell} from 'baseui/layout-grid';
import { useStyletron } from 'baseui';
import { Button } from "baseui/button";
import { Spinner } from "baseui/spinner";
import { Link,useRouteMatch } from 'react-router-dom';

import { fetchRestaurant } from '../../store/thunks/restaurant';

import Centered from '../../Atoms/Centered';

const RestaurantProfile = () => {
  const [css] = useStyletron();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.restaurant || {});

  useEffect(() => {
    dispatch(fetchRestaurant(user.credId));
  }, []);

  return (
    <>
      {!profile && (
        <Centered horizontal vertical height="80vh">
          <Spinner />
        </Centered>
      )}
      {profile && (
        <>
          <Grid>
            {profile.profilePicUrl && (<img
              className={css({
                width: '100%',
                height: '240px',
                objectFit: 'cover'
              })}
              src={profile.profilePicUrl}
            />)}
          </Grid>
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
                <Cell span={10}>
                  <h1>{profile.name}</h1>
                </Cell>
                <Cell span={2}>
                  <Link to={`${url}/edit`}>
                    <Button>Edit Details</Button>
                  </Link>
                </Cell>
              </Grid>
              <Grid>
                <Cell span={9}>
                  <p>{profile.description}</p>
                </Cell>
              </Grid>
              <Grid>
                <Cell span={9}>
                  <p>{profile.location}</p>
                </Cell>
              </Grid>
              <Grid>
                <Cell span={9}>
                  <p>{profile.phone}</p>
                </Cell>
              </Grid>
              <Grid>
                <Cell span={9}>
                  {profile.timing}
                </Cell>
              </Grid>
            </div>
          </Centered>
        </>
      )}
    </>
  );
}

export default RestaurantProfile;
