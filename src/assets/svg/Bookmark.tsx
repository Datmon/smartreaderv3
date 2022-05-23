import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Bookmark = ({
  fill,
  width = 28,
  height = 28,
}: {
  fill?: string;
  width?: number;
  height?: number;
}) => (
  <Svg width={width} height={height} fill={fill ? fill : 'none'}>
    <Path
      fill={fill ? fill : '#4A5568'}
      d="M7 2.333h14a2.333 2.333 0 0 1 2.334 2.334V24.5a1.167 1.167 0 0 1-1.785.992l-6.93-4.34a1.167 1.167 0 0 0-1.237 0l-6.93 4.34a1.167 1.167 0 0 1-1.785-.992V4.667A2.333 2.333 0 0 1 7 2.333zm14 20.055V4.667H7v17.721l5.145-3.208a3.5 3.5 0 0 1 3.71 0L21 22.388z"
    />
  </Svg>
);

export default Bookmark;
