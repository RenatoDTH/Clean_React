import React, { memo, useContext } from 'react';
import { Logo } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';
import { useHistory } from 'react-router-dom';
import Styles from './header-styles.scss';

const Header: React.FC = () => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);
  const logout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    setCurrentAccount(undefined);
    history.replace('/login');
  };

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>Renato</span>
          <a data-testid="logout" onClick={logout} href="/">
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
