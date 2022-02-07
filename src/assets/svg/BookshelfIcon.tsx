import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const BookshelfIcon = ({ focused }: { focused: boolean }) => {
  return focused ? (
    <Svg width={25} height={25} fill="none">
      <Path
        fill="#455AF7"
        stroke="#455AF7"
        d="M2.375 6.5s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1v-14zm10 0s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1v-14z"
      />
    </Svg>
  ) : (
    <Svg width={25} height={25} fill="none">
      <Path
        stroke="#718096"
        d="M2.375 6.5s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1v-14zm10 0s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1v-14z"
      />
    </Svg>
  );
};

export default BookshelfIcon;
