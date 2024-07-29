import { getImage } from "astro:assets";

import { normalizeSources } from "./utils/normalizeSources";

export interface StillImageData {
  src: string;
  srcSet: string;
}

export const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/stills/*.png",
);

export async function getOpenGraphStillSrc(slug: string) {
  const stillFilePath = Object.keys(images).find((path) => {
    return path.endsWith(`${slug}.png`);
  })!;

  const stillFile = await images[stillFilePath]();

  const image = await getImage({
    src: stillFile.default,
    width: 1200,
    height: 675,
    format: "jpeg",
    quality: 80,
  });

  return image.src;
}

export async function getStills(
  slugs: string[],
  { width, height }: { width: number; height: number },
): Promise<Record<string, StillImageData>> {
  const imageMap: Record<string, StillImageData> = {};

  await Promise.all(
    slugs.map(async (slug) => {
      const stillFilePath = Object.keys(images).find((path) => {
        return path.endsWith(`${slug}.png`);
      })!;

      const stillFile = await images[stillFilePath]();

      const optimizedImage = await getImage({
        src: stillFile.default,
        width: width,
        height: height,
        format: "avif",
        widths: [0.25, 0.5, 1, 2].map((w) => w * width),
        quality: 80,
      });

      imageMap[slug] = {
        srcSet: normalizeSources(optimizedImage.srcSet.attribute),
        src: normalizeSources(optimizedImage.src),
      };
    }),
  );

  return imageMap;
}

export async function getStill(
  slug: string,
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
): Promise<StillImageData> {
  const stillFilePath = Object.keys(images).find((path) => {
    return path.endsWith(`${slug}.png`);
  })!;

  const stillFile = await images[stillFilePath]();

  const optimizedImage = await getImage({
    src: stillFile.default,
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
