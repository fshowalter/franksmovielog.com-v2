import { getBackdrop } from "src/api/backdrops";
import { getPage } from "src/api/pages";
import { mostRecentReviews } from "src/api/reviews";
import { getStills } from "src/api/stills";
import { StillListItemImageConfig } from "src/components/StillListItem";

import type { Props } from "./Article";
import { StillImageConfig } from "./Article";

export async function getProps({
  slug,
  alt,
}: {
  slug: string;
  alt: string;
}): Promise<Props> {
  const { title, content } = await getPage(slug);

  const moreReviewsValues = await mostRecentReviews(4);

  const backdropImageProps = await getBackdrop(slug, StillImageConfig);

  const moreReviewsStills = await getStills(
    moreReviewsValues.map((value) => value.slug),
    StillListItemImageConfig,
  );

  return {
    title,
    content,
    alt,
    moreReviewsStills,
    backdropImageProps,
    moreReviewsValues,
  };
}
