import { useReducer } from "react";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import { Filters } from "./Filters";
import { Header } from "./Header";
import type { ListItemValue } from "./List";
import { List } from "./List";
import type { Sort } from "./Underseen.reducer";
import { initState, reducer } from "./Underseen.reducer";

export interface Props {
  values: ListItemValue[];
  distinctGenres: readonly string[];
  distinctReleaseYears: readonly string[];
  initialSort: Sort;
}

export function Underseen({
  values,
  distinctGenres,
  distinctReleaseYears,
  initialSort,
}: Props): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      values,
      initialSort,
    },
    initState,
  );

  return (
    <ListWithFiltersLayout
      header={<Header />}
      filters={
        <Filters
          dispatch={dispatch}
          sortValue={state.sortValue}
          distinctGenres={distinctGenres}
          distinctReleaseYears={distinctReleaseYears}
        />
      }
      list={
        <List
          dispatch={dispatch}
          groupedValues={state.groupedValues}
          visibleCount={state.showCount}
          totalCount={state.filteredValues.length}
        />
      }
    />
  );
}
