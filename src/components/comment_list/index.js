import { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Comment from '../comment';
import './style.css';
  
function CommentList({comments, onAdd, openCommentId, onCancel, onOpen, t, isChildList, isAuth}) {
  const cn = bem('CommentList');
  return (
      <ul className={cn({child: isChildList})}>
        {comments?.map(comment => (
          <li key={comment._id}>
            <Comment
              openCommentId={openCommentId}
              comment={comment}
              onAdd={onAdd}
              onCancel={onCancel}
              onOpen={onOpen}
              isAuth={isAuth}
              t={t}
            />
          </li>
        ))}
      </ul>
    );
  }
  
  CommentList.propTypes = {
    openCommentId: PropTypes.string,
    comments: PropTypes.array,
    onAdd: PropTypes.func,
    onCancel: PropTypes.func,
    onOpen: PropTypes.func,
    isChildList: PropTypes.bool,
    isAuth: PropTypes.bool,
    t: PropTypes.func,
  };
  
  export default memo(CommentList);