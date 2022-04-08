import React, { FC } from 'react';
import { Typography } from '@alfalab/core-components/typography';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';

import { CheckmarkCircle } from 'components/ui/icons';

type PropTypes = {
  status: 'success' | 'error';
  title: string;
};

const StatusMessage: FC<PropTypes> = ({ status, title }) => {
  return (
    <div className="align-center">
      {status === 'success' ? <CheckmarkCircle width={64} height={64} /> : null}
      {status === 'error' && (
        <CrossCircleMIcon width={64} height={64} fill="red" />
      )}
      <Typography.Title tag="h4" font="system" view="small" className="mt-16">
        {title}
      </Typography.Title>
    </div>
  );
};

export default StatusMessage;
