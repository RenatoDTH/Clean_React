import React, { memo } from 'react';
import Logo from '@/presentation/components/logo/logo';
import Styles from './login-header-styes.scss';

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
};

export default memo(LoginHeader);
