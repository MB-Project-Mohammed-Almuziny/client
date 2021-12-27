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

import { storage } from "./../utils/firebaseConfig";

export const UserSettingAvatar = () => {
  const [newAvatar, setNewAvatar] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  const { userId, avatar, token } = useSelector((state) => state.account);

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadImg = storage.ref(`images/${newAvatar.name}`).put(newAvatar);
    uploadImg.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(newAvatar.name)
          .getDownloadURL()
          .then((url) => {
            setNewAvatarUrl(url);
          });
      }
    );
  };

  const submitAvatar = () => {
    try {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/user/` + userId,
          {
            avatar: newAvatarUrl,
          },
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

  useEffect(() => {
    submitAvatar();
  }, [newAvatarUrl]);

  return (
    <Container>
      <Typography variant="h3" align="center" mb={2}>
        your avatar
      </Typography>

      <Card>
        <Box p={2}>
          <img src={avatar} />
          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              onChange={(e) => setNewAvatar(e.target.files[0])}
              fullWidth
              type="file"
              id="newAvatar"
              label="newAvatar"
              placeholder="newAvatar"
              margin="normal"
              required
            />

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
