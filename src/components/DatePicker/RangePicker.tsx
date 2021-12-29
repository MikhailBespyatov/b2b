import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeProvider from 'arui-feather/theme-provider';
import { CalendarInput } from 'arui-feather/calendar-input';

import s from './RangePicker.module.css';

export const RangePicker: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={s.rangePicker}>
      <span>{t('date.range.from')}</span>
      <ThemeProvider theme="alfa-on-color">
        <CalendarInput size="s" />
      </ThemeProvider>
      <span>{t('date.range.till')}</span>
      <ThemeProvider theme="alfa-on-color">
        <CalendarInput size="s" />
      </ThemeProvider>
    </div>
  );
};
