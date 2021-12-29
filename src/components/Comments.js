import { React, useState, useEffect } from "react";
import { Comment, List } from "antd";
// import moment from 'moment';

import { AddComment } from "./AddComment";
import { AddReply } from "./AddReply";
import { Replys } from "./Replys";

export const Comments = ({ course, getCourseInfo }) => {
  const [showReplyForm, setShowReplyForm] = useState(
    Array(course.comments.length).fill(false)
  );

  const toggleShowReplyForm = (i) => {
    const newArr = [...showReplyForm];
    newArr.splice(i, 1, !showReplyForm[i]);
    setShowReplyForm(newArr);
  };

  return (
    <>
      <AddComment course={course} getCourseInfo={getCourseInfo} />

      <List
        className="comment-list"
        header={`${course.comments.length} comments`}
        itemLayout="horizontal"
        dataSource={course.comments}
        renderItem={(comment, i) => (
          <>
            <li>
              <Comment
                actions={[
                  <span
                    key={comment._id + "reply"}
                    onClick={() => toggleShowReplyForm(i)}
                  >
                    Reply to
                  </span>,
                ]}
                author={comment.creator.name}
                avatar={comment.creator.avatar}
                content={comment.description}
              >
                <AddReply
                  commentId={comment._id}
                  showReplyForm={showReplyForm[i]}
                  toggleShowReplyForm={toggleShowReplyForm}
                  getCourseInfo={getCourseInfo}
                  i={i}
                />

                <Replys replys={comment.replays} />
              </Comment>
            </li>
            <hr />
          </>
        )}
      />
    </>
  );
};
