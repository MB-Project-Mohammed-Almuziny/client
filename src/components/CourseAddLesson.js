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

export const CourseAddLesson = ({ course }) => {
  const [lesson, setLesson] = useState("");
  const [lessonUrl, setLessonUrl] = useState("");

  const { userId, token } = useSelector((state) => state.account);

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadImg = storage.ref(`videos/${lesson.name}`).put(lesson);
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
          .ref("videos")
          .child(lesson.name)
          .getDownloadURL()
          .then((url) => {
            setLessonUrl(url);
            e.target.lesson.value = "";
          });
      }
    );
  };

  const submitLesson = () => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/course/addLesson`,
          {
            courseId: course._id,
            lesson: lessonUrl,
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
    if (lessonUrl) submitLesson();
  }, [lessonUrl]);

  return (
    <Container>
      <Typography variant="h3" align="center" mb={2}>
        add lesson to your course
      </Typography>

      <Card>
        <Box p={2}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              onChange={(e) => setLesson(e.target.files[0])}
              fullWidth
              type="file"
              id="lesson"
              label="lesson"
              placeholder="lesson"
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
