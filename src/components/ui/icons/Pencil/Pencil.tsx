import React, { FC } from 'react';
import { IconProps } from '../Icon/model';
import { Icon } from '../Icon';

export const PencilIcon: FC<IconProps> = ({
  color = '#0B1F35',
  width,
  height,
  ...props
}) => {
  return (
    <Icon width={width} height={height} fill="none" {...props}>
      <path
        d="M0 16V10.6L7.6 3L13 8.4L5.4 16H0ZM5 15L11.6 8.4L7.6 4.4L1 11.1V15H5Z"
        fill={color}
      />
      <path
        d="M6.77899 3.821L9.97899 0.621002L15.379 6.021L12.179 9.221L6.77899 3.821ZM12.189 7.866L14.007 6.049L9.97899 2.021L8.17899 3.821L12.189 7.866Z"
        fill={color}
      />
      <path opacity="0.2" d="M5.2 15.5H0.5V10.8L5.2 15.5Z" fill={color} />
    </Icon>
  );
};
