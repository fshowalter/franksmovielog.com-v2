import type { Review } from "src/api/reviews";
import type { StillImageProps } from "src/api/stills";

import { MoreStillList } from "./MoreStillList";

type CastAndCrewMemberTitle =
  Review["moreCastAndCrew"][number]["titles"][number] & {
    stillImageProps: StillImageProps;
  };

type CastAndCrewMember = Review["moreCastAndCrew"][number] & {
  titles: CastAndCrewMemberTitle[];
};

interface Props {
  values: CastAndCrewMember[];
}

export function MoreFromCastAndCrew({ values }: Props) {
  return values.map((value) => (
    <MoreStillList
      key={value.slug}
      leadText={leadTextForCreditKind(value.creditKind)}
      linkText={value.name}
      linkTarget={`/cast-and-crew/${value.slug}`}
      values={value.titles}
    />
  ));
}

function leadTextForCreditKind(
  creditKind: "director" | "performer" | "writer",
): string {
  switch (creditKind) {
    case "director": {
      return "More directed by";
    }
    case "performer": {
      return "More with";
    }
    case "writer": {
      return "More written by";
    }
    // no-default
  }
}
