import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Layout, Menu, Rate } from "antd";
import { StarOutlined } from "@ant-design/icons";

import { Comments } from "./../components/Comments";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export const CourseLearn = () => {
  const [course, setCourse] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const [lessonContent, setLessonContent] = useState("");

  const { courseId } = useParams();

  const navigate = useNavigate();

  const getCourseInfo = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/course/${courseId}`)
        .then((result) => {
          setCourse(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserInfo = (e) => {
    e.preventDefault();

    navigate("/user/" + course.creator._id);
  };

  useEffect(() => {
    getCourseInfo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (course) setLessonContent(course.lessonSections[0].lessons[0].lesson);
  }, [course]);

  return course ? (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className="logo" />
        <Menu
          defaultSelectedKeys={[course.lessonSections[0].lessons[0]._id]}
          defaultOpenKeys={[course.lessonSections[0]._id]}
          mode="inline"
        >
          {course.lessonSections.map((section) => (
            <SubMenu key={section._id} title={section.sectionName}>
              {section.lessons.map((lesson) => (
                <Menu.Item
                  onClick={() => setLessonContent(lesson.lesson)}
                  key={lesson._id}
                >
                  {lesson.lessonName}
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>

      <Content>
        <Container>
          <Typography>{course.title}</Typography>

          <Typography>
            created by:
            <Typography
              onClick={handleUserInfo}
              className="pointer"
              variant="button"
              sx={{ textDecoration: "underline", color: "blue" }}
            >
              {course.creator.name}
            </Typography>
          </Typography>
          <hr />

          <ReactPlayer url={lessonContent} controls={true} width="100%" />

          <Typography variant="h6">Description</Typography>
          <Typography>{course.description}</Typography>

          <Typography variant="h6">About</Typography>
          <Typography>{course.about}</Typography>

          <Typography variant="h6">feedback</Typography>
          <Rate character={<StarOutlined />} />

          <Typography variant="h6">Reviews</Typography>
          {course.reviews.map((review) => (
            <Typography> {review}</Typography>
          ))}

          <Typography variant="h6">Comments</Typography>
          <Comments course={course} getCourseInfo={getCourseInfo} />
        </Container>
      </Content>
    </Layout>
  ) : (
    <Container sx={{ mx: "auto", width: 200 }}>
      <CircularProgress />
    </Container>
  );
};
