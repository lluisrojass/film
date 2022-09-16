import * as React from 'react';
import Masonry from "react-masonry-css";
import styles from './index.module.scss';

const Grid: React.FunctionComponent<React.PropsWithChildren> = ({
  children
}) => (
  <Masonry 
    className={styles['masonry-grid']}
    columnClassName={styles['masonry-column']}
    breakpointCols={{
      default: 4,
      800: 2,
      1200: 3
    }}
  >
    {children}
  </Masonry>
);

export default Grid;