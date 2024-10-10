import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
//import './style.css';

function CommentHeader(props) {
  const { count = 0, t = text => text } = props;
  const cn = bem('CommentHeader');
  return (
    <div className={cn()}>{t("comment.header" )} ({count})</div>
  );
}

CommentHeader.propTypes = {
  count: PropTypes.number,
  t: PropTypes.func,
};

export default memo(CommentHeader);