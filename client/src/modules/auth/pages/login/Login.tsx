import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store';
import useModal from '../../../modal/hooks/useModal';
import { sendLoginCode } from '../../../../store/auth/authThunk';
import { addDataOnLogin } from '../../../../store/auth/authSlice';

import Form from '../../components/form/Form';
import ButtonsForm from '../../components/buttons-form/ButtonsForm';
import MainInput from '../../../../ui/inputs/main-input/MainInput';
import PrimaryButton from '../../../../ui/buttons/PrimaryButton/PrimaryButton';
import MyLink from '../../../../ui/link/MyLink';
import PasswordInput from '../../components/password-iput/PasswordInput';
import useCodeLoading from '../../hooks/useCodeLoading';

import type { InputEventType, PasswordInputType } from '../../models';

export default function Login() {
  const dispatch = useAppDispatch();
  const modal = useModal();

  const { t } = useTranslation();
  const { codeLoading, isAuth } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordInputType, setPasswordInputType] =
    useState<PasswordInputType>('password');

  const onEmailChange = (event: InputEventType) => {
    setEmail(event.target.value);
  };

  const onSendCode = () => {
    if (!email.includes('@') && !email.includes('.')) {
      return modal('error', t('auth.incorrectEmail'));
    }
    if (password.length < 3) {
      return modal('error', t('auth.shortPassword'));
    }
    const title = {
      email,
      password,
      authType: 'login',
    };
    dispatch(sendLoginCode(title));
    dispatch(addDataOnLogin(title));
  };

  useCodeLoading('codeLoading');

  const isCodeAndLoaded = isAuth === 'code' && codeLoading === 'success';
  const isNotAuth = isAuth === 'notAuth';
  const _isAuth = isAuth === 'auth';

  return (
    <>
      {_isAuth && <Navigate to='/chat' />}
      {isCodeAndLoaded && <Navigate to='/auth/code' />}
      {isNotAuth && (
        <Form inputMode={passwordInputType}>
          <MainInput
            placeholder={t('auth.email')}
            type='text'
            value={email}
            onChange={onEmailChange}
          />
          <PasswordInput
            passwordInputType={passwordInputType}
            setPasswordInputType={setPasswordInputType}
            password={password}
            setPassword={setPassword}
          />
          <ButtonsForm>
            <PrimaryButton onClick={onSendCode}>
              {t('auth.sendCode')}
            </PrimaryButton>
            <MyLink to='/auth/forgot'>{t('auth.forgotPassword')}</MyLink>
            <MyLink to='/auth/registration'>{t('auth.createAccount')}</MyLink>
          </ButtonsForm>
        </Form>
      )}
    </>
  );
}