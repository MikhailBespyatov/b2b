import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@alfalab/core-components/typography';
import Button from 'arui-feather/button';
import {
  TechnicalWorkDesktopScreen,
  TechnicalWorkMobileScreen
} from 'components/ui/icons/TechnicalWork';

import styles from './TechnicalWork.module.css';

const TechnicalWork: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className="mobile-only">
        <TechnicalWorkMobileScreen
          width={375}
          height={350}
          className={styles.svg}
        />
      </div>
      <div className="desktop-only">
        <TechnicalWorkDesktopScreen
          width={1920}
          height={1080}
          className={styles.svg}
        />
      </div>
      <div className={styles.footer}>
        <Typography.Title tag="h1" font="system" className={styles.title}>
          {t('page.error.tech_work.title')}
        </Typography.Title>
        <Typography.Text className={styles.text}>
          {t('page.error.tech_work.text')}
        </Typography.Text>

        <div className={styles.button}>
          <Button size="m" view="extra">
            {t('page.error.tech_work.button')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalWork;
