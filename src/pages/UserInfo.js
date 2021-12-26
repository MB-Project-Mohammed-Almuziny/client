import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Container,
  Box,
  Grid,
  Card,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { CourseCard } from "./../components/CourseCard";

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState();

  const { token } = useSelector((state) => state.account);
  const { user_id } = useParams();

  const navigate = useNavigate();

  const getUserInfo = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/user/info/${user_id}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((result) => {
          setUserInfo(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return userInfo ? (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box>
            <Typography variant="h3" mb={2}>
              {userInfo.name}
            </Typography>

            <Typography variant="h4">Headline</Typography>
            <Typography mb={2}>{userInfo.headline}</Typography>

            <Typography variant="h4">About</Typography>
            <Typography mb={2}>{userInfo.about}</Typography>

            <Typography variant="h4" mt={2}>
              created course
            </Typography>
            {userInfo.course[0] ? (
              <Grid container spacing={2}>
                {userInfo.course.map((course) => (
                  <CourseCard
                    courseId={course._id}
                    title={course.title}
                    creator={course.creator}
                    key={course._id}
                  />
                ))}
              </Grid>
            ) : (
              <Typography>this user dont create any course yet</Typography>
            )}

            <Typography variant="h4" mt={2}>
              enrole course
            </Typography>
            {/* <Grid container spacing={2}>
              {userInfo.enrole.map((course) => (
                <CourseCard
                  courseId={course._id}
                  title={course.title}
                  creator={course.creator}
                  key={course._id}
                />
              ))}
            </Grid> */}
            {userInfo.enrole[0] ? (
              <Grid container spacing={2}>
                {userInfo.enrole.map((course) => (
                  <CourseCard
                    courseId={course._id}
                    title={course.title}
                    creator={course.creator}
                    key={course._id}
                  />
                ))}
              </Grid>
            ) : (
              <Typography>this user dont create any course yet</Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              alt={userInfo.name}
              src={userInfo.avatar}
              sx={{ width: 56, height: 56 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Container sx={{ mx: "auto", width: 200 }}>
      <CircularProgress />
    </Container>
  );
};
