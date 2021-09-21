import React from 'react';
import {Grid, Cell} from 'baseui/layout-grid';
import { useStyletron } from 'baseui';
import { Button } from "baseui/button";
import { Link,useRouteMatch } from 'react-router-dom';

import Centered from '../../Atoms/Centered';

const RestaurantProfile = () => {
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
            <h1>Restaurant</h1>
          </Cell>
          <Cell span={3}>
            <Link to={`${url}edit`}>
              <Button>Edit Details</Button>
            </Link>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Name</h3>
          </Cell>
          <Cell span={9}>
            <p>Swathi Tiffins</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Location</h3>
          </Cell>
          <Cell span={9}>
            <p>1202 Apollo Way, Sunnyvale, CA 94085</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Description</h3>
          </Cell>
          <Cell span={9}>
            <p>Love mango lassi takeout as much as the rest of your city? You'll be happy to know it's offered at Swathi Tiffins. Wondering what to order? The mysore masala dosa is one of the things users order the most and the idli and the mysore bajji are two of the items most commonly ordered together at this afternoon go-to. • $ • Indian • Vegetarian • Vegetarian Friendly • Healthy</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Contact Information</h3>
          </Cell>
          <Cell span={9}>
            <p>Swathi Tiffins</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Pictures</h3>
          </Cell>
          <Cell span={9}>Swathi Tiffins</Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Dishes</h3>
          </Cell>
          <Cell span={9}>Swathi Tiffins</Cell>
        </Grid>
        <Grid>
          <Cell span={3}>
            <h3>Timings</h3>
          </Cell>
          <Cell span={9}>
            <h4>Sunday - Monday</h4>
            09:30 AM - 09:00 PM	 • Menu
            09:30 AM - 09:00 PM	 • Indo Chinese Menu
            <h4>Tuesday</h4>
            09:30 AM - 09:00 PM	 • Menu
            11:30 AM - 09:00 PM	 • Indo Chinese Menu
            <h4>Wednesday - Saturday</h4>
            09:30 AM - 09:00 PM	 • Menu
            09:30 AM - 09:00 PM	 • Indo Chinese Menu
          </Cell>
        </Grid>
      </div>
    </Centered>
  );
}

export default RestaurantProfile;
