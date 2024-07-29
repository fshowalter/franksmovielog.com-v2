import { basename, extname } from "node:path";

import { getImage } from "astro:assets";

import { normalizeSources } from "./utils/normalizeSources";

export interface PosterImageProps {
  src: string;
  srcSet: string;
}

interface Props {
  width: number;
  height: number;
}

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/posters/*.png",
);

const fluidWidthCache: Record<string, Record<string, PosterImageProps>> = {};

export async function getFluidWidthPosters({
  width,
  height,
}: Props): Promise<Record<string, PosterImageProps>> {
  const key = width.toString();

  if (key in fluidWidthCache) {
    return fluidWidthCache[key];
  }

  const imageMap: Record<string, PosterImageProps> = {};

  await Promise.all(
    Object.keys(images).map(async (image) => {
      const posterFile = await images[image]();

      const optimizedImage = await getImage({
        src: posterFile.default,
        width: width,
        height: height,
        format: "avif",
        widths: [0.25, 0.5, 1, 2].map((w) => w * width),
        quality: 80,
      });

      imageMap[basename(image, extname(image))] = {
        srcSet: normalizeSources(optimizedImage.srcSet.attribute),
        src: normalizeSources(optimizedImage.src),
      };
    }),
  );

  fluidWidthCache[key] = imageMap;

  return imageMap;
}

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

export async function getFixedWidthPosters(
  slugs: string[],
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
): Promise<Record<string, PosterImageProps>> {
  const imageMap: Record<string, PosterImageProps> = {};

  await Promise.all(
    slugs.map(async (slug) => {
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

      imageMap[basename(slug)] = {
        srcSet: normalizeSources(optimizedImage.srcSet.attribute),
        src: normalizeSources(optimizedImage.src),
      };
    }),
  );

  return imageMap;
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
