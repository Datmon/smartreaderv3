import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PasswordIcon = ({ color }: { color: string }) => (
  <Svg width={14} height={18} fill="none">
    <Path
      stroke={color}
      d="M3.667 8.167V4.833a3.333 3.333 0 0 1 6.666 0v3.334m-7.5 0h8.334c.92 0 1.666.746 1.666 1.666v5c0 .92-.746 1.667-1.667 1.667H2.833c-.92 0-1.667-.746-1.667-1.667v-5c0-.92.747-1.666 1.667-1.666zm5 4.166a.833.833 0 1 1-1.667 0 .833.833 0 0 1 1.667 0z"
    />
  </Svg>
);

export default PasswordIcon;
