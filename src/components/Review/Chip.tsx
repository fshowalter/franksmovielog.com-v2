import type { AvatarImageProps } from "src/api/avatars";
import { Avatar } from "src/components/Avatar";

export const ChipAvatarImageConfig = {
  width: 40,
  height: 40,
  quality: 80,
};

export function Chip({
  linkTarget,
  name,
  imageProps,
}: {
  linkTarget: string;
  name: string;
  imageProps: AvatarImageProps | null;
}) {
  return (
    <a
      href={linkTarget}
      className="flex items-center whitespace-nowrap rounded-lg bg-inverse px-4 py-2 text-accent shadow-all hover:shadow-accent"
    >
      <Avatar
        alt={`More ${name} reviews`}
        name={name}
        width={ChipAvatarImageConfig.width}
        height={ChipAvatarImageConfig.height}
        imageProps={imageProps}
        loading="lazy"
        decoding="async"
        className="mr-[1ch] block size-10 rounded-[50%]"
      />
      {name}
    </a>
  );
}
