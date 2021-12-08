import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import _ from "lodash";

import Centered from "../Atoms/Centered";
import BrandLogo from "../Atoms/BrandLogo";
import Space from "../Atoms/Space";

import { USER_TYPE } from "../utils/constants";
import { createUser } from "../store/thunks/user";
import { setUser } from "../store/slices/user";
import {
  signUpRestaurant as signUpRestaurantMutation,
  signUpCustomer as signUpCustomerMutation,
} from "../api/graphql/mutations";

const SignUp = () => {
  const [css] = useStyletron();
  const [userType, setUserType] = useState(USER_TYPE.customer);
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();
  const [signUpRestaurant, { data: restaurantData }] = useMutation(
    signUpRestaurantMutation,
    {
      fetchPolicy: "network-only",
    }
  );
  const [signUpCustomer, { data: customerData }] = useMutation(
    signUpCustomerMutation,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (userType === USER_TYPE.customer && customerData) {
      dispatch(
        setUser({
          ..._.get(_.omit(customerData, "signup.customer"), "signup"),
          ..._.get(customerData, "signup.customer"),
        })
      );
    }

    if (userType === USER_TYPE.restaurant && restaurantData) {
      dispatch(
        setUser({
          ..._.get(_.omit(restaurantData, "signup.restaurant"), "signup"),
          ..._.get(restaurantData, "signup.restaurant"),
        })
      );
    }
  }, [customerData, restaurantData]);

  const onSubmit = (data) => {
    if (userType === USER_TYPE.customer) {
      signUpCustomer({
        variables: data,
      });
    } else {
      signUpRestaurant({
        variables: data,
      });
    }
  };

  return (
    <Centered
      className={css({ marginTop: "64px" })}
      direction="column"
      vertical
      horizontal
    >
      <BrandLogo />
      <div
        className={css({
          width: "60%",
        })}
      >
        <h2>Let's get started</h2>
        <Space />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="accountRole"
            control={control}
            defaultValue={USER_TYPE.customer}
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroup
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setUserType(e.currentTarget.value);
                }}
                align={ALIGN.horizontal}
              >
                <Radio value={USER_TYPE.customer}>Customer</Radio>
                <Radio value={USER_TYPE.restaurant}>Restaurant</Radio>
              </RadioGroup>
            )}
          />
          <Space />
          <Controller
            name="fullname"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} placeholder="Full Name" clearOnEscape />
            )}
          />
          <Space />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} placeholder="Email Address" clearOnEscape />
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
          {userType === USER_TYPE.restaurant && (
            <Controller
              name="location"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Location" clearOnEscape />
              )}
            />
          )}
          <Space size="2" />
          <Button className={css({ width: "100%" })}>Sign Up</Button>
        </form>
        <p>
          Already use Uber?
          <StyledLink href="/sign-in">Sign in</StyledLink>
        </p>
      </div>
    </Centered>
  );
};

export default SignUp;
