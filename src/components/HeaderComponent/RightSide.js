import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link, Typography, IconButton } from "@mui/material";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";

import { Layout, Menu, Breadcrumb, Avatar, Button } from "antd";

import { logout } from "./../../reducers/account";

export const RightSide = () => {
  const { user, avatar } = useSelector((state) => state.account);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout({}));
  };

  return user ? (
    <>
      <Link color="inherit" underline="none" href="/createCourse" mr={2}>
        create course
      </Link>

      <Typography mr={2}>{user}</Typography>

      <Avatar alt={user} src={avatar} />

      <Link color="inherit" underline="none" href="/user/setting">
        <IconButton color="inherit">
          <SettingsApplicationsRoundedIcon />
        </IconButton>
      </Link>

      <Button color="inherit" onClick={() => handleLogOut()}>
        log out
      </Button>
    </>
  ) : (
    <>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item onClick={() => navigate("/register")}> Register</Menu.Item>
        <Menu.Item onClick={() => navigate("/logIn")}> Log in</Menu.Item>
     
      </Menu>
      {/* <Link color="inherit" underline="none" href="/register" ml={2}>
        Register
      </Link>

      <Link color="inherit" underline="none" href="/logIn" ml={2}>
        Log in
      </Link> */}
    </>
  );
};
