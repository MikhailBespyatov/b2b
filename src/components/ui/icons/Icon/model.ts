import { SVGAttributes } from 'react';

export type IconProps = {
  originalWidth?: number;
  originalHeight?: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  viewBox?: string;
  color?: string;
  className?: string;
} & SVGAttributes<SVGElement>;
