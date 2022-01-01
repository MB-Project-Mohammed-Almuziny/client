import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";

import { CourseCard } from "../components/CourseCard";

export const CoursesByCategory = () => {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState(useParams().category);

  // const { categoryParam } = useParams();
  // setCategory(useParams().category);
  console.log();
  const newCategory = useParams().category;

  const getCourses = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/course/category/${category}`)
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
    // eslint-disable-next-line
  }, [category]);

  useEffect(() => {
    setCategory(newCategory);
    // eslint-disable-next-line
  }, [useParams().category]);

  return (
    <Container>
      <Typography variant="h3" align="center" my={2}>
        {category} courses
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
