import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export function createIcon(IconComponent: React.FC<IconProps>) {
  return IconComponent;
}
