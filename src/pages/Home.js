import { React, useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { Row } from "antd";

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

  return (
    <Container>
      <Typography variant="h3" align="center" my={2}>
        courses
      </Typography>

      <Row gutter={[24, 24]}>
        {courses.map((course) => (
          <CourseCard course={course} key={course._id} />
        ))}
      </Row>
    </Container>
  );
};
