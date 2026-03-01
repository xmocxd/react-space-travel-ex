/**
 * Ship image assets from img/ships. Exposes options for the construction form
 * and a lookup for displaying spacecraft by pictureUrl (filename).
 */
import img1 from '../img/ships/e8ac2be057b6ce2e2960d8c759f6fa07.jpg';
import img2 from '../img/ships/5e4102f7e11a545d81a72b6364457dd4.jpg';
import img3 from '../img/ships/1cd80866e57717beba65ee385e54a0f1.jpg';
import img4 from '../img/ships/9824fbb5e597b76c688fb0d6e694b288.jpg';
import img5 from '../img/ships/7b6a3b7749829779e843e1c722ff4c59.jpg';
import img6 from '../img/ships/cf182c16c0dfe31fbfea0939f263f593.jpg';
import img7 from '../img/ships/b7bd4d81a54eb3c09817633157abd28b.jpg';

const FILES = [
  'e8ac2be057b6ce2e2960d8c759f6fa07.jpg',
  '5e4102f7e11a545d81a72b6364457dd4.jpg',
  '1cd80866e57717beba65ee385e54a0f1.jpg',
  '9824fbb5e597b76c688fb0d6e694b288.jpg',
  '7b6a3b7749829779e843e1c722ff4c59.jpg',
  'cf182c16c0dfe31fbfea0939f263f593.jpg',
  'b7bd4d81a54eb3c09817633157abd28b.jpg',
];

const SOURCES = [img1, img2, img3, img4, img5, img6, img7];

/** Options for the construction form: { id: filename, src: imported url } */
export const SHIP_IMAGE_OPTIONS = FILES.map((id, i) => ({ id, src: SOURCES[i] }));

/** Map filename -> src for display lookup */
const SHIP_IMAGES_BY_FILE = Object.fromEntries(
  FILES.map((id, i) => [id, SOURCES[i]])
);

/** Returns the image src for a spacecraft pictureUrl (filename), or null if unknown. */
export function getShipImageSrc(pictureUrl) {
  if (!pictureUrl) return null;
  return SHIP_IMAGES_BY_FILE[pictureUrl] ?? null;
}
