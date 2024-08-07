import { render } from "@testing-library/react";
import { allReviews } from "src/api/reviews";
import { describe, it } from "vitest";

import { getProps } from "./getProps";
import { Review } from "./Review";

const { reviews } = await allReviews();

const testSlugs = new Set([
  "the-curse-of-frankenstein-1957",
  "event-horizon-1997",
  "hellraiser-1987",
  "rio-bravo-1959",
  "night-train-to-terror-1985",
  "horror-express-1972",
]);

const testReviews = reviews.filter((review) => {
  return testSlugs.has(review.slug);
});

describe("Review", () => {
  it.for(testReviews)(
    "matches snapshot for slug $slug",
    { timeout: 10000 },
    async (review, { expect }) => {
      const props = await getProps(review.slug);

      const { asFragment } = render(<Review {...props} />);

      expect(asFragment()).toMatchSnapshot();
    },
  );
});
