import { useReducer } from "react";
import type { AvatarImageProps } from "src/api/avatars";
import type { CastAndCrewMember } from "src/api/castAndCrew";
import { ListWithFiltersLayout } from "src/components/ListWithFiltersLayout";

import { initState, reducer, type Sort } from "./CastAndCrewMember.reducer";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { List, type ListItemValue } from "./List";

export interface Props {
  value: Pick<
    CastAndCrewMember,
    "name" | "reviewCount" | "totalCount" | "creditedAs"
  >;
  titles: ListItemValue[];
  initialSort: Sort;
  distinctReleaseYears: readonly string[];
  avatarImageProps: AvatarImageProps | null;
}

export function CastAndCrewMember({
  value,
  titles,
  initialSort,
  distinctReleaseYears,
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
          creditedAs={value.creditedAs}
          totalCount={value.totalCount}
          reviewCount={value.reviewCount}
          name={value.name}
          avatarImageProps={avatarImageProps}
        />
      }
      filters={
        <Filters
          dispatch={dispatch}
          creditedAs={value.creditedAs}
          hideReviewed={state.hideReviewed}
          sortValue={state.sortValue}
          distinctReleaseYears={distinctReleaseYears}
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
