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
import treeToList from '../../utils/tree-to-list';

const CommentsList = ({ _parent }) => {
  const dispatch = useDispatch();
  const store = useStore();
  const { t } = useTranslate();

  useInit(() => {
    _parent._id && dispatch(commentsActions.load(_parent._id));
  }, [_parent._id]);

  const select = useSelector((state) => ({
    exists: state.session.exists,
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

    submitComment: useCallback((commentText, parentId) => {
      if (commentText) {
        dispatch(commentsActions.submitComment(commentText, parentId));
      }
    }, [store]),

    resetEntityForComment: useCallback(() => {
      dispatch(commentsActions.resetEntityForComment());
    }, [store]),
  };

  const createCommentsHierarchy = (comments) => {
    return treeToList(listToTree(comments), (item, level) => ({
      ...item,
      level: level - 1,
    })).slice(1);
  };

  const sortedComments = createCommentsHierarchy(reduxSelect.comments);

  return (
    <Spinner active={reduxSelect.waiting}>
      <Comments commentsCount={reduxSelect.commentsCount} t={t}>
        {sortedComments.map((comment) => (
          <SingleComment key={comment._id} comment={comment} selectEntityForComment={callbacks.selectEntityForComment} t={t}>
            {reduxSelect.entityForComment === comment._id && (
              select.exists ? (
                <ReplyField
                  parent={comment}
                  submitComment={callbacks.submitComment}
                  resetEntityForComment={callbacks.resetEntityForComment}
                  title={t('replyField.newReply')}
                  t={t}
                />
              ) : (
                <ReplyFallback t={t} text={t('replyFallback.toReply')} resetEntityForComment={callbacks.resetEntityForComment}/>
              )
            )}
          </SingleComment>
        ))}
        {reduxSelect.entityForComment === _parent._id && (
          select.exists ? (
            <ReplyField
              parent={_parent}
              submitComment={callbacks.submitComment}
              title={t('replyField.newComment')}
              t={t}
            />
          ) : (
            <ReplyFallback t={t} text={t('replyFallback.toComment')}/>
          )
        )}
      </Comments>
    </Spinner>
  );
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
