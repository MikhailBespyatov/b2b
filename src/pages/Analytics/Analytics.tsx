import React, { FC } from 'react';
import { Col, Row } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import { Typography } from '@alfalab/core-components/typography';

import { AreaChartItem, PieChartItem } from './partials';
import { RangePicker } from '../../components/DatePicker';
import './Analytics.css';

export const Analytics: FC = () => {
  const { t } = useTranslation();

  const data = [
    {
      id: 1,
      title: t('analytics.category.mainResults.chart1'),
      value: 2304981
    },
    {
      id: 2,
      title: t('analytics.category.mainResults.chart2'),
      value: 2304982
    },
    {
      id: 3,
      title: t('analytics.category.mainResults.chart3'),
      value: 2304983
    }
  ];

  const data2 = [
    {
      id: 1,
      title: t('analytics.category.statisticalResults.chart1')
    },
    {
      id: 2,
      title: t('analytics.category.statisticalResults.chart2')
    },
    {
      id: 3,
      title: t('analytics.category.statisticalResults.chart3')
    },
    {
      id: 4,
      title: t('analytics.category.statisticalResults.chart4')
    },
    {
      id: 5,
      title: t('analytics.category.statisticalResults.chart5')
    },
    {
      id: 6,
      title: t('analytics.category.statisticalResults.chart6')
    },
    {
      id: 7,
      title: t('analytics.category.statisticalResults.chart7')
    }
  ];

  return (
    <>
      <Row className="mb-20" align="center">
        <Col>
          <Typography.Title tag="h2" font="system" className="title-1">
            {t('analytics.category.mainResults')}
          </Typography.Title>
        </Col>
        <Col
          xxl="content"
          xl="content"
          lg="content"
          md="content"
          sm="content"
          xs="content"
        >
          <RangePicker />
        </Col>
      </Row>
      <Row gutterWidth={20} className="mb-20">
        {data.map(item => {
          return (
            <Col
              key={item.id}
              xl={4}
              lg={4}
              md={6}
              sm={6}
              xs={12}
              className="mb-20"
            >
              <AreaChartItem title={item.title} value={item.value} />
            </Col>
          );
        })}
      </Row>
      <Typography.Title tag="h2" font="system" className="title-1 mb-20">
        {t('analytics.category.statisticalResults')}
      </Typography.Title>
      <Row gutterWidth={20} className="mb-20">
        {data2.map(item => {
          return (
            <Col
              key={item.id}
              xl={4}
              lg={4}
              md={6}
              sm={6}
              xs={12}
              className="mb-20"
            >
              <PieChartItem title={item.title} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
