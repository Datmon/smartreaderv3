import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const EmailIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={14} fill="none">
    <Path
      stroke={color}
      d="M16.5 2.833c0-.92-.746-1.666-1.667-1.666H3.167c-.92 0-1.667.746-1.667 1.666m15 0v8.334c0 .92-.746 1.666-1.667 1.666H3.167c-.92 0-1.667-.746-1.667-1.666V2.833m15 0-7.5 5-7.5-5"
    />
  </Svg>
);

export default EmailIcon;
