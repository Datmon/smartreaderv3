import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CrossIcon = () => (
  <Svg width={8} height={8} fill="none">
    <Path
      fill="#718096"
      d="M7.9 6.96a.333.333 0 0 1 0 .473l-.467.467a.333.333 0 0 1-.473 0L4 4.94 1.04 7.9a.333.333 0 0 1-.474 0L.1 7.433a.333.333 0 0 1 0-.473L3.06 4 .1 1.04a.333.333 0 0 1 0-.473L.566.1a.333.333 0 0 1 .474 0L4 3.06 6.96.1a.333.333 0 0 1 .473 0L7.9.567a.333.333 0 0 1 0 .473L4.94 4 7.9 6.96z"
    />
  </Svg>
);

export default CrossIcon;
