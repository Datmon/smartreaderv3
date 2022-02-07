import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const OrganaizerIcon = ({ focused }: { focused: boolean }) => {
  return focused ? (
    <Svg width={25} height={25} fill="none">
      <Path
        fill="#455AF7"
        d="M18.125 5.5h-12a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2z"
      />
      <Path
        stroke="#455AF7"
        d="M16.125 3.5v4m-8-4v4m-4 4h16m-9 4h1v3m-6-13h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2z"
      />
      <Path stroke="#fff" d="M11.125 15.5h1v3" />
    </Svg>
  ) : (
    <Svg width={25} height={25} fill="none">
      <Path
        fill="#fff"
        d="M18.125 5.5h-12a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2z"
      />
      <Path
        stroke="#718096"
        d="M16.125 3.5v4m-8-4v4m-4 4h16m-9 4h1v3m-6-13h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2z"
      />
    </Svg>
  );
};

export default OrganaizerIcon;
