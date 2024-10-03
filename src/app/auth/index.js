import { memo } from 'react';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import AuthBlock from '../../containers/auth-block';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import AuthForm from '../../components/auth-form';

function Auth() {
  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthBlock />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <AuthForm />
    </PageLayout>
  );
}

export default memo(Auth);
