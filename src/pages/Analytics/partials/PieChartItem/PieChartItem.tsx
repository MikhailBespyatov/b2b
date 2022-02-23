import React, { FC } from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';
import { calculatePercent } from 'utils/helpers';

type PropTypes = {
  title: string;
};

export const PieChartItem: FC<PropTypes> = ({ title }) => {
  const COLORS = [
    '#69CECE',
    '#0E3464',
    '#13A463',
    '#2FC26E',
    '#F04539F2',
    '#D5F3E2'
  ];
  const data01 = [
    { name: 'косметика', value: 400 },
    { name: 'обувь', value: 300 },
    { name: 'украшения', value: 300 },
    { name: 'электроника', value: 200 }
  ];

  const total = 1200;
  return (
    <div className="thumbnail thumbnail__chart">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          >
            {data01.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            iconType="circle"
            payload={data01.map((item, index) => ({
              id: item.name,
              color: COLORS[index % COLORS.length],
              value: `${calculatePercent(total, item.value)}% ${item.name}`
            }))}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
