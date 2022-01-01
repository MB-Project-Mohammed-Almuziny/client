import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { Row } from "antd";

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
    // eslint-disable-next-line
  }, [term]);

  return (
    <Container>
      <Typography variant="h3" align="center" my={2}>
        courses with {term} term
      </Typography>

      <Row gutter={[24, 24]}>
        {courses.map((course) => (
          <CourseCard course={course} key={course._id} />
        ))}
      </Row>
    </Container>
  );
};
