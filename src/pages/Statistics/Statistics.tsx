import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { BarChartItem } from './partials';
import './Statistics.css';

const Statistics: FC = () => {
  const { t } = useTranslation();
  const moneyTurnoverData = useMemo(() => {
    return [
      {
        name: '1 окт',
        value: 2400
      },
      {
        name: '8 окт',
        value: 3000
      },
      {
        name: '15 окт',
        value: 2000
      },
      {
        name: '22 окт',
        value: 2780
      },
      {
        name: '29 окт',
        value: 1890
      },
      {
        name: '31 окт',
        value: 2390
      }
    ];
  }, []);

  return (
    <>
      <BarChartItem
        key="moneyTurnover"
        title={t('statistics.collapse.moneyTurnover')}
        data={moneyTurnoverData}
      />
      <BarChartItem
        key="profitByOrder"
        title={t('statistics.collapse.profitByOrder')}
        data={moneyTurnoverData}
      />
      <BarChartItem
        key="orderQuantity"
        title={t('statistics.collapse.orderQuantity')}
        data={moneyTurnoverData}
      />
    </>
  );
};

export default Statistics;
