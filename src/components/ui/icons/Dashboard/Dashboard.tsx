import React, { FC } from 'react';
import { IconProps } from '../Icon/model';
import { Icon } from '../Icon';

export const DashboardIcon: FC<IconProps> = ({
  color = '#fff',
  width,
  height,
  ...props
}) => {
  return (
    <Icon width={width} height={height} fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1C0 0.447715 0.447715 0 1 0H5C5.55228 0 6 0.447715 6 1V5C6 5.55228 5.55228 6 5 6H1C0.447715 6 0 5.55228 0 5V1ZM0 9C0 8.44772 0.447715 8 1 8H13C13.5523 8 14 8.44772 14 9V13C14 13.5523 13.5523 14 13 14H1C0.447716 14 0 13.5523 0 13V9ZM9 0C8.44772 0 8 0.447715 8 1V5C8 5.55228 8.44772 6 9 6H13C13.5523 6 14 5.55228 14 5V1C14 0.447715 13.5523 0 13 0H9Z"
        fill={color}
      />
    </Icon>
  );
};
