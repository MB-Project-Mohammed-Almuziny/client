import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { Container, Typography, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Layout, Menu } from "antd";
import ReactPlayer from "react-player";

const { Header, Footer, Sider, Content } = Layout;
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
    if (course)
      setLessonContent(course.lessonSections[0].lessons[0].lessonName);
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
          <ReactStars
            count={5}
            size={50}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
          <Typography variant="h6">Reviews</Typography>
          {course.reviews.map((review) => (
            <Typography> {review}</Typography>
          ))}
        </Container>
      </Content>
    </Layout>
  ) : (
    <Container sx={{ mx: "auto", width: 200 }}>
      <CircularProgress />
    </Container>
  );
};
