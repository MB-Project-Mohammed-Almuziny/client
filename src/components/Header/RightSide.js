import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Typography, Button, Avatar, IconButton } from "@mui/material";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";

import { logout } from "./../../reducers/account";

export const RightSide = () => {
  const { user, avatar } = useSelector((state) => state.account);

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
      <Link color="inherit" underline="none" href="/register" ml={2}>
        Register
      </Link>

      <Link color="inherit" underline="none" href="/logIn" ml={2}>
        Log in
      </Link>
    </>
  );
};
