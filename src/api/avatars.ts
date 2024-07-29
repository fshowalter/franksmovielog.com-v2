import { getImage } from "astro:assets";

import { normalizeSources } from "./utils/normalizeSources";

export interface AvatarImageData {
  src: string;
  srcSet: string;
}

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/avatars/*.png",
);

export async function getAvatars(
  slugs: string[],
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
): Promise<Record<string, AvatarImageData>> {
  const imageMap: Record<string, AvatarImageData> = {};

  await Promise.all(
    slugs.map(async (slug) => {
      const avatarFilePath = Object.keys(images).find((path) => {
        return path.endsWith(`${slug}.png`);
      });

      if (!avatarFilePath) {
        return null;
      }

      const avatarFile = await images[avatarFilePath]();

      const optimizedImage = await getImage({
        src: avatarFile.default,
        width: width,
        height: height,
        format: "avif",
        densities: [1, 2],
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
