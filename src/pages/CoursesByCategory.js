import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { Row } from "antd";

import { CourseCard } from "../components/CourseCard";

export const CoursesByCategory = () => {
  const [courses, setCourses] = useState([]);

  const category = useParams().category;

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

  return (
    <Container>
      <Typography variant="h3" align="center" my={2}>
        {category} courses
      </Typography>

      <Row gutter={[24, 24]}>
        {courses.map((course) => (
          <CourseCard course={course} key={course._id} />
        ))}
      </Row>
    </Container>
  );
};
