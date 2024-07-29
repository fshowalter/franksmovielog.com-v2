import type { AvatarImageProps } from "src/api/avatars";
import type { Review } from "src/api/reviews";

import { Chip } from "./Chip";

interface Props {
  values: (Review["collections"][number] & {
    avatarImageProps: AvatarImageProps | null;
  })[];
}

export function CollectionChips({ values }: Props): JSX.Element {
  return (
    <>
      {values.map((value) => {
        return (
          <li key={value.slug} className="block">
            <Chip
              linkTarget={`/collections/${value.slug}`}
              name={value.name}
              key={value.slug}
              imageProps={value.avatarImageProps}
            />
          </li>
        );
      })}
    </>
  );
}
