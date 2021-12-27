import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

import axios from "axios";
import Swal from "sweetalert2";

export const EnroleOrLearn = () => {
  const [isStudent, seIsStudent] = useState(false);

  const { userId, token } = useSelector((state) => state.account);
  const { courseId } = useParams();
  const navigate = useNavigate();

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
          console.error(err + "");
        });
    } catch (err) {
      console.error(err + "");
    }
  };

  const checkIsStudent = () => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/course/isStudent`,
          {
            userId,
            courseId,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((result) => {
          seIsStudent(result.data);
        })
        .catch((err) => {
          console.error(err + "");
        });
    } catch (err) {
      console.error(err + "");
    }
  };

  useEffect(() => {
    checkIsStudent();
  }, []);

  return isStudent ? (
    <Button
      onClick={() => navigate("/course/learn/" + courseId)}
      variant="contained"
    >
      Go To Course
    </Button>
  ) : (
    <Button onClick={handleEnrole} variant="contained">
      Enrole now
    </Button>
  );
};
