import { React, useState } from "react";
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

export const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");

  const { userId, token } = useSelector((state) => state.account);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/course`,
          {
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
