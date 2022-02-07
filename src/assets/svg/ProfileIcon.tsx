import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ProfileIcon = ({ focused }: { focused: boolean }) => {
  return focused ? (
    <Svg width={25} height={25} fill="none">
      <Path
        fill="#455AF7"
        d="M12.625 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-6 10v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
      />
      <Path
        stroke="#455AF7"
        d="M16.625 7.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-10 14v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2h-12z"
      />
    </Svg>
  ) : (
    <Svg width={25} height={25} fill="none">
      <Path
        stroke="#718096"
        d="M12.625 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-6 10v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
      />
    </Svg>
  );
};

export default ProfileIcon;
