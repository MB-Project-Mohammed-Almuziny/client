import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";

import { CourseCard } from "../components/CourseCard";

export const CoursesByTerm = () => {
  const [courses, setCourses] = useState([]);

  const term = useParams().term;

  const getCourses = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/course/search/${term}`)
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
    getCourses();
    console.log(1);
    // eslint-disable-next-line
  }, [term]);

  return (
    <Container>
      <Typography variant="h3" align="center" my={2}>
        courses with {term} term
      </Typography>

      <Grid container spacing={2}>
        {courses.map((course) => (
          <CourseCard
            courseId={course._id}
            title={course.title}
            creator={course.creator}
            key={course._id}
          />
        ))}
      </Grid>
    </Container>
  );
};
