import React, { FC } from 'react';
import { IconProps } from './model';

const getSize = (width: number, height: number, ratio: number) => {
  if (!width && !height) {
    return { width: 13, height: 13 };
  }
  if (width && height) {
    return { width, height };
  }
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
    viewBox={getViewBox(
      viewBox,
      (originalWidth = width),
      (originalHeight = height)
    )}
    {...getSize(width, height, originalWidth / originalHeight)}
  >
    {children}
  </svg>
);
