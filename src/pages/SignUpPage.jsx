import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { register as registerService } from "../services/authService";

import useToggleValue from "../hooks/useToggleValue";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import FormGroup from "../components/common/FormGroup";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { IconEyeToggle } from "../components/icons";
import { Checkbox } from "../components/checkbox";
import { Button, ButtonGoogle } from "../components/button";

const schema = yup.object({
  name: yup.string().required("Trường này là bắt buộc"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Trường này là bắt buộc"),
  password: yup
    .string()
    .required("Trường này là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  phone: yup
    .string()
    .required("Trường này là bắt buộc")
    .matches(/^[0-9]{7,15}$/, "Số điện thoại không hợp lệ"),
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

  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    if (!acceptTerm) {
      alert("Vui lòng đồng ý với Điều khoản và Chính sách Quyền riêng tư trước khi tiếp tục.");
      return;
    }
    try {
      const payload = {
        fullName: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
      };
      const data = await registerService(payload);
      // If token returned, user is logged in; otherwise redirect to login with success
      if (data && data.token) {
        navigate('/');
      } else {
        alert('Đăng ký thành công. Vui lòng đăng nhập.');
        navigate('/login');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Đăng ký thất bại';
      alert(msg);
    }
  };

  return (
    <LayoutAuthentication heading="Đăng ký">
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="flex flex-col gap-5"
      >
        <FormGroup>
          <Label htmlFor="name">Họ tên *</Label>
          <Input
            control={control}
            name="name"
            placeholder="Nguyễn Văn A"
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

        <FormGroup>
          <Label htmlFor="phone">Số điện thoại *</Label>
          <Input
            control={control}
            name="phone"
            placeholder="0987654321"
            error={errors.phone?.message}
          />
        </FormGroup>

        <div className="flex items-start gap-x-4 mb-5">
          <Checkbox
            name="term"
            checked={acceptTerm}
            onClick={handleToggleTerm}
          >
            <p className="flex-1 text-xs lg:text-sm text-text2">
              Tôi đồng ý với{" "}
              <span className="underline text-secondary cursor-pointer">
                Điều khoản sử dụng
              </span>{" "}
              và đã đọc và hiểu về{" "}
              <span className="underline text-secondary cursor-pointer">
                Chính sách Quyền riêng tư
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
          Đăng ký
        </Button>
      </form>

      <div className="mt-4">
        <p className="mb-4 text-xs font-normal text-center lg:text-sm lg:mb-6 text-text2">Hoặc</p>
        <ButtonGoogle text="Tiếp tục với Google" />
  </div>
  <p className="mb-6 text-xs font-normal text-center lg:mb-8 lg:text-sm text-text3">
        Đã có tài khoản?{" "}
        <Link
          to="/login"
          className="font-medium underline text-primary-500 hover:text-primary-600"
        >
          Đăng nhập
        </Link>
      </p>
    </LayoutAuthentication>
  );
};

export default SignUpPage;
