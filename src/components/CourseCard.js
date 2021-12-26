import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Typography } from "@mui/material";

export const CourseCard = ({ courseId, title, creator }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/course/" + courseId);
  };

  const handleUserInfo = (e) => {
    e.preventDefault();

    navigate("/user/" + creator._id);
  };

  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card>
        <Typography onClick={handleClick} className="pointer">
          {title}
        </Typography>

        <Typography>
          by:
          <Typography
            onClick={handleUserInfo}
            className="pointer"
            variant="button"
            sx={{ textDecoration: "underline", color: "blue" }}
          >
            {creator.name}
          </Typography>
        </Typography>
      </Card>
    </Grid>
  );
};
