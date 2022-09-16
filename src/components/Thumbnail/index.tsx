import * as React from 'react';
import styles from './index.module.scss';
import { SiteImage, SiteBreakpoints } from '../../types';

const Thumbnail: React.FunctionComponent<SiteImage> = ({
  id,
  alt,
  lazy,
  target,
  srcSets,
  href,
}) => {
  const defaultSrcSet = srcSets.find(srcSet => srcSet.default) || srcSets[0];

  const createMediaFromBreakpoints = (breakpoint: SiteBreakpoints): string => {
    let parts = [];
    if (breakpoint.minPx) parts.push(`(min-width: ${breakpoint.minPx}px)`);
    if (breakpoint.maxPx) parts.push(`(max-width: ${breakpoint.maxPx}px)`);

    if (!parts.length) return '';
    return parts.join(' and ');
  }

  return (
    <a id={id} className={styles.anchor} href={href} target={target}>
      <img 
        className={styles.img}
        src={defaultSrcSet.src}
        alt={alt}
        loading={!!lazy ? 'lazy' : 'eager'}
      />
    </a>
  );
}

export default Thumbnail;