import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Rate } from "antd";

import { EnroleOrLearnBtn } from "./../components/EnroleOrLearnBtn";
import { CourseSettingBtn } from "./../components/CourseSettingBtn";

export const CourseInfo = () => {
  const [course, setCourse] = useState();

  const { courseId } = useParams();

  const navigate = useNavigate();

  const getCourseInfo = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/course/${courseId}`)
        .then((result) => {
          setCourse(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserInfo = (e) => {
    e.preventDefault();

    navigate("/user/" + course.creator._id);
  };

  useEffect(() => {
    getCourseInfo();
    // eslint-disable-next-line
  }, []);

  return course ? (
    <Container>
      <EnroleOrLearnBtn />
      <CourseSettingBtn courseId={course._id} creator={course.creator} />

      <Typography>{course.title}</Typography>

      <Typography>
        created by:
        <Typography
          onClick={handleUserInfo}
          className="pointer"
          variant="button"
          sx={{ textDecoration: "underline", color: "blue" }}
        >
          {course.creator.name}
        </Typography>
      </Typography>
      <hr />

      <Typography variant="h6">Description</Typography>
      <Typography>{course.description}</Typography>

      <Typography variant="h6">About</Typography>
      <Typography>{course.about}</Typography>

      <Typography variant="h6">feedback</Typography>
      <Rate />
      
      <Typography variant="h6">Reviews</Typography>
      {course.reviews.map((review) => (
        <Typography> {review}</Typography>
      ))}
    </Container>
  ) : (
    <Container sx={{ mx: "auto", width: 200 }}>
      <CircularProgress />
    </Container>
  );
};
