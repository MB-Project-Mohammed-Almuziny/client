import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { EnroleOrLearnBtn } from "./../components/EnroleOrLearnBtn";
import { CourseSettingBtn } from "./../components/CourseSettingBtn";
import { BlockCourseBtn } from "./../components/BlockCourseBtn";
import { RatingStatus } from "./../components/RatingStatus";
import { Reviews } from "./../components/Reviews";
import { UserReview } from "./../components/UserReview";

export const CourseInfo = () => {
  const [course, setCourse] = useState();
  const [reviews, setReviews] = useState();

  const { courseId } = useParams();
  const { userId } = useSelector((state) => state.account);

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
      console.error(err);
    }
  };

  const getReviews = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/reviews/${courseId}`)
        .then((result) => {
          setReviews(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCourseInfo();
    getReviews();
    // eslint-disable-next-line
  }, []);

  return course ? (
    <Layout.Content className="content" style={{ minHeight: "100vh" }}>
      <EnroleOrLearnBtn />
      <CourseSettingBtn courseId={course._id} creator={course.creator} />
      <BlockCourseBtn courseId={course._id} />

      <p>{course.title}</p>

      <p>
        created by:
        <Link to={`/user/${course.creator._id}`}>{course.creator.name}</Link>
      </p>
      <hr />

      <h1>Description</h1>
      <p>{course.description}</p>

      <h1>About</h1>
      <p>{course.about}</p>

      <h1>rating status</h1>
      {reviews && reviews.result[0] && <RatingStatus reviews={reviews} />}

      <h1>Reviews</h1>
      {userId && (
        <UserReview
          creator={userId}
          reference={course._id}
          getReviews={getReviews}
        />
      )}
      {reviews && reviews.result[0] && <Reviews reviews={reviews} />}
    </Layout.Content>
  ) : (
    <Layout.Content className="content">
      <LoadingOutlined className="loadingIcon" />
    </Layout.Content>
  );
};
