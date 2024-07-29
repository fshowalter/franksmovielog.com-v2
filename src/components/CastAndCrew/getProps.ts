import { getAvatarImageProps } from "src/api/avatars";
import { allCastAndCrew } from "src/api/castAndCrew";
import { ListItemAvatarImageConfig } from "src/components/ListItemAvatar";

import type { Props } from "./CastAndCrew";
import type { ListItemValue } from "./List";

export async function getProps(): Promise<Props> {
  const { castAndCrew } = await allCastAndCrew();

  castAndCrew.sort((a, b) => a.name.localeCompare(b.name));

  const values = await Promise.all(
    castAndCrew.map(async (member) => {
      const value: ListItemValue = {
        name: member.name,
        slug: member.slug,
        reviewCount: member.reviewCount,
        totalCount: member.totalCount,
        creditedAs: member.creditedAs,
        avatarImageProps: await getAvatarImageProps(
          member.slug,
          ListItemAvatarImageConfig,
        ),
      };

      return value;
    }),
  );

  return { values, initialSort: "name-asc" };
}
