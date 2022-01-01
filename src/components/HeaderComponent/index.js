import React from "react";
import { AppBar, Typography, Box, Toolbar } from "@mui/material";

import { Layout, Menu, Breadcrumb, Avatar, Button } from "antd";

import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

const { Header, Content, Footer } = Layout;

export const HeaderComponent = () => {
  return (
    <>
      <Layout className="layout">
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Menu theme="dark" mode="horizontal">
            <Menu.Item> CoursesSite</Menu.Item>
          </Menu>

          <RightSide />
        </Header>
      </Layout>

      {/* <Box sx={{ flexGrow: 1 }}>
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
      </Box> */}
    </>
  );
};

{
  /* <Layout className="layout">
  <Header>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
      <Menu.Item> hallow</Menu.Item>
      <Menu.Item>
        {" "}
        <Avatar />
      </Menu.Item>
    </Menu>
  </Header>
</Layout>; */
}
