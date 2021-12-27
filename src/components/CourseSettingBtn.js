import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

export const CourseSettingBtn = ({ creator }) => {
  const [isCreator, setIsCreator] = useState(false);

  const { userId } = useSelector((state) => state.account);

  useEffect(() => {
    userId === creator._id && setIsCreator(true);
  }, []);

  return isCreator ? (
    <Button variant="contained">Course setting</Button>
  ) : (
    <></>
  );
};
