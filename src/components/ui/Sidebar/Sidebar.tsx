import React, { FC } from 'react';
import clsx from 'clsx';
import { EcobankLogoIcon } from '../icons/EcobankLogo';
import s from './Sidebar.module.css';

const Sidebar: FC = () => {
  return (
    <header className={clsx('sidebar', s.sidebar)}>
      <div className={s.sidebar_logo}>
        <EcobankLogoIcon width={201} height={19} color="#fff" />
      </div>
    </header>
  );
};

export default Sidebar;
