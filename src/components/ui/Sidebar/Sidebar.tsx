import React, { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { EcobankLogoIcon } from '../icons/EcobankLogo';
import { ROOT, SIDEBAR_ITEMS } from '../../../navigation/CONSTANTS';
import s from './Sidebar.module.css';

const Sidebar: FC = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <header className={s.sidebar}>
      <div className={s.sidebar_logo}>
        <EcobankLogoIcon width={136} height={36} color="#fff" />
      </div>
      <div>
        {SIDEBAR_ITEMS.map(({ title, path }) => {
          const isActive =
            path === pathname ||
            (path === ROOT &&
              !SIDEBAR_ITEMS.find(item => item.path === pathname));

          return (
            <Link
              key={title}
              className={clsx(
                s.sidebar_item,
                isActive && s.sidebar_item_active
              )}
              to={path}
            >
              {t(title)}
            </Link>
          );
        })}
      </div>
    </header>
  );
};

export default Sidebar;
