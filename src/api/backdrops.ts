import { getImage } from "astro:assets";

import { normalizeSources } from "./utils/normalizeSources";

export interface BackdropImageProps {
  src: string;
  srcSet: string;
}

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/backdrops/*.png",
);

export async function getOpenGraphBackdropSrc(slug: string) {
  const backdropFilePath = Object.keys(images).find((path) => {
    return path.endsWith(`${slug}.png`);
  })!;

  const backdropFile = await images[backdropFilePath]();

  const image = await getImage({
    src: backdropFile.default,
    width: 1200,
    height: 675,
    format: "jpeg",
    quality: 80,
  });

  return normalizeSources(image.src);
}

export async function getBackdropImageProps(
  slug: string,
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
): Promise<BackdropImageProps> {
  const backdropFilePath = Object.keys(images).find((path) => {
    return path.endsWith(`${slug}.png`);
  })!;

  const backdropFile = await images[backdropFilePath]();

  const optimizedImage = await getImage({
    src: backdropFile.default,
    width: width,
    height: height,
    format: "avif",
    widths: [0.25, 0.5, 1, 2].map((w) => w * width),
    quality: 80,
  });

  return {
    srcSet: normalizeSources(optimizedImage.srcSet.attribute),
    src: normalizeSources(optimizedImage.src),
  };
}
