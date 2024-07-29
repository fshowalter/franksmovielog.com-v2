import { getAvatars } from "src/api/avatars";
import { getFluidWidthPosterImageProps } from "src/api/posters";
import { allReviews, loadContent } from "src/api/reviews";
import { getOpenGraphStillSrc, getStill, getStills } from "src/api/stills";
import { StillListItemImageConfig } from "src/components/StillListItem";

import { ChipAvatarImageConfig } from "./Chips";
import { PosterImageConfig } from "./Credits";
import { type Props, StillImageConfig } from "./Review";

export async function getProps(slug: string): Promise<Props> {
  const { reviews } = await allReviews();

  const review = reviews.find((review) => {
    return review.slug === slug;
  })!;

  const value = await loadContent(review);
  const seoImageSrc = await getOpenGraphStillSrc(slug);
  const stillImageProps = await getStill(slug, StillImageConfig);

  const avatarSlugs = new Set<string>();

  value.castAndCrew.forEach((member) => {
    avatarSlugs.add(member.slug);
  });

  value.collections.forEach((collection) => {
    avatarSlugs.add(collection.slug);
  });

  const chipAvatars = await getAvatars(
    Array.from(avatarSlugs),
    ChipAvatarImageConfig,
  );

  const moreReviewsSlugs = new Set<string>();

  value.moreCastAndCrew.forEach((member) => {
    member.titles.forEach((title) => {
      moreReviewsSlugs.add(title.slug);
    });
  });

  value.moreCollections.forEach((collection) => {
    collection.titles.forEach((title) => {
      moreReviewsSlugs.add(title.slug);
    });
  });

  value.moreReviews.forEach((title) => {
    moreReviewsSlugs.add(title.slug);
  });

  const moreReviewsStills = await getStills(
    Array.from(moreReviewsSlugs),
    StillListItemImageConfig,
  );

  const posterImageProps = await getFluidWidthPosterImageProps(
    slug,
    PosterImageConfig,
  );

  return {
    value,
    seoImageSrc,
    stillImageProps,
    moreReviewsStills,
    posterImageProps,
    chipAvatars,
  };
}
