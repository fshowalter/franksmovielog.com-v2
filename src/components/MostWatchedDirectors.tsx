import type { MostWatchedPeopleListItemValue } from "./MostWatchedPeople";
import { MostWatchedPeople } from "./MostWatchedPeople";

export function MostWatchedDirectors({
  values,
}: {
  values: readonly MostWatchedPeopleListItemValue[];
}): JSX.Element | null {
  return <MostWatchedPeople values={values} header="Most Watched Directors" />;
}
