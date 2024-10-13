import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm({author, parentId, onAdd, onCancel, title, cancelButtonText, t}) {
  const cn = bem('CommentForm');
  const ref  = useRef(null)

  const onSend = (e) => {
    e.preventDefault();
    const value = ref.current?.value;
    if (!value.trim()) {
      console.error('Нельзя оставлять пустые комментарии');
      return;
    }
    const onSuccess = () => {
      ref.current.value = '';
      onCancel()
    }
    // {
    //   "text": "Первый ответ на коммент!",
    //   "parent": {"_id":  "670429839c74519426f378bd", "_type":  "comment"}
    // }
    onAdd({"text": value, "parent": {parentId, "_type": 'comment'}},author , onSuccess)

  }

  return (
    <form className={cn()} onSubmit={onSend}>
      <h3 className={cn('title')}>{title}</h3>
      <textarea ref={ref} className={cn('textarea')} placeholder={t('comments.placeholder')} />
      <div className={cn('actions')}>
        <button>{t('comments.send')}</button>
        {cancelButtonText && <button onClick={onCancel}>{cancelButtonText}</button>}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  t: PropTypes.func,
  title: PropTypes.string.isRequired,
  cancelButtonText: PropTypes.string,
};

export default memo(CommentForm);