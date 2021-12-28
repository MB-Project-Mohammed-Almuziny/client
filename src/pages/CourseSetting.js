import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Grid, Avatar, List, ListItem, Typography } from "@mui/material";

import { CourseSettingInfo } from "./../components/CourseSettingInfo";
import { CourseAddSection } from "../components/CourseAddSection";
import { CourseAddLesson } from "./../components/CourseAddLesson";

const GetPanel = ({ panel, course, getCourseInfo }) => {
  switch (panel) {
    case "Info":
      return (
        <CourseSettingInfo course={course} getCourseInfo={getCourseInfo} />
      );

    case "Add Section":
      return <CourseAddSection course={course} getCourseInfo={getCourseInfo} />;

    case "Add Lessons":
      return <CourseAddLesson course={course} getCourseInfo={getCourseInfo} />;

    default:
      return <>404</>;
  }
};

export const CourseSetting = () => {
  const [panel, setPanel] = useState("Info");
  const [isCreator, setIsCreator] = useState(false);
  const [course, setCourse] = useState();

  const { user, userId } = useSelector((state) => state.account);
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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (course) userId === course.creator._id && setIsCreator(true);
    // eslint-disable-next-line
  }, [course]);

  return isCreator ? (
    <Grid container>
      <Grid item xs={3}>
        <List
          sx={{
            width: "100%",
            maxWidth: 200,
            height: "100vh",
            bgcolor: "background.paper",
          }}
        >
          <Avatar
            variant="square"
            alt={user}
            src={course.thumbnail}
            sx={{ m: "auto", width: "60%", height: "20%" }}
          />

          {["Info", "Add Section", "Add Lessons"].map((value) => (
            <ListItem key={value} disableGutters>
              <Typography
                variant="button"
                className="pointer"
                onClick={() => setPanel(value)}
              >
                {value}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={9}>
        <GetPanel panel={panel} course={course} getCourseInfo={getCourseInfo} />
      </Grid>
    </Grid>
  ) : (
    <Typography align="center">
      you are to the creator of this course
    </Typography>
  );
};
