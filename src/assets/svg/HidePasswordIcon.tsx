import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const HidePasswordIcon = () => (
  <Svg width={20} height={21} fill="none">
    <Path
      fill="#455AF7"
      d="M18.323 10.237c-1.358-3.573-4.666-5.902-8.328-5.862-3.638-.023-6.92 2.29-8.278 5.836a.915.915 0 0 0-.05.288.74.74 0 0 0 .05.272c1.354 3.551 4.636 5.873 8.278 5.854 3.637.022 6.919-2.292 8.278-5.837a.74.74 0 0 0 .05-.289.856.856 0 0 0 0-.262zm-8.328 4.637C7.177 14.868 4.61 13.168 3.39 10.5c1.216-2.672 3.785-4.373 6.604-4.373 2.82 0 5.388 1.701 6.604 4.373-1.22 2.67-3.786 4.369-6.604 4.375zM7.496 10.5c0-1.45 1.119-2.624 2.499-2.624 1.38 0 2.498 1.175 2.498 2.624 0 1.45-1.118 2.625-2.498 2.625-1.38 0-2.499-1.175-2.499-2.625z"
    />
  </Svg>
);

export default HidePasswordIcon;
