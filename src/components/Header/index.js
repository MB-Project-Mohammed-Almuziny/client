import React from "react";
import { AppBar, Typography, Box, Toolbar } from "@mui/material";

import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" mr={2}>
            CoursesSite
          </Typography>

          <LeftSide />

          <Typography sx={{ flexGrow: 1 }}></Typography>

          <RightSide />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
