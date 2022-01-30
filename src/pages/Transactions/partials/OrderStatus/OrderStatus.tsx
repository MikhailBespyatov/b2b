import React, { FC } from 'react';
import { Typography } from '@alfalab/core-components/typography';

import { CheckmarkCircle } from '../../../../components/ui/icons';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';

type PropTypes = {
  status: 'success' | 'error';
  title: string;
};

export const OrderStatus: FC<PropTypes> = ({ status, title }) => {
  return (
    <div className="align-center">
      {status === 'success' ? <CheckmarkCircle width={64} height={64} /> : null}
      {status === 'error' && (
        <CrossCircleMIcon width={64} height={64} fill="red" />
      )}
      <Typography.Title tag="h2" font="system" style={{ color: '#172A3F' }}>
        {title}
      </Typography.Title>
    </div>
  );
};
