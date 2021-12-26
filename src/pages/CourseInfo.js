import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";
import { Container, Typography, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const CourseInfo = () => {
  const [course, setCourse] = useState();

  const { userId } = useSelector((state) => state.account);
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

  const handleEnrole = (e) => {
    e.preventDefault();

    try {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/enrole`, {
          userId,
          courseId,
        })
        .then((result) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your login successfully",
            showConfirmButton: false,
            timer: 1000,
          });

          navigate("/");
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

  return course ? (
    <Container>
      <Button onClick={handleEnrole} variant="contained">
        Enrole now
      </Button>

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
