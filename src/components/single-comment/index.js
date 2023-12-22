import React, {memo} from "react";
import { cn } from "@bem-react/classname";
import './style.css'
import PropTypes from "prop-types";

const cnSingleComment = cn("SingleComment");

const SingleComment = ({t, comment, children, selectEntityForComment, highlightUsername = false, addSpace}) => {
  const toLocaleOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return (
    <div className={cnSingleComment()}>
      {addSpace && <div className={cnSingleComment("space")}/>}
      <div className={cnSingleComment("body")}>
        <div className={cnSingleComment("commentInfo")}>
          <p className={cnSingleComment(highlightUsername ? "username_highlighted" : "username")}>
            {comment.author.profile.name}
          </p>
          <p className={cnSingleComment("timeStamp")}>
            {new Date(comment.dateCreate).toLocaleString("RU-ru", toLocaleOptions)}
          </p>
        </div>
        <p className={cnSingleComment("content")}>{comment.text}</p>
        <p
          className={cnSingleComment("reply")}
          onClick={() => selectEntityForComment(comment._id)}
        >
          {t('singleComment.makeReply')}
        </p>
        {children}
      </div>
    </div>
  );
};

SingleComment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    level: PropTypes.number,
    dateCreate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    text: PropTypes.string,
  }),
  selectEntityForComment: PropTypes.func,
  children: PropTypes.node,
  t: PropTypes.func
};

SingleComment.defaultProps = {
  selectEntityForComment: () => {},
  t: (text) => text
};

export default memo(SingleComment);