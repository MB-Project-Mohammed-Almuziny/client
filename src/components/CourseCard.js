import React from "react";
import { Grid, Card, Typography } from "@mui/material";

export const CourseCard = ({ title, creator }) => {
  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Card>
        <Typography>{title}</Typography>
        <Typography>by: {creator}</Typography>
      </Card>
    </Grid>
  );
};
