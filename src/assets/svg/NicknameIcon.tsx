import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const NicknameIcon = ({ color }: { color: string }) => (
  <Svg width={12} height={18} fill="none">
    <Path
      stroke={color}
      d="M6 8.167A3.333 3.333 0 1 0 6 1.5a3.333 3.333 0 0 0 0 6.667zM1 16.5v-1.667A3.333 3.333 0 0 1 4.333 11.5h3.334A3.333 3.333 0 0 1 11 14.833V16.5"
    />
  </Svg>
);

export default NicknameIcon;
