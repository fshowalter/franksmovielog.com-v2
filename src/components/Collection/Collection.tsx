import { useReducer } from "react";
import type { AvatarImageProps } from "src/api/avatars";
import type { Collection } from "src/api/collections";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import { initState, reducer, type Sort } from "./Collection.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List, type ListItemValue } from "./List";

export interface Props {
  value: Pick<
    Collection,
    "description" | "reviewCount" | "titleCount" | "slug" | "name"
  >;
  titles: ListItemValue[];
  distinctReleaseYears: readonly string[];
  initialSort: Sort;
  avatarImageProps: AvatarImageProps | null;
}

export function Collection({
  value,
  distinctReleaseYears,
  initialSort,
  titles,
  avatarImageProps,
}: Props): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    {
      values: [...titles],
      initialSort,
    },
    initState,
  );
  return (
    <ListWithFiltersLayout
      header={
        <Header
          name={value.name}
          reviewCount={value.reviewCount}
          titleCount={value.titleCount}
          avatarImageProps={avatarImageProps}
          description={value.description}
        />
      }
      filters={
        <Filters
          dispatch={dispatch}
          hideReviewed={state.hideReviewed}
          sortValue={state.sortValue}
          distinctReleaseYears={distinctReleaseYears}
          showHideReviewed={value.reviewCount != titles.length}
        />
      }
      list={
        <List
          dispatch={dispatch}
          totalCount={state.filteredValues.length}
          visibleCount={state.showCount}
          groupedValues={state.groupedValues}
        />
      }
    />
  );
}
