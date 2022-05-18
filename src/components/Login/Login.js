import { Button, Input, Typography } from "antd";
import React from "react";
import { FcUnlock } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import * as classes from "./Login.module.css";
const Login = () => {
  return (
    <div className={classes.souContainer}>
      <div className={classes.loginContainer}>
        <div className={classes.loginFormRow}>
          <div className={classes.second}>
            <div className={classes.first}>
              <Typography.Title level={2} style={{ color: "white" }}>
                <FcUnlock size={50} /> تسجيل الدخول
              </Typography.Title>
              <Input size="large" placeholder="رمز المشغل" />
              <Input size="large" placeholder="كلمة المرور" />
              <br />
              <br />

              <Button
                block
                onClick={() =>
                  window.location.replace("http://localhost:3000/")
                }
              >
                الدخول
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
