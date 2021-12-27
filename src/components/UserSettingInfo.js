import { React, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Container,
  Box,
  Card,
  FormGroup,
  TextField,
  Typography,
  Button,
} from "@mui/material";

export const UserSettingInfo = () => {
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");

  const { userId, token } = useSelector((state) => state.account);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/user/` + userId,
          { name, headline, about },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "your change saved",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Typography variant="h3" align="center" mb={2}>
        your information
      </Typography>

      <Card>
        <Box p={2}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <TextField
                onChange={(e) => setName(e.target.value)}
                fullWidth
                id="name"
                label="name"
                placeholder="name"
                margin="normal"
              />

              <TextField
                onChange={(e) => setHeadline(e.target.value)}
                fullWidth
                id="headline"
                label="headline"
                placeholder="headline"
                margin="normal"
              />

              <TextField
                onChange={(e) => setAbout(e.target.value)}
                fullWidth
                id="about"
                label="about"
                placeholder="about"
                margin="normal"
              />
            </FormGroup>

            <Typography align="center" my={2}>
              <Button variant="contained" type="submit">
                save change
              </Button>
            </Typography>
          </form>
        </Box>
      </Card>
    </Container>
  );
};
