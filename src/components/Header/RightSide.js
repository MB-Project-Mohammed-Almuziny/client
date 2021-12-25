import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Button } from "@mui/material";

import { logout } from "./../../reducers/account";

export const RightSide = () => {
  const { user } = useSelector((state) => state.account);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout({}));
  };

  return user ? (
    <>
      <h1>{user} </h1>

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
