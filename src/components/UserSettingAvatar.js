import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Container,
  Box,
  Card,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import { storage } from "./../utils/firebaseConfig";
import { login } from "./../reducers/account";

export const UserSettingAvatar = () => {
  const [newAvatar, setNewAvatar] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  const { user, avatar, userId, role, token } = useSelector(
    (state) => state.account
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newAvatar.type.split("/")[0] === "image") {
      const uploadImg = storage.ref(`images/${newAvatar.name}`).put(newAvatar);
      uploadImg.on(
        "state_changed",
        (snapshot) => {
          // eslint-disable-next-line
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("images")
            .child(newAvatar.name)
            .getDownloadURL()
            .then((url) => {
              setNewAvatarUrl(url);
              e.target.newAvatar.value = "";
              dispatch(login({ user, avatar: url, userId, role, token }));
            });
        }
      );
    } else {
      Swal.fire({
        position: "top",
        icon: "warning",
        text: "avatar have to be image file",
      });
    }
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
    if (newAvatarUrl) submitAvatar();
    // eslint-disable-next-line
  }, [newAvatarUrl]);

  return (
    <Container>
      <Typography variant="h3" align="center" mb={2}>
        your avatar
      </Typography>


      <Card>
        <Box p={2}>
          <img alt={user} src={avatar} />
          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              onChange={(e) => setNewAvatar(e.target.files[0])}
              fullWidth
              type="file"
              id="newAvatar"
              label="newAvatar"
              placeholder="newAvatar"
              InputLabelProps={{ shrink: true }}
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
