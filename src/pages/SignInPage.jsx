import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

import LayoutAuthentication from "../layout/LayoutAuthentication";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { IconEyeToggle } from "../components/icons";
import { Button, ButtonGoogle } from "../components/button";
import FormGroup from "../components/common/FormGroup";
import useToggleValue from "../hooks/useToggleValue";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be at least 8 characters"),
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  const handleSignIn = (values) => {
    console.log("Sign-in data:", values);
  };

  return (
    <LayoutAuthentication heading="Welcome Back!">
      <p className="mb-6 text-xs font-normal text-center lg:mb-8 lg:text-sm text-text3">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium underline text-primary-500 hover:text-primary-600"
        >
          Sign up
        </Link>
      </p>

      <ButtonGoogle />

      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col mt-6 gap-5"
      >
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            control={control}
            name="email"
            placeholder="example@gmail.com"
            type="email"
            error={errors.email?.message}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            control={control}
            name="password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            error={errors.password?.message}
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            />
          </Input>
        </FormGroup>

        <div className="text-right -mt-2">
          <Link
            to="/forgot-password"
            className="inline-block text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            Forgot password?
          </Link>
        </div>

        <Button className="w-full mt-2" type="submit" kind="primary">
          Sign in
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignInPage;
