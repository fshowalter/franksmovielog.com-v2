import { getImage } from "astro:assets";

import { normalizeSources } from "./utils/normalizeSources";

export interface PosterImageProps {
  src: string;
  srcSet: string;
}

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/posters/*.png",
);

export async function getFluidWidthPosterImageProps(
  slug: string | null,
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
): Promise<PosterImageProps> {
  if (!slug) {
    slug = "default";
  }

  const poasterFilePath = Object.keys(images).find((path) => {
    return path.endsWith(`${slug}.png`);
  })!;

  const posterFile = await images[poasterFilePath]();

  const optimizedImage = await getImage({
    src: posterFile.default,
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

export async function getFixedWidthPosterImageProps(
  slug: string | null,
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
): Promise<PosterImageProps> {
  if (!slug) {
    slug = "default";
  }

  const poasterFilePath = Object.keys(images).find((path) => {
    return path.endsWith(`${slug}.png`);
  })!;

  const posterFile = await images[poasterFilePath]();

  const optimizedImage = await getImage({
    src: posterFile.default,
    width: width,
    height: height,
    format: "avif",
    densities: [1, 2],
    quality: 80,
  });

  return {
    srcSet: normalizeSources(optimizedImage.srcSet.attribute),
    src: normalizeSources(optimizedImage.src),
  };
}
