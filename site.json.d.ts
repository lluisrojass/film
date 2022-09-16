import { SiteImage } from './src/types';

interface Site {
  version: string;
  images: SiteImage[];
}

declare var site: Site;
export = site;