import * as React from 'react';
import * as styles from './index.module.scss';

const Region: React.FunctionComponent<{
  children: React.ReactNode
}> = ({
  children
}) => (
  <div className={styles.region}>
    {children}
  </div>
);

export default Region;