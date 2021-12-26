import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { Container, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const CourseInfo = () => {
  const [course, setCourse] = useState();

  const { courseId } = useParams();

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

  useEffect(() => {
    getCourseInfo();
  }, []);

  useEffect(() => {
    console.log(course);
  }, [course]);

  return course ? (
    <Container>
      <Typography>{course.title}</Typography>
      <Typography>created by: {course.creator.name}</Typography>
      <hr />
      <Typography variant="h6">Description</Typography>
      <Typography>{course.description}</Typography>
      <Typography variant="h6">About</Typography>
      <Typography>{course.about}</Typography>
      <Typography variant="h6">feedback</Typography>
      <ReactStars
        count={5}
        size={50}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
      <Typography variant="h6">Reviews</Typography>
      {course.reviews.map((review) => {
        <Typography> {review}</Typography>;
      })}
    </Container>
  ) : (
    <Container sx={{ mx: "auto", width: 200 }}>
      <CircularProgress />
    </Container>
  );
};
