import React, { FC } from 'react';
import { Grid } from '@alfalab/core-components/grid';
import { useTranslation } from 'react-i18next';
import { Typography } from '@alfalab/core-components/typography';

import { AreaChartItem, PieChartItem } from './partials';
import './Analytics.css';

const Analytics: FC = () => {
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
      <Typography.Title tag="h2" font="system" className="title-1 mb-20">
        {t('analytics.category.mainResults')}
      </Typography.Title>
      <Grid.Row className="mb-20">
        {data.map(item => {
          return (
            <Grid.Col
              key={item.id}
              width={{ desktop: { s: 4, m: 4 } }}
              className="mb-20"
            >
              <AreaChartItem title={item.title} value={item.value} />
            </Grid.Col>
          );
        })}
      </Grid.Row>
      <Typography.Title tag="h2" font="system" className="title-1 mb-20">
        {t('analytics.category.statisticalResults')}
      </Typography.Title>
      <Grid.Row className="mb-20">
        {data2.map(item => {
          return (
            <Grid.Col
              key={item.id}
              width={{ desktop: { s: 4, m: 4 } }}
              className="mb-20"
            >
              <PieChartItem title={item.title} />
            </Grid.Col>
          );
        })}
      </Grid.Row>
    </>
  );
};

export default Analytics;
