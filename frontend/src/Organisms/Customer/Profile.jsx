import React from 'react';
import {Grid, Cell} from 'baseui/layout-grid';
import { useStyletron } from 'baseui';
import { Button } from "baseui/button";
import { Avatar } from "baseui/avatar";
import { Link,useRouteMatch } from 'react-router-dom';

import Centered from '../../Atoms/Centered';

const Profile = () => {
  const [css] = useStyletron();
  const { url } = useRouteMatch();

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
              src="https://source.boringavatars.com/marble/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51"
            />
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Name</h3>
          </Cell>
          <Cell span={9}>
            <p>Vishal Shinde</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>DoB</h3>
          </Cell>
          <Cell span={9}>
            <p>08/16/1992</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>City</h3>
          </Cell>
          <Cell span={9}>
            <p>San Jose</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>State</h3>
          </Cell>
          <Cell span={9}>
            <p>California</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Country</h3>
          </Cell>
          <Cell span={9}>
            <p>USA</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Email</h3>
          </Cell>
          <Cell span={9}>
            <p></p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Phone number</h3>
          </Cell>
          <Cell span={9}>
            <p>+16316339059</p>
          </Cell>
        </Grid>
      </div>
    </Centered>
  );
}

export default Profile;
