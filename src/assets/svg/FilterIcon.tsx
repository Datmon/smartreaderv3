import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FilterIcon = () => (
  <Svg width={18} height={17} fill="none">
    <Path
      stroke="#1A202C"
      d="M7.33 13.593h-6.3M10.14 3.9h6.301M5.726 3.846A2.355 2.355 0 0 0 3.363 1.5 2.355 2.355 0 0 0 1 3.846a2.355 2.355 0 0 0 2.363 2.347 2.355 2.355 0 0 0 2.363-2.347zM17 13.554a2.354 2.354 0 0 0-2.363-2.347 2.355 2.355 0 0 0-2.364 2.347 2.355 2.355 0 0 0 2.364 2.346A2.354 2.354 0 0 0 17 13.554z"
    />
  </Svg>
);

export default FilterIcon;
