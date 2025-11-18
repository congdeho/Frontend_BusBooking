import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

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
    .email("Email không hợp lệ")
    .required("Trường này là bắt buộc"),
  password: yup
    .string()
    .required("Trường này là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
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

  const navigate = useNavigate();

  const handleSignIn = async (values) => {
    try {
      const data = await login(values.email, values.password);
      // login saved token/user in localStorage in service
      navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Đăng nhập thất bại';
      alert(msg);
    }
  };

  return (
    <LayoutAuthentication heading="Đăng nhập">

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
          <Label htmlFor="password">Mật khẩu *</Label>
          <Input
            control={control}
            name="password"
            placeholder="Nhập mật khẩu"
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
            Quên mật khẩu?
          </Link>
        </div>

        <Button className="w-full mt-2" type="submit" kind="primary">
          Đăng nhập
        </Button>
      </form>

      <div className="mt-4">
        <p className="mb-4 text-xs font-normal text-center lg:text-sm lg:mb-6 text-text2">Hoặc</p>
        <ButtonGoogle text="Tiếp tục với Google" />
      </div>

      <p className="mt-4 mb-6 text-xs font-normal text-center lg:mb-8 lg:text-sm text-text3">
        Bạn chưa có tài khoản?{' '}
        <Link
          to="/register"
          className="font-medium underline text-primary-500 hover:text-primary-600"
        >
          Đăng ký
        </Link>
      </p>
    </LayoutAuthentication>
  );
};

export default SignInPage;
