import { useTranslation } from 'react-i18next';

import useModal from '../../modal/hooks/useModal';
import { useAppSelector } from '../../../store';
import { useEffect } from 'react';

const useCodeLoading = (type: 'codeLoading' | 'authLoading') => {
  const modal = useModal();

  const { t } = useTranslation();
  const loading = useAppSelector((state) => state.auth[type]);

  const errorText =
    type === 'codeLoading' ? t('auth.checkEmail') : t('auth.codeWrong');
  const successText =
    type === 'codeLoading' ? t('auth.codeSuccess') : t('auth.codeRight');

  useEffect(() => {
    if (loading === 'loading') {
      modal('loading', t('auth.codeSending'), 0);
    } else if (loading === 'success') {
      modal('success', successText);
    } else if (loading === 'error') {
      modal('error', errorText);
    }
    return () => {};
  }, [loading]);
};

export default useCodeLoading;
