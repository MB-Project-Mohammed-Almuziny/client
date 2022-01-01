import React from "react";
import { useNavigate } from "react-router-dom";

import { Layout, Menu } from "antd";

// import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

export const HeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <>
      <Layout className="layout">
        <Layout.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Menu theme="dark" mode="horizontal">
            <Menu.Item onClick={() => navigate("/")} key="logo">
              CoursesSite
            </Menu.Item>
          </Menu>

          <RightSide />
        </Layout.Header>
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
