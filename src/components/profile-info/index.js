import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useTranslate from '../../hooks/use-translate';

function ProfileCard({ profile }) {
  const cn = bem('ProfileInfo');
  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('profile.title')}</div>
      <div className={cn('row')}>
        {t('profile.name')}: <strong>{profile?.fullName || '-'}</strong>
      </div>
      <div className={cn('row')}>
        {t('profile.phone')}: <strong>{profile?.contactPhone || '-'}</strong>
      </div>
      <div className={cn('row')}>
        {t('profile.email')}: <strong>{profile?.contactEmail || '-'}</strong>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
  }),
  t: PropTypes.func,
};

export default memo(ProfileCard);
