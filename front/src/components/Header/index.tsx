import React from 'react';

import 'styles/header.scss';

import StaycationLogo from './StaycationLogo';
import { useUser } from 'hooks/useUser';

const Header = () => {
  const { data, isLoading } = useUser();
  return (
    <div className="header">
      <StaycationLogo />
      <div className="header__user">
        {isLoading ? (
          <div className="skeleton__text" />
        ) : (
          <p>Welcome, {data?.firstName ?? 'Stranger'} !</p>
        )}
      </div>
    </div>
  );
};

export default Header;
