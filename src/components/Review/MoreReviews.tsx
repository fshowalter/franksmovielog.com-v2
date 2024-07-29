import type { Review } from "src/api/reviews";
import type { StillImageProps } from "src/api/stills";

import { MoreStillList } from "./MoreStillList";

type ReviewTitle = Review["moreReviews"][number] & {
  stillImageProps: StillImageProps;
};

interface Props {
  values: ReviewTitle[];
}

export function MoreReviews({ values }: Props) {
  return (
    <MoreStillList
      leadText="More"
      linkText="Reviews"
      linkTarget="/reviews/"
      values={values}
    />
  );
}
