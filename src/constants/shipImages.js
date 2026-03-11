// expose ship image assests for ship detail
import img1 from '../img/ships/1.jpg';
import img2 from '../img/ships/2.jpg';
import img3 from '../img/ships/3.jpg';
import img4 from '../img/ships/4.jpg';
import img5 from '../img/ships/5.jpg';
import img6 from '../img/ships/6.jpg';
import img7 from '../img/ships/7.jpg';

const FILES = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'];

const SOURCES = [img1, img2, img3, img4, img5, img6, img7];

export const SHIP_IMAGE_OPTIONS = FILES.map((id, i) => ({ id, src: SOURCES[i] }));

const SHIP_IMAGES_BY_FILE = Object.fromEntries(
  FILES.map((id, i) => [id, SOURCES[i]])
);

export function getShipImageSrc(pictureUrl) {
  if (!pictureUrl) return null;
  return SHIP_IMAGES_BY_FILE[pictureUrl] ?? null;
}
