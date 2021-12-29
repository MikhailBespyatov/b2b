import React, { FC, useState } from 'react';
import { Collapse } from '@alfalab/core-components/collapse';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronForwardExtraMIcon } from '@alfalab/icons-glyph/ChevronForwardExtraMIcon';

import { TopMenu, BarChartMemo } from '../index';

type PropTypes = {
  title: string;
  data: Array<{
    name: string;
    value: number;
  }>;
};

export const BarChartItem: FC<PropTypes> = ({ title, data }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="collapse-wrapper">
      <button
        type="button"
        className="collapsible title-1"
        onClick={() => setExpanded(prev => !prev)}
      >
        {title}
        {expanded ? <ChevronDownMIcon /> : <ChevronForwardExtraMIcon />}
      </button>
      <Collapse expanded={expanded}>
        <div className="collapse__content">
          <TopMenu />
          <BarChartMemo data={data} />
        </div>
      </Collapse>
    </div>
  );
};
