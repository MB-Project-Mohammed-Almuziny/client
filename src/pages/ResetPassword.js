import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export const ResetPassword = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "your passwords dont match",
      });
    } else if (
      !password1.match(
        // eslint-disable-next-line
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{8,}$/
      )
    ) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "your password is weak",
        text: "the password have top be at least 6 character and contain at least 1 Capital letter, small, special character, and number ",
      });
    } else {
      try {
        axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/user/changePassword`,
            { newPassword: password1 },
            {
              headers: { authorization: "Bearer " + token },
            }
          )
          .then(() => {
            navigate("/logIn");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" mb={2}>
        Reset password
      </Typography>
      <Box sx={{ bgcolor: "background.paper", p: 2 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <TextField
              onChange={(e) => setPassword1(e.target.value)}
              fullWidth
              type="password"
              id="newPass"
              label="new password"
              placeholder="new password"
              margin="normal"
              required
            />
            <TextField
              onChange={(e) => setPassword2(e.target.value)}
              fullWidth
              type="password"
              id="checkpassword"
              label="check password"
              placeholder="check password"
              margin="normal"
              required
            />
          </FormGroup>

          <Typography align="center" my={2}>
            <Button variant="contained" type="submit">
              submit
            </Button>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};
