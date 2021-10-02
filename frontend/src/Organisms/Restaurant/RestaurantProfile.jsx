import React, { useState, useEffect } from 'react';
import {Grid, Cell} from 'baseui/layout-grid';
import { useStyletron } from 'baseui';
import { Button } from "baseui/button";
import { Spinner } from "baseui/spinner";
import { Link,useRouteMatch } from 'react-router-dom';

import RestaurantApi from '../../api/restaurant';
import Centered from '../../Atoms/Centered';

const RestaurantProfile = () => {
  const [ profile, setProfile ] = useState({});
  const [css] = useStyletron();
  const { url } = useRouteMatch();

  useEffect(() => {
    const getProfile = async () => {
      const restaurant = JSON.parse(localStorage.getItem('user'));
      const profile = await RestaurantApi.getProfile(restaurant.credId);
  
      if (profile.credId) {
        setProfile(profile);
      }
    }

    if (localStorage.getItem('user')) {
      getProfile();
    }
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
            <img
              className={css({
                width: '100%',
                height: '240px',
                objectFit: 'cover'
              })}
              src="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC81YzkyNmU0Mi03NDE3LTRlYWQtOGM3OC04MDZjYTQzMTg2ZWM="
            />
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
