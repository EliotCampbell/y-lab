import React, {memo} from 'react';
import { Link } from "react-router-dom";
import { cn } from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

const cnCommentReply = cn("ReplyFallback");

const ReplyFallback = ({t, text, resetEntityForComment, redirectTo = '/login' }) => {

  return (
    <div className={cnCommentReply()}>
      <div className={cnCommentReply("authMessage")}>
        <Link to={redirectTo} className={cnCommentReply("authMessageLink")}>
          {t('replyFallback.logIn')}
        </Link>
         {text}
          <p
            className={cnCommentReply("authMessageLink")}
            onClick={() => resetEntityForComment()}
          >
            {t('replyFallback.cancel')}
          </p>
      </div>
    </div>
  );
};

ReplyFallback.propTypes = {
  redirectTo: PropTypes.string,
  resetEntityForComment: PropTypes.func,
  text: PropTypes.string,
  t: PropTypes.func
};

ReplyFallback.defaultProps = {
  t: (text) => text,
  resetEntityForComment: () => {},
};

export default memo(ReplyFallback);