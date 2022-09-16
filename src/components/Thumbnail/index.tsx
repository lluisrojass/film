import * as React from 'react';
import styles from './index.module.scss';

interface ThumbnailBreakpoints {
  minPx?: number;
  maxPx?: number;
}

interface ThumbnailSrcSet {
  src: string;
  mime: string;
  default?: boolean;
  breakpoints: ThumbnailBreakpoints;
}

export interface ThumbnailProps {
  id: string;
  href: string;
  alt: string;
  target?: "_blank";
  lazy?: boolean;
  srcSets: Array<ThumbnailSrcSet>
}

const Thumbnail: React.FunctionComponent<ThumbnailProps> = ({
  id,
  alt,
  lazy,
  target,
  srcSets,
  href,
}) => {
  const defaultSrcSet = srcSets.find(srcSet => srcSet.default) || srcSets[0];

  const createMediaFromBreakpoints = (breakpoint: ThumbnailBreakpoints): string => {
    let parts = [];
    if (breakpoint.minPx) parts.push(`(min-width: ${breakpoint.minPx}px)`);
    if (breakpoint.maxPx) parts.push(`(max-width: ${breakpoint.maxPx}px)`);

    if (!parts.length) return '';
    return parts.join(' and ');
  }

  return (
    <a id={id} className={styles.anchor} href={href} target={target}>
      <picture className={styles.picture}>
        {srcSets.map(srcSet => (
          <source
            media={createMediaFromBreakpoints(srcSet.breakpoints)}
            srcSet={srcSet.src}
            type={srcSet.mime}
          />
        ))}
        <img 
          src={defaultSrcSet.src}
          alt={alt}
          loading={!!lazy ? 'lazy' : 'eager'}
        />
      </picture>
    </a>
  );
}

export default Thumbnail;