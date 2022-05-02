import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const SearchIcon = () => (
  <Svg width={18} height={19} fill="none">
    <Circle cx={8.806} cy={8.805} r={7.49} stroke="#4A5568" />
    <Path stroke="#4A5568" d="m14.016 14.404 2.936 2.93" />
  </Svg>
);

export default SearchIcon;
