import { React, useState } from "react";
import { useSelector } from "react-redux";
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

export const CourseAddSection = ({ course, getCourseInfo }) => {
  const [newSection, setNewSection] = useState();
  console.log(course);

  const { token } = useSelector((state) => state.account);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/course/addSection`,
          {
            courseId: course._id,
            sectionName: newSection,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "your section have been add successfully",
            showConfirmButton: false,
            timer: 2000,
          });

          e.target.newSection.value = "";

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
        your course lesson sections
      </Typography>

      <Card>
        <Box p={2}>
          {course.lessonSections.map((section, i) => (
            <Typography key={section._id}>
              Section {i + 1}: {section.sectionName}
            </Typography>
          ))}

          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              onChange={(e) => setNewSection(e.target.value)}
              fullWidth
              id="newSection"
              label="new Section"
              placeholder="new Section"
              margin="normal"
              required
            />

            <Typography align="center" my={2}>
              <Button variant="contained" type="submit">
                add section
              </Button>
            </Typography>
          </form>
        </Box>
      </Card>
    </Container>
  );
};
