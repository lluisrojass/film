import { join, resolve } from 'path';

const paths = {
  thumbnails: resolve(__dirname, '../../public/thumbnails'),
  thumbnailsPublic: '/thumbnails',
  images: resolve(__dirname, '../../public/images'),
  imagesPublic: '/images',
  siteJson: resolve(__dirname, '../../site.json'),
} as const;

export default paths;