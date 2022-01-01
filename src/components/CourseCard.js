import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Typography } from "antd";

const { Link } = Typography;

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Col span={6}>
      <Card
        hoverable
        cover={<img alt="example" src={course.thumbnail} />}
        onClick={() => navigate("/course/" + course._id)}
      >
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
