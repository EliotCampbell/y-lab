import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Comments from '../../components/comments';
import SingleComment from '../../components/single-comment';
import ReplyField from '../../components/reply-field';
import Spinner from '../../components/spinner';
import ReplyFallback from '../../components/reply-fallback';
import useInit from '../../hooks/use-init';
import {useDispatch, useSelector as useSelectorRedux} from "react-redux";
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';
import {useNavigate} from "react-router-dom";
import treeToComments from "../../utils/tree-to-comments";

const CommentsList = ({ _parent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const store = useStore();
  const {t} = useTranslate();

  useInit(() => {
    _parent._id && dispatch(commentsActions.load(_parent._id));
  }, [_parent._id]);

  const select = useSelector((state) => ({
    exists: state.session.exists,
    user: state.session.user
  }));

  const reduxSelect = useSelectorRedux((state) => ({
    waiting: state.comments.waiting,
    comments: state.comments.data.comments,
    commentsCount: state.comments.data.count,
    entityForComment: state.comments.entityForComment,
  }), shallowequal);

  const callbacks = {
    selectEntityForComment: useCallback((id) => {
      dispatch(commentsActions.selectEntityForComment(id));
    }, [store]),

    submitComment: useCallback((event, commentText, parentId) => {
      event.preventDefault()
      if (commentText.trim()) {
        dispatch(commentsActions.submitComment(commentText, parentId));
      }
    }, [store]),

    resetEntityForComment: useCallback(() => {
      dispatch(commentsActions.resetEntityForComment());
    }, [store]),

    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  };

  const transformComments = (comments = []) => {
    const tree = listToTree(comments)[0]?.children
    return treeToComments(tree, (item, level) => (
      {...item, addSpace: level >= 1 && level <= 15,}
    ))
  }

  const comments = transformComments(reduxSelect.comments)

  const renderComments = (commentsArray) => (
    commentsArray.map(comment => {
      const highlightUsername = comment.author._id === select.user._id
      return (
        <SingleComment key={comment._id} comment={comment} selectEntityForComment={callbacks.selectEntityForComment} t={t} highlightUsername={highlightUsername} addSpace={comment.addSpace}>
          <>
            {comment.children.length > 0 && renderComments(comment.children)}
            {reduxSelect.entityForComment === comment._id && renderReply(comment)}
          </>
        </SingleComment>
      )
    })
  )

  const renderReply = (comment) => (
      select.exists ? (
        <ReplyField
          parent={comment}
          submitComment={callbacks.submitComment}
          resetEntityForComment={callbacks.resetEntityForComment}
          title={t('replyField.newReply')}
          t={t}
        />
      ) : (
        <ReplyFallback t={t} text={t('replyFallback.toReply')} resetEntityForComment={callbacks.resetEntityForComment} onSignIn={callbacks.onSignIn}/>
      )
  )

  return (
    <Spinner active={reduxSelect.waiting}>
      <Comments commentsCount={reduxSelect.commentsCount} t={t}>
        {renderComments(comments)}
        {reduxSelect.entityForComment === _parent._id && (
          select.exists ? (
            <ReplyField
              parent={_parent}
              submitComment={callbacks.submitComment}
              title={t('replyField.newComment')}
              t={t}
              addSpace={false}
            />
          ) : (
            <ReplyFallback t={t} text={t('replyFallback.toComment')} onSignIn={callbacks.onSignIn} addSpace={false}/>
          )
        )}
      </Comments>
    </Spinner>)
};

CommentsList.propTypes = {
  _parent: PropTypes.shape({
    _id: PropTypes.string,
    _type: PropTypes.string,
  }),
};

CommentsList.defaultProps = {
  _parent: { _id: '', _type: '' },
};

export default memo(CommentsList);
