import React from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
// import moment from 'moment';

import { AddComment } from "./AddComment";

export const Comments = ({ course, getCourseInfo }) => {
  return <AddComment course={course} getCourseInfo={getCourseInfo} />;
};
