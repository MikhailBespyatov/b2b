import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-grid-system';
import { Label } from 'arui-feather/label';
import { Select } from 'arui-feather/select';

import { DashboardIcon, ReportIcon } from '../../../../components/ui/icons';
import { RangePicker } from '../../../../components/DatePicker';

export const TopMenu: FC = () => {
  const { t } = useTranslation();
  const options = [
    { value: '01', text: 'ИП Фридман М.М.' },
    { value: '02', text: 'ООО «Виктори»' },
    { value: '03', text: 'ФГУП НПП ВНИИЭМ' }
  ];

  return (
    <Row className="top-menu" gutterWidth={8}>
      <Col xl={3} lg={3} md={6} sm={12} xs={12}>
        <button className="btn curved-btn-blue">
          <DashboardIcon width={14} height={14} />
          <Label size="m" isNoWrap={true} className="bold_300">
            {t('statistics.button.dashboard')}
          </Label>
        </button>
        <button className="btn curved-btn-red">
          <ReportIcon width={14} height={16} />
          <Label size="m" isNoWrap={true} className="bold_300">
            {t('statistics.button.report')}
          </Label>
        </button>
      </Col>
      <Col
        xl={5}
        lg={4}
        md={6}
        style={{
          textAlign: 'right'
        }}
      >
        <Select
          size="m"
          mode="radio"
          options={options}
          className="select_theme_alfa-on-white select-button"
        />
      </Col>
      <Col xl={4} lg={5} md={6}>
        <RangePicker />
      </Col>
    </Row>
  );
};
