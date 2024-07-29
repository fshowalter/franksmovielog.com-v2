import type { StillImageProps } from "src/api/stills";

import type { ListItemValue } from "./HomeListItem";
import { HomeListItem } from "./HomeListItem";

export interface Props {
  values: ListItemValue[];
  stills: Record<string, StillImageProps>;
}

export function Home({ values, stills }: Props): JSX.Element {
  return (
    <main>
      <ol className="flex flex-col">
        {values.map((value, index) => {
          return (
            <HomeListItem
              key={value.sequence}
              value={value}
              eagerLoadImage={index === 0}
              stillImageProps={stills[value.slug]}
            />
          );
        })}
      </ol>
      <a
        href="/reviews/"
        className="flex justify-end px-pageMargin py-10 text-lg text-accent"
      >
        All Reviews →
      </a>
    </main>
  );
}
