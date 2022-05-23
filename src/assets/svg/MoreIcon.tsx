import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const MoreIcon = ({
  fill = '#455AF7',
  width = 28,
  height = 28,
}: {
  fill?: string;
  width?: number;
  height?: number;
}) => (
  <Svg width={width} height={height} fill={fill ? fill : 'none'}>
    <Path
      fill={fill}
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6ZM12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10ZM10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18Z"
    />
  </Svg>
);

export default MoreIcon;
