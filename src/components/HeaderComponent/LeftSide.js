import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown, Form, Input } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

export const LeftSide = () => {
  const navigate = useNavigate();

  const categories = ["General", "Software", "Business", "Lifestyle"];

  const menu = (
    <Menu>
      {categories.map((category) => (
        <Menu.Item key={category}>
          <Link to={"/category/" + category}> {category}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item onClick={() => navigate("/")} key="logo">
        CoursesSite
      </Menu.Item>

      <Dropdown overlay={menu}>
        <a
          className="ant-dropdown-link"
          href="#empty"
          onClick={(e) => e.preventDefault()}
        >
          Categorys <DownOutlined />
        </a>
      </Dropdown>

      <Input.Search
        placeholder="input search term"
        onSearch={(term) => navigate("/search/" + term)}
        style={{ width: 200, margin: "auto", marginLeft: "20px" }}
      />
    </Menu>
  );
};
