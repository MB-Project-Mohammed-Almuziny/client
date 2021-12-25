import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  Container,
  Box,
  FormGroup,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import { login } from "./../reducers/account";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
          nameOrEmail: email,
          password,
        })
        .then((response) => {
          console.log(response);

          const data = {
            user: response.data.result.name,
            avatar: response.data.result.avatar,
            userId: response.data.result._id,
            role: response.data.result.role.role,
            token: response.data.token,
          };

          dispatch(login({ ...data }));

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your login successfully",
            showConfirmButton: false,
            timer: 1000,
          });

          navigate("/");
        })
        .catch((err) => {
          Swal.fire({
            position: "top",
            icon: "warning",
            text: err.response.data.message,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleForgetPass = () => {
    const email = prompt("Please enter email");

    axios.post(`${process.env.REACT_APP_BASE_URL}/forgetPass`, { email });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" mb={2}>
        log in
      </Typography>
      <Box sx={{ bgcolor: "background.paper", p: 2 }}>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              id="userNameOrEmail"
              label="user name or email"
              placeholder="user name or email"
              margin="normal"
              required
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              type="password"
              id="password"
              label="password"
              placeholder="password"
              margin="normal"
              required
            />
          </FormGroup>

          <Typography align="center" my={2}>
            <Button variant="contained" type="submit">
              log in
            </Button>
          </Typography>

          <Typography
            onClick={() => handleForgetPass()}
            variant="button"
            align="center"
            style={{ color: "#00adb5" }}
          >
            forget password?
          </Typography>
        </form>
      </Box>
    </Container>
  );
};
