import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Rate } from "antd";

import { EnroleOrLearnBtn } from "./../components/EnroleOrLearnBtn";
import { CourseSettingBtn } from "./../components/CourseSettingBtn";
import { RatingStatus } from "./../components/RatingStatus";
import { Reviews } from "./../components/Reviews";

export const CourseInfo = () => {
  const [course, setCourse] = useState();
  const [reviews, setReviews] = useState();

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
      console.error(err);
    }
  };

  const getReviews = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/reviews/${courseId}`)
        .then((result) => {
          setReviews(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUserInfo = (e) => {
    e.preventDefault();

    navigate("/user/" + course.creator._id);
  };

  useEffect(() => {
    getCourseInfo();
    getReviews();
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log("reviews : ", reviews);
  // }, [reviews]);

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

      <Typography variant="h6">rating status</Typography>
      <RatingStatus reviews={reviews} />

      <Typography variant="h6">Reviews</Typography>
      <Reviews reviews={reviews} />
    </Container>
  ) : (
    <Container sx={{ mx: "auto", width: 200 }}>
      <CircularProgress />
    </Container>
  );
};
