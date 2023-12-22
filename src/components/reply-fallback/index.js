import React, {memo} from 'react';
import { cn } from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

const replyFallback = cn("ReplyFallback");

const ReplyFallback = ({t, text, resetEntityForComment, onSignIn, addSpace = true}) => {

  const blockWithSpace = replyFallback({ space: addSpace })

  return (
    <div className={blockWithSpace}>
      <div className={replyFallback("authMessage")}>
        <p onClick={() => onSignIn()} className={replyFallback("authMessageLink")}>
          {t('replyFallback.logIn')}
        </p>
         {text}
        {resetEntityForComment && <p
            className={replyFallback("authMessageLink")}
            onClick={() => resetEntityForComment()}
          >
            {t('replyFallback.cancel')}
          </p>}
      </div>
    </div>
  );
};

ReplyFallback.propTypes = {
  redirectTo: PropTypes.string,
  resetEntityForComment: PropTypes.func,
  text: PropTypes.string,
  t: PropTypes.func,
  space: PropTypes.bool
};

ReplyFallback.defaultProps = {
  t: (text) => text,
};

export default memo(ReplyFallback);