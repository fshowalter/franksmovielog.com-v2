import type { AvatarImageProps } from "src/api/avatars";
import type { Review } from "src/api/reviews";

import { Chip } from "./Chip";

interface Props {
  values: (Review["castAndCrew"][number] & {
    avatarImageProps: AvatarImageProps | null;
  })[];
}

export function CastAndCrewChips({ values }: Props): JSX.Element {
  return (
    <>
      {values.map((value) => {
        return (
          <li key={value.slug} className="block">
            <Chip
              linkTarget={`/cast-and-crew/${value.slug}/`}
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
