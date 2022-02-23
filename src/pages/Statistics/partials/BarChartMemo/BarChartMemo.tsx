import React, { FC } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { moneyFormatter } from '../../../../utils/helpers';

type PropTypes = {
  data: Array<{
    name: string;
    value: number;
  }>;
};

export const BarChartMemo: FC<PropTypes> = React.memo(({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 25,
          bottom: 20,
          left: 25
        }}
      >
        <CartesianGrid
          stroke="#D0D4D8"
          vertical={false}
          horizontal
          strokeDasharray="3 3"
        />
        <XAxis
          dataKey="name"
          scale="band"
          stroke="#6D7986"
          tick={{ fontSize: 13 }}
        />
        <YAxis
          orientation="right"
          stroke="#6D7986"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 13 }}
          tickFormatter={value => moneyFormatter.format(value)}
        />
        <Tooltip />
        <Bar
          dataKey="value"
          barSize={40}
          fill="#D3E1EE"
          radius={[8, 8, 0, 0]}
        />
        <Line type="monotone" dataKey="value" stroke="#F03C2F" />
      </ComposedChart>
    </ResponsiveContainer>
  );
});
