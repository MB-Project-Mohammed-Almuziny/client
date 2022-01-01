import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

export const LeftSide = () => {
  const navigate = useNavigate();

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item onClick={() => navigate("/")} key="logo">
        CoursesSite
      </Menu.Item>
    </Menu>
  );
};
