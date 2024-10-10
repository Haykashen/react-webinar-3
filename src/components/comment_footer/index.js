import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
//import './style.css';

function CommentFooter(props) {
  const { t = text => text } = props;
  const cn = bem('CommentFooter');
  return (
    <div className={cn()}>
      <Link to="/login">{t("comment.login" )}</Link>
      {t("comment.footer" )}
    </div>
  );
}

CommentFooter.propTypes = {
  t: PropTypes.func,
};

export default memo(CommentFooter);