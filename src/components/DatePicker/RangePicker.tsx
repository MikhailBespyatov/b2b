import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarInput } from '@alfalab/core-components/calendar-input';

import s from './RangePicker.module.css';

export const RangePicker: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={s.rangePicker}>
      <span>{t('date.range.from')}</span>
      <CalendarInput size="s" />
      <span>{t('date.range.till')}</span>
      <CalendarInput size="s" />
    </div>
  );
};
