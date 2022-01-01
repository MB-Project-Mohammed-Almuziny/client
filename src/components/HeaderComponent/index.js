import React from "react";
import { Layout } from "antd";

import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

export const HeaderComponent = () => {
  return (
    <Layout className="layout">
      <Layout.Header
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <LeftSide />

        <RightSide />
      </Layout.Header>
    </Layout>
  );
};
