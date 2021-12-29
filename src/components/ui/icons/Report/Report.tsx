import React, { FC } from 'react';
import { IconProps } from '../Icon/model';
import { Icon } from '../Icon';

export const ReportIcon: FC<IconProps> = ({
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
        d="M1 0C0.447715 0 0 0.447715 0 1V15C0 15.5523 0.447716 16 1 16H13C13.5523 16 14 15.5523 14 15V1C14 0.447715 13.5523 0 13 0H1ZM2 4C2 3.44772 2.44772 3 3 3H11C11.5523 3 12 3.44772 12 4C12 4.55228 11.5523 5 11 5H3C2.44772 5 2 4.55228 2 4ZM2 8C2 7.44772 2.44772 7 3 7H8C8.55228 7 9 7.44772 9 8C9 8.55228 8.55228 9 8 9H3C2.44772 9 2 8.55228 2 8Z"
        fill={color}
      />
    </Icon>
  );
};
