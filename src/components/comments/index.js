import React, {memo} from 'react';
import './style.css'
import PropTypes from "prop-types";

const Comments = ({t, children, commentsCount}) => {


  return (
    <div className={'Comments'}>
      <p className={'Comments-title'}>{t('comments.comments')}({commentsCount})</p>
      {children}
    </div>
  );
};

Comments.propTypes = {
  children: PropTypes.node,
  commentsCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  t: PropTypes.func
};

Comments.defaultProps = {
  commentsCount: '-default-',
  t: (text) => text
};

export default memo(Comments);