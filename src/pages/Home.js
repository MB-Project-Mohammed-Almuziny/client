import { React, useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";

import { CourseCard } from "./../components/CourseCard";

export const Home = () => {
  const [courses, setCourses] = useState([]);

  const getAllCourses = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/course`)
        .then((result) => {
          setCourses(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCourses();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(courses);
  }, [courses]);

  return (
    <Container>
      <Typography variant="h3" align="center" my={2}>
        courses
      </Typography>

      <Grid container spacing={2}>
        {courses.map((course) => (
          <CourseCard
            title={course.title}
            creator={course.creator.name}
            key={course._id}
          />
        ))}
      </Grid>
    </Container>
  );
};
