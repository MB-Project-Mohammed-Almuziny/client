import React from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
// import moment from 'moment';

import { AddComment } from "./AddComment";

export const Comments = ({ course, getCourseInfo }) => {
  console.log("comments : ", course);
  return (
    <>
      <AddComment course={course} getCourseInfo={getCourseInfo} />

      <List
        className="comment-list"
        header={`${course.comments.length} comments`}
        itemLayout="horizontal"
        dataSource={course.comments}
        renderItem={(comment) => (
          <li>
            <Comment
              actions={[<span key="comment-list-reply-to-0">Reply to</span>]}
              author={comment.creator.name}
              avatar={comment.creator.avatar}
              content={comment.description}
            />
          </li>
        )}
      />
    </>
  );
};
