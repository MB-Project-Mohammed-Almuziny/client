import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Typography } from "antd";

const { Link } = Typography;

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/course/" + course._id);
  };

  const handleUserInfo = (e) => {
    e.preventDefault();

    navigate("/user/" + course.creator._id);
  };

  return (
    <Col span={6}>
      <Card hoverable cover={<img alt="example" src={course.thumbnail} />}>
        <Card.Meta
          title={course.title}
          description={
            <Link href={"/user/" + course.creator._id}>
              by : {course.creator.name}
            </Link>
          }
        />
      </Card>
    </Col>
  );
};
