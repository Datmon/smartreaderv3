import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ForwardIcon = ({
  width = 28,
  height = 28,
}: {
  fill?: string;
  width?: number;
  height?: number;
}) => (
  <Svg width={width} height={height} fill="none">
    <Path
      d="M18.3328 9.16666L12.4994 1.66666V5.83332C2.5386 5.83332 1.38944 13.8983 1.6661 18.3333C2.08444 16.0958 2.2786 12.5 12.4994 12.5V16.6667L18.3328 9.16666Z"
      stroke="#455AF7"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default ForwardIcon;
