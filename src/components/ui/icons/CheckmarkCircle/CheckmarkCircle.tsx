import React, { FC } from 'react';
import { IconProps } from '../Icon/model';
import { Icon } from '../Icon';

export const CheckmarkCircle: FC<IconProps> = ({
  color = '#fff',
  width = 48,
  height = 48,
  ...props
}) => (
  <Icon width={width} height={height} fill="none" {...props}>
    <path
      d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24Z"
      fill="#0DBA26"
    />
    <path
      d="M20.2726 29.7518L13.587 23.0056L12.0908 24.4545L20.2726 32.6363L36.4545 16.4545L34.9381 14.9482L20.2726 29.7518Z"
      fill="white"
    />
  </Icon>
);
