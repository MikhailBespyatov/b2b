import React, { FC } from 'react';
import { IconProps } from './model';

const getSize = (width: number = 13, height: number = 13, ratio: number) => {
  return {
    ...(width && { width, height: width / ratio }),
    ...(height && { width: height * ratio, height })
  };
};

const getViewBox = (
  viewBox: string | undefined,
  originalWidth: number,
  originalHeight: number
) => viewBox || `0 0 ${originalWidth} ${originalHeight}`;

export const Icon: FC<IconProps> = ({
  originalWidth,
  originalHeight,
  width,
  height,
  fill = '#000',
  stroke = '',
  children,
  viewBox,
  ...props
}) => (
  <svg
    {...props}
    fill={fill}
    stroke={stroke}
    viewBox={getViewBox(viewBox, width, height)}
    {...getSize(width, height, width / height)}
  >
    {children}
  </svg>
);
