import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Container,
  Box,
  FormGroup,
  TextField,
  Typography,
  Button,
} from "@mui/material";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      password.match(
        // eslint-disable-next-line
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{8,}$/
      )
    ) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/register`, {
          name,
          email,
          password,
        })
        .then(() => {
          navigate("/logIn");

          Swal.fire({
            position: "top",
            icon: "success",
            title: "verification link sent to your email",
          });
        })
        .catch((err) => {
          if (err.response.data.error.split(" ")[0] === "E11000")
            Swal.fire({
              position: "top",
              icon: "warning",
              text: "this email already exceeded",
            });
          else console.log(err);
        });
    } else {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "your password is weak",
        text: "the password have top be at least 6 character and contain at least 1 Capital letter, small, special character, and number ",
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" mb={2}>
        register
      </Typography>
      <Box sx={{ bgcolor: "background.paper", p: 2 }}>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <TextField
              onChange={(e) => setName(e.target.value)}
              fullWidth
              id="userName"
              label="User Name"
              placeholder="User Name"
              margin="normal"
              required
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              type="email"
              id="email"
              label="email"
              placeholder="Email"
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
              register
            </Button>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};
