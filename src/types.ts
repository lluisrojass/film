export interface SiteBreakpoints {
  minPx?: number;
  maxPx?: number;
}

export interface SiteSrcSet {
  src: string;
  mime: string;
  default?: boolean;
  breakpoints: SiteBreakpoints;
}

export interface SiteImage {
  id: string;
  href: string;
  alt: string;
  target?: "_blank";
  lazy?: boolean;
  srcSets: Array<SiteSrcSet>
}
