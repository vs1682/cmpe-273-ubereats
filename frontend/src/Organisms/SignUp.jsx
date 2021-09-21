import React from 'react';
import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";

import Centered from '../Atoms/Centered';
import BrandLogo from '../Atoms/BrandLogo';
import Space from '../Atoms/Space';

const SignUp = () => {
  const [css] = useStyletron();
  return (
    <Centered className={css({ marginTop: '64px' })} direction="column" vertical horizontal>
      <BrandLogo />
      <div className={css({
        width: '60%'
      })}>
        <h2>Let's get started</h2>
        <Space />
        <Input
          // value={value}
          // onChange={e => setValue(e.target.value)}
          placeholder="Full Name"
          clearOnEscape
        />
        <Space />
        <Input
          // value={value}
          // onChange={e => setValue(e.target.value)}
          placeholder="Email Address"
          clearOnEscape
        />
        <Space />
        <Input
          // value={value}
          // onChange={e => setValue(e.target.value)}
          type="password"
          placeholder="Password"
          clearOnEscape
        />
        <Space size="2" />
        <Button className={css({ width: '100%' })}>Sign Up</Button>
        <p>
          Already use Uber?
          <StyledLink href="/sign-in">
            Sign in
          </StyledLink>
        </p>
      </div>
    </Centered>
  )
}

export default SignUp;