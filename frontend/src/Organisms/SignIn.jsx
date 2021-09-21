import React from 'react';
import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";

import Centered from '../Atoms/Centered';
import BrandLogo from '../Atoms/BrandLogo';
import Space from '../Atoms/Space';

const SignIn = () => {
  const [css] = useStyletron();
  return (
    <Centered className={css({ marginTop: '64px' })} direction="column" vertical horizontal>
      <BrandLogo />
      <div className={css({
        width: '60%'
      })}>
        <h2>Welcome Back</h2>
        <span>Sign in with your email address or mobile number.</span>
        <Space />
        <Input
          // value={value}
          // onChange={e => setValue(e.target.value)}
          placeholder="Email or Mobile number"
          clearOnEscape
        />
        <Space size="2" />
        <Button className={css({ width: '100%' })}>Next</Button>
        <p>
          New to Uber?
          <StyledLink href="https://baseweb.design">
            Create an account
          </StyledLink>
        </p>
      </div>
    </Centered>
  )
}

export default SignIn;