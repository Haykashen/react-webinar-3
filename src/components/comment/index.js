import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentList from '../comment_list';
import CommentForm from '../comment_form';
import { toCommentDate } from '../../utils/date';
//import CommentNoAuth from '../comment-no-auth';
import './style.css';

function Comment({comment, openCommentId, onCancel, onAdd, onOpen, isAuth, t = text => text }) {
  const { author, text, dateCreate, isDeleted, children, _id } = comment;
  const cn = bem('Comment');
  //const onAddAnswer = (text, onSuccess) => onAdd({parent: {_id, _type: 'comment'}, text}, onSuccess)
  console.log('author.profile.name=',author.profile.name )
  console.log('_id, openCommentId =',_id, openCommentId)
  return (
    <div className={cn()}>
      <div className={cn('user-date')}>
        <div className={cn('user')}>{author.profile.name}</div>
        <div className={cn('date')}>{toCommentDate(dateCreate)}</div>
      </div>
      <p className={cn('text')}>{ isDeleted ? t('comments.deleted-comment') : text}</p>
      <button className={cn('answer-btn')} onClick={() => onOpen(_id)}>
        {t('comments.answer')}
      </button>
      {isAuth && openCommentId === _id && (
        <CommentForm
          author={author.profile.name}
          parentId ={_id}
          onAdd={onAdd}
          onCancel={onCancel}
          title={t('comments.new-answer')}
          cancelButtonText={t('comments.cancel')}
          t={t}
        />
      )}

      {!!children?.length && (
        <CommentList
          comments={children}
          onAdd={onAdd}
          openCommentId={openCommentId}
          onCancel={onCancel}
          onOpen={onOpen}
          isAuth={isAuth}
          isChildList
          t={t}
        />
        )}
    </div>
  );
}
// {!isAuth && openCommentId === _id && (
//     <CommentNoAuth
//       onCancel={onCancel}
//       buttonText={t('comments.cancel')}
//       text={t('comments.not-auth-text-answer')}
//       t={t}
//     />
//   )}
Comment.propTypes = {
  comment: PropTypes.shape({
    children: PropTypes.array,
    _id: PropTypes.string.isRequired,
    parent: PropTypes.shape({
      _id: PropTypes.string,
      _type: PropTypes.oneOf(['article', 'comment']),
    }),
    text: PropTypes.string.isRequired,
    dateCreate: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  onCancel: PropTypes.func,
  onAdd: PropTypes.func,
  onOpen: PropTypes.func,
  isAuth: PropTypes.bool,
  t: PropTypes.func,
};

export default memo(Comment);