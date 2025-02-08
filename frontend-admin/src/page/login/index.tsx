import React, { useEffect, useState } from "react";
import "./style.css";
import { Button, Form, Image, Input, message, notification } from "antd";
import backgroundImage from "../../assets/background-login.webp";
import logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../apis/authModule";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserLoginInfo } from "../../redux/slice/accountSlice";
type FieldType = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated]);

  const onFinish = async (values: any) => {
    const { email, password } = values;
    const res = await login(email, password);
    if (res && res.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(setUserLoginInfo(res.data.user));
      message.success("Đăng nhập tài khoản thành công!");
      navigate(callback ? callback : "/customer/login");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: Array.isArray(res.message) ? res.message[0] : res.message,
        duration: 5,
      });
    }
  };

  return (
    <div className="container">
      <div className="left-logo">
        <Image width={635} height={480} src={backgroundImage} preview={false} />
      </div>
      <div className="right-form">
        <div className="login-form">
          <div className="header-title">
            <Image width={100} height={40} src={logo} preview={false} />
            <div className="title">CUSTOMER ADMIN SITE</div>
          </div>
          <div className="title-2">Welcome to ITJob Customer</div>

          <Form
            style={{ padding: "30px" }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item<FieldType>
              label={null}
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item<FieldType>
              label={null}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <Form.Item>
              <a style={{ float: "right" }}>Forgot password?</a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ outline: "none", width: "100%" }}
              >
                Sign in
              </Button>
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              Don't have an account. <a>Sign-up</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
