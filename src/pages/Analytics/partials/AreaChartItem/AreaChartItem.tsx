import React, { FC } from 'react';
import { Label } from 'arui-feather/label';
import { ArrowUpMIcon } from '@alfalab/icons-glyph/ArrowUpMIcon';
import { ArrowDownMIcon } from '@alfalab/icons-glyph/ArrowDownMIcon';

import { moneyFormatter } from '../../../../utils/helpers';

import AreaChartView from '../../../../assets/images/area-chart.png';

type PropTypes = {
  title: string;
  value: number;
};

export const AreaChartItem: FC<PropTypes> = ({ title, value }) => {
  return (
    <div className="thumbnail thumbnail__chart">
      <h3>{title}</h3>
      <img
        src={AreaChartView}
        loading="lazy"
        alt="area-chart"
        width="100%"
        height="auto"
      />
      <Label size="xl" isNoWrap className="bold_700">
        {moneyFormatter.format(value)}
      </Label>
      <div className="thumbnail__footer">
        <span className="thumbnail__profit">+20% к Июлю</span>
        <span>
          <ArrowUpMIcon fill="#0DBA26F2" />
          <ArrowDownMIcon fill="#EF3124F2" />
        </span>
      </div>
    </div>
  );
};
