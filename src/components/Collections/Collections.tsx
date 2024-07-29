import { useReducer } from "react";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import type { Sort } from "./Collections.reducer";
import { initState, reducer } from "./Collections.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List, type ListItemValue } from "./List";

export interface Props {
  values: readonly ListItemValue[];
  initialSort: Sort;
}

export function Collections({ values, initialSort }: Props): JSX.Element {
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
      filters={<Filters dispatch={dispatch} sortValue={state.sortValue} />}
      list={
        <List
          values={state.filteredValues}
          totalCount={state.filteredValues.length}
          visibleCount={state.filteredValues.length}
        />
      }
    />
  );
}
