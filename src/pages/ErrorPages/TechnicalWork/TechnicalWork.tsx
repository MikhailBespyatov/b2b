import React, { FC } from 'react';
import { Typography } from '@alfalab/core-components/typography';
import Button from 'arui-feather/button';
import cloud_1 from 'assets/screens/cloud_1.svg';
import cloud_2 from 'assets/screens/cloud_2.svg';
import cloud_3 from 'assets/screens/cloud_3.svg';

import { ReactComponent as TechnicalWorkScreen } from 'assets/screens/technical_work.svg';

import styles from './TechnicalWork.module.css';

const TechnicalWork: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mobile_style}>mobile</div>
      <div className={styles.desktop_style}>
        <img alt="cloud_1" className={styles.cloud_1} src={cloud_1} />
        <img alt="cloud_2" className={styles.cloud_2} src={cloud_2} />
        <TechnicalWorkScreen className={styles.desktop_big_img} />
        <img alt="cloud_3" className={styles.cloud_3} src={cloud_3} />
      </div>

      <Typography.Title tag="h1" font="system" className={styles.title}>
        Сейчас у нас технические работы
      </Typography.Title>
      <Typography.Text className={styles.text}>
        Улучшаем сервис для вас. Попробуйте зайти чуть позже
      </Typography.Text>

      <div className={styles.button}>
        <Button size="m" view="extra">
          Вернуться в магазин
        </Button>
      </div>
    </div>
  );
};

export default TechnicalWork;
