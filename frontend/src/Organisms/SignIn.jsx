import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";

import Centered from '../Atoms/Centered';
import BrandLogo from '../Atoms/BrandLogo';
import Space from '../Atoms/Space';

import { USER_TYPE } from '../utils/constants';
import { fetchUser } from '../store/thunks/user';

const SignIn = () => {
  const [css] = useStyletron();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();

  const onSubmit = data => {
    dispatch(fetchUser(data));
  };

  return (
    <Centered className={css({ marginTop: '64px' })} direction="column" vertical horizontal>
      <BrandLogo />
      <div className={css({
        width: '60%'
      })}>
        <h2>Welcome Back</h2>
        <span>Sign in with your email address.</span>
        <Space />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Email Address"
                clearOnEscape
              />
            )}
          />
          <Space />
          <Controller
            name="pwd"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Password"
                clearOnEscape
              />
            )}
          />
          <Space />
          <Controller
            name="accountRole"
            control={control}
            defaultValue={USER_TYPE.customer}
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroup
                {...field}
                align={ALIGN.horizontal}
              >
                <Radio value={USER_TYPE.customer}>Customer</Radio>
                <Radio value={USER_TYPE.restaurant}>Restaurant</Radio>
              </RadioGroup>
            )}
          />
          <Space size="2" />
          <Button className={css({ width: '100%' })}>Sign In</Button>
        </form>
        <p>
          New to Uber?
          <StyledLink href="/sign-up">
            Create an account
          </StyledLink>
        </p>
      </div>
    </Centered>
  )
}

export default SignIn;