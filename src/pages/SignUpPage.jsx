import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

import useToggleValue from "../hooks/useToggleValue";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import FormGroup from "../components/common/FormGroup";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { IconEyeToggle } from "../components/icons";
import { Checkbox } from "../components/checkbox";
import { Button, ButtonGoogle } from "../components/button";

const schema = yup.object({
  name: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be at least 8 characters"),
});

const SignUpPage = () => {
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

  const { value: acceptTerm, handleToggleValue: handleToggleTerm } =
    useToggleValue();

  const handleSignUp = (values) => {
    if (!acceptTerm) {
      alert("Please agree to the Terms of Use and Privacy Policy before continuing.");
      return;
    }
    console.log("✅ Sign-up data:", values);
  };

  return (
    <LayoutAuthentication heading="Create your account">
      <p className="mb-6 text-xs font-normal text-center lg:mb-8 lg:text-sm text-text3">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium underline text-primary-500 hover:text-primary-600"
        >
          Sign in
        </Link>
      </p>

      <ButtonGoogle text="Sign up with Google" />

      <p className="mb-4 text-xs font-normal text-center lg:text-sm lg:mb-8 text-text2">
        Or sign up with email
      </p>

      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="flex flex-col gap-5"
      >
        <FormGroup>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            control={control}
            name="name"
            placeholder="John Doe"
            error={errors.name?.message}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            control={control}
            name="email"
            type="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            control={control}
            name="password"
            placeholder="Create a password"
            type={showPassword ? "text" : "password"}
            error={errors.password?.message}
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            />
          </Input>
        </FormGroup>

        <div className="flex items-start gap-x-4 mb-5">
          <Checkbox
            name="term"
            checked={acceptTerm}
            onClick={handleToggleTerm}
          >
            <p className="flex-1 text-xs lg:text-sm text-text2">
              I agree to the{" "}
              <span className="underline text-secondary cursor-pointer">
                Terms of Use
              </span>{" "}
              and have read and understand the{" "}
              <span className="underline text-secondary cursor-pointer">
                Privacy Policy
              </span>.
            </p>
          </Checkbox>
        </div>

        <Button
          className="w-full mt-1"
          type="submit"
          kind="primary"
          disabled={!acceptTerm}
        >
          Create my account
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignUpPage;
