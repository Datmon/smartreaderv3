import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ShowPasswordIcon = ({ color }: { color: any }) => (
  <Svg width={20} height={18} fill="none">
    <Path
      stroke={color}
      d="m2.5 1.5 15 15M8.82 7.822a1.667 1.667 0 0 0 2.357 2.359M7.802 3.47A7.888 7.888 0 0 1 10 3.167c3.333 0 6.11 1.944 8.333 5.833-.648 1.134-1.343 2.103-2.086 2.907m-1.783 1.55c-1.36.917-2.846 1.376-4.464 1.376-3.333 0-6.111-1.944-8.333-5.833 1.14-1.996 2.427-3.48 3.86-4.45"
    />
  </Svg>
);

export default ShowPasswordIcon;
