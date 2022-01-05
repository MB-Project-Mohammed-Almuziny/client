import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Container,
  Box,
  Card,
  FormGroup,
  TextField,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";

import { storage } from "./../utils/firebaseConfig";

export const CreateCourse = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");

  const { userId, token } = useSelector((state) => state.account);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadImg = storage.ref(`images/${thumbnail.name}`).put(thumbnail);
    uploadImg.on(
      "state_changed",
      (snapshot) => {
        // eslint-disable-next-line
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
          .child(thumbnail.name)
          .getDownloadURL()
          .then((url) => {
            setThumbnailUrl(url);
          });
      }
    );
  };

  const submitInfo = () => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/course`,
          {
            thumbnail: thumbnailUrl,
            title,
            about,
            description,
            creator: userId,
            category,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    submitInfo();
    // eslint-disable-next-line
  }, [thumbnailUrl]);

  return (
    <Container>
      <Typography variant="h3" align="center" mb={2}>
        create new course
      </Typography>

      <Card>
        <Box p={2}>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <TextField
                onChange={(e) => setThumbnail(e.target.files[0])}
                fullWidth
                type="file"
                id="thumbnail"
                label="thumbnail"
                placeholder="thumbnail"
                margin="normal"
                required
              />

              <TextField
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                id="title"
                label="title"
                placeholder="title"
                margin="normal"
                required
              />

              <TextField
                onChange={(e) => setAbout(e.target.value)}
                fullWidth
                id="about"
                label="about"
                placeholder="about"
                margin="normal"
                required
              />

              <TextField
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                id="description"
                label="description"
                placeholder="description"
                margin="normal"
                required
              />

              <Select
                id="category"
                label="category"
                placeholder="category"
                value={category}
                autoWidth={false}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"General"}>General</MenuItem>
                <MenuItem value={"Software"}>Software</MenuItem>
                <MenuItem value={"Business"}>Business</MenuItem>
                <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
              </Select>
            </FormGroup>

            <Typography align="center" my={2}>
              <Button variant="contained" type="submit">
                create
              </Button>
            </Typography>
          </form>
        </Box>
      </Card>
    </Container>
  );
};
