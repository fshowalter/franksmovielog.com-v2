import type { Review } from "src/api/reviews";
import type { StillImageProps } from "src/api/stills";

import { MoreStillList } from "./MoreStillList";

type CollectionTitle = Review["moreCollections"][number]["titles"][number] & {
  stillImageProps: StillImageProps;
};

type Collection = Review["moreCollections"][number] & {
  titles: CollectionTitle[];
};

interface Props {
  values: Collection[];
}

export function MoreInCollections({ values }: Props) {
  return values.map((value) => (
    <MoreStillList
      key={value.slug}
      leadText="More"
      linkText={value.name}
      linkTarget={`/collections/${value.slug}`}
      values={value.titles}
    />
  ));
}
