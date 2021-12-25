import React from "react";
import { Link, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const LeftSide = () => {
  return (
    <>
      <Link color="inherit" underline="none" href="/" mr={2}>
        home
      </Link>
      <TextField
        id="search"
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </>
  );
};
