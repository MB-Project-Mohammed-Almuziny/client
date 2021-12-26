import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Typography } from "@mui/material";

export const CourseCard = ({ courseId, title, creator }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/course/" + courseId)
  };

  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card className="pointer" onClick={handleClick}>
        <Typography>{title}</Typography>
        <Typography>by: {creator}</Typography>
      </Card>
    </Grid>
  );
};
