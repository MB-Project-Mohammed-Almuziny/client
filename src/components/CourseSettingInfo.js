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

export const CourseSettingInfo = ({ course, getCourseInfo }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [description, setDescription] = useState("");

  const { token } = useSelector((state) => state.account);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/course/` + course._id,
          { title, about, description },
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

          e.target.title.value =
            e.target.about.value =
            e.target.description.value =
              "";

          getCourseInfo();
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
        {course.title} course information
      </Typography>

      <Card>
        <Box p={2}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                id="title"
                label="title"
                InputLabelProps={{ shrink: true }}
                placeholder={course.title}
                margin="normal"
              />

              <TextField
                onChange={(e) => setAbout(e.target.value)}
                fullWidth
                id="about"
                label="about"
                InputLabelProps={{ shrink: true }}
                placeholder={course.about}
                margin="normal"
              />

              <TextField
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                id="description"
                label="description"
                InputLabelProps={{ shrink: true }}
                placeholder={course.description}
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
