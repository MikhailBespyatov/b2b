import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@alfalab/core-components/grid';
import { Label } from 'arui-feather/label';
import { Select } from 'arui-feather/select';

import { DashboardIcon, ReportIcon } from 'components/ui/icons';

export const TopMenu: FC = () => {
  const { t } = useTranslation();
  const options = [
    { value: '01', text: 'ИП Фридман М.М.' },
    { value: '02', text: 'ООО «Виктори»' },
    { value: '03', text: 'ФГУП НПП ВНИИЭМ' }
  ];

  return (
    <Grid.Row className="top-menu">
      <Grid.Col width={{ desktop: { s: 12, m: 6, l: 3 } }}>
        <button type="button" className="btn curved-btn-blue">
          <DashboardIcon width={14} height={14} />
          <Label size="m" isNoWrap className="bold-300">
            {t('statistics.button.dashboard')}
          </Label>
        </button>
        <button type="button" className="btn curved-btn-red">
          <ReportIcon width={14} height={16} />
          <Label size="m" isNoWrap className="bold-300">
            {t('statistics.button.report')}
          </Label>
        </button>
      </Grid.Col>
      <Grid.Col width={{ desktop: { s: 12, m: 6, l: 3 } }}>
        <Select
          size="m"
          mode="radio"
          options={options}
          className="select_theme_alfa-on-white select-button"
        />
      </Grid.Col>
    </Grid.Row>
  );
};
