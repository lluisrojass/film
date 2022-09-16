import { randomBytes } from 'crypto';
import { join } from 'path';
import { writeFileSync } from 'fs';
import Jimp, { read } from 'jimp';
import Args from './Args';
import Paths from './Paths';
import siteJson from '../../site.json';

class ImportScript {
  private args: Args = new Args(process.argv);
  private fileId: string = randomBytes(32).toString('hex')
  private thumbnailSizes: Record<string, number> = {
    'sm': 600,
    'md': 800,
    'lg': 1000,
  };
  private imageFile?: Jimp;

  public async run() {
    this.imageFile = await this.readImage();
    this.writeSourceFile();
    this.writeThumbnails();
    this.appendImageIndexFile();
  }

  private async writeSourceFile() {
    const destinationFile = join(Paths.images, this.getFileWithExtension());
    const imageClone = this.imageFile!.clone();
    this.writeImageFile(destinationFile, imageClone);
  }

  private writeThumbnails() {
    Object.keys(this.thumbnailSizes).forEach(size => {
      const sizeWidth = this.thumbnailSizes[size];
      const sourceImageCloned = this.imageFile!.clone();
      const sourceImageResized = sourceImageCloned.resize(sizeWidth, Jimp.AUTO);

      const outputPath = join(Paths.thumbnails, size, this.getFileWithExtension());
      
      this.writeImageFile(outputPath, sourceImageResized);
    });
  }

  private appendImageIndexFile() {
    const siteCopy = JSON.parse(JSON.stringify(siteJson)) as typeof siteJson;
    
    const imagePath = join(Paths.imagesPublic, this.getFileWithExtension());
    
    const smThumbnailPath = join(Paths.thumbnailsPublic, 'sm', this.getFileWithExtension());
    const mdThumbnailPath = join(Paths.thumbnailsPublic, 'md', this.getFileWithExtension());
    const lgThumbnailPath = join(Paths.thumbnailsPublic, 'lg', this.getFileWithExtension());

    siteCopy.images.push({
      id: this.fileId,
      target: '_blank',
      alt: 'alt',
      href: imagePath,
      lazy: true,
      srcSets: [
        {
          src: smThumbnailPath,
          breakpoints: {
            maxPx: 800
          },
          default: false,
          mime: 'image/bmp'
        },
        {
          src: mdThumbnailPath,
          breakpoints: {
            minPx: 800,
            maxPx: 1200
          },
          default: false,
          mime: 'image/bmp'
        },
        {
          src: lgThumbnailPath,
          breakpoints: {
            minPx: 1200
          },
          default: true,
          mime: 'image/bmp'
        }
      ],
    });

    writeFileSync(Paths.siteJson, JSON.stringify(siteCopy, null, 4), 'utf8');
  }

  private async readImage(): Promise<Jimp> {
    const sourceFile = this.args.getInput();
    return new Promise((resolve, reject) => {
      read(sourceFile, (error, image) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(image);
      });
    });
  }

  private writeImageFile(path: string, imageFile: Jimp) {
    imageFile.write(path, (error) => {
      if (error) {
        console.error(`Unable to write image to \`${path}\`: ${error.message}`);
        return;
      } else {
        console.error(`Succesfully wrote image to \`${path}\``);
      }
    });
  }

  private getFileWithExtension() {
    return `${this.fileId}.bmp`;
  }
}

export default ImportScript;