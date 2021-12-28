import { React, useState, useEffect } from "react";
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
  const [userInfo, setUserInfo] = useState("");
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");

  const { userId, token } = useSelector((state) => state.account);

  const getUserInfo = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/user/info/${userId}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((result) => {
          setUserInfo(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

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

          e.target.name.value =
            e.target.headline.value =
            e.target.about.value =
              "";

          getUserInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
                placeholder={userInfo.name}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />

              <TextField
                onChange={(e) => setHeadline(e.target.value)}
                fullWidth
                id="headline"
                label="headline"
                placeholder={userInfo.headline}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />

              <TextField
                onChange={(e) => setAbout(e.target.value)}
                fullWidth
                id="about"
                label="about"
                placeholder={userInfo.about}
                InputLabelProps={{ shrink: true }}
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
