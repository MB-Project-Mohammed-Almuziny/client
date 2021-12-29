import React from "react";
import { Comment, List } from "antd";
// import moment from 'moment';

export const Replys = ({ replys }) => {
  return (
    <List
      className="comment-list"
      header={`${replys.length} reply`}
      itemLayout="horizontal"
      dataSource={replys}
      renderItem={(comment) => (
        <li>
          <Comment
            author={comment.creator.name}
            avatar={comment.creator.avatar}
            content={comment.description}
          />
        </li>
      )}
    />
  );
};
