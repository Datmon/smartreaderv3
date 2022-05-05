import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FlagIcon = () => (
  <Svg width={16} height={16} fill="none">
    <Path
      stroke="#A0AEC0"
      d="M2.668 10h9.243a.667.667 0 0 0 .512-1.093L10.001 6l2.422-2.907A.666.666 0 0 0 11.911 2H2.668v12"
    />
  </Svg>
);

export default FlagIcon;
